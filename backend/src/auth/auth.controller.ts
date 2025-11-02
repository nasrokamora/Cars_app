import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
// import { LocalAuthGuard } from './guards/local-auth.guard';

import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from 'src/users/decorator/user.decorator';
import { AuthUser } from 'src/users/types/user.types';
// import { RemovePasswordInterceptor } from 'src/Interceptors/remove-password.interceptor';
import { Request, Response } from 'express';
import { JwtRefreshPayload } from './types/jwt-refresh-payload.type';
// import { RemovePasswordInterceptor } from 'src/Interceptors/remove-password.interceptor';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ConfigService } from '@nestjs/config';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  private GetCookiesName() {
    const isProduction = process.env.NODE_ENV === 'production';
    return {
      accessT: isProduction ? '__Host-at' : 'access_token',
      refreshT: isProduction ? '__Host-rt' : 'refresh_token',
    };
  }
  names = this.GetCookiesName();

  // Helper: يحوّل قيم مثل '15m','7d','3600s' أو أرقام إلى milliseconds
  private parseExpiryToMs(value?: string | number, fallback = 15 * 60 * 1000) {
    if (!value) return fallback;
    const v = String(value).trim();
    if (/^\d+$/.test(v)) {
      const n = Number(v);
      // لو العدد كبير نفترض مليثانية، أما لو صغير نفترض ثواني
      return n > 1000 ? n : n * 1000;
    }
    const m = v.match(/^(\d+)([smhd])$/);
    if (m) {
      const n = Number(m[1]);
      const unit = m[2];
      if (unit === 's') return n * 1000;
      if (unit === 'm') return n * 60 * 1000;
      if (unit === 'h') return n * 3600 * 1000;
      if (unit === 'd') return n * 24 * 3600 * 1000;
    }
    return fallback;
  }

  private isProd() {
    return process.env.NODE_ENV === 'production';
  }

  private cookieOptionsAccess() {
    return {
      httpOnly: true,
      secure: false,
      domain: process.env.COOKIE_DOMAIN || 'localhost',
      sameSite: 'none' as const,
      path: '/',
      maxAge:
        this.parseExpiryToMs(process.env.JWT_EXPIRES_IN) || 15 * 60 * 1000, // 15 minutes
    };
  }

  private cookieOptionsRefresh() {
    return {
      httpOnly: true,
      secure: false,
      domain: process.env.COOKIE_DOMAIN || 'localhost',
      sameSite: 'none' as const,
      path: '/',
      maxAge:
        this.parseExpiryToMs(process.env.JWT_REFRESH_EXPIRES_IN) ||
        7 * 24 * 60 * 60 * 1000, // 7 days
    };
  }

  // -------------------------
  // Signup (create account)
  // -------------------------
  @Post('signup')
  async signUp(
    @Body() createUserDto: CreateUserDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const ip = req.ip;
    const userAgent = req.get('user-agent') || '';
    const { accessToken, refreshToken, user } = await this.authService.signup(
      createUserDto,
      ip,
      userAgent,
    );

    // تخزين التوكن في كوكيز
    res.cookie(this.names.refreshT, refreshToken, this.cookieOptionsRefresh());
    res.cookie(this.names.accessT, accessToken, this.cookieOptionsAccess());
    return { user, message: 'User registered successfully' };
  }

  // -------------------------
  // refresh token
  // -------------------------
  // @UseGuards(JwtAuthGuard)
  @Post('/refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const presented = req.cookies?.[this.names.refreshT] as string | undefined;
    if (!presented) {
      return { message: 'No refresh token provided' };
    }

    try {
      // عادةً نستخرج userId من الـ JWT payload أو من DB

      const { accessToken, refreshToken: newRefresh } =
        await this.authService.refreshTokens(
          presented,
          req.ip,
          req.get('user-agent') || '',
        );
      res.cookie(this.names.accessT, accessToken, this.cookieOptionsAccess());
      res.cookie(this.names.refreshT, newRefresh, this.cookieOptionsRefresh());

      return { accessToken, message: 'Refreshed successfully' };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new BadRequestException('Invalid refresh token');
      }
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(
    @Body() authCredentialsDto: AuthCredentialsDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const ip = req.ip;
    const userAgent = req.get('user-agent') || '';

    const { accessToken, refreshToken, user } = await this.authService.login(
      authCredentialsDto,
      ip,
      userAgent,
    );

    res.cookie(
      process.env.ACCESS_COOKIE_NAME || this.names.accessT,
      accessToken,
      this.cookieOptionsAccess(),
    );
    res.cookie(
      process.env.REFRESH_COOKIE_NAME || this.names.refreshT,
      refreshToken,
      this.cookieOptionsRefresh(),
    );

    return { user, message: 'User logged in successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logout(
    @User() user: AuthUser,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const presented = req.cookies?.[this.names.refreshT] as string | undefined;
    if (presented) {
      try {
        const payload = await this.authService[
          'jwtService'
        ].verifyAsync<JwtRefreshPayload>(presented, {
          secret: process.env.JWT_REFRESH_SECRET,
        });
        const jwtId = payload?.jwtId as string | undefined;
        if (jwtId) {
          await this.authService.logoutFromDevice(user.id, jwtId);
        }
      } catch (err) {
        console.log(err);
      }
    }
    res.clearCookie(this.names.accessT, this.cookieOptionsAccess());
    res.clearCookie(this.names.refreshT, this.cookieOptionsRefresh());
    console.log('loged out successfully');
    return { message: 'Logged out successfully' };
  }

  @Post('logout-all')
  @UseGuards(JwtAuthGuard)
  async logoutAll(
    @User() user: AuthUser,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.logoutFromAllDevice(user.id);

    res.clearCookie(this.names.accessT, this.cookieOptionsAccess());
    res.clearCookie(this.names.refreshT, this.cookieOptionsRefresh());
    return { message: 'Logged out from all devices successfully' };
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  protected() {
    return this.authService.protected();
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@User() user: AuthUser) {
    return {
      username: user.username,
      email: user.email,
      id: user.id,
    };
  }
}
