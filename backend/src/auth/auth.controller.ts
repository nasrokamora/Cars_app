import {
  Body,
  Controller,
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

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  private cookieOptionsAccess() {
    return {
      httpOnly: true,
      secure:
        process.env.COOKIE_SECURE === 'true' ||
        process.env.NODE_ENV === 'production',
      domain: process.env.COOKIE_DOMAIN || 'localhost',
      sameSite: 'strict' as const,
      path: '/',
      maxAge:
        this.parseExpiryToMs(process.env.JWT_EXPIRES_IN) || 15 * 60 * 1000, // 15 minutes
    };
  }

  private cookieOptionsRefresh() {
    return {
      httpOnly: true,
      secure:
        process.env.COOKIE_SECURE === 'false' ||
        process.env.NODE_ENV === 'production',
      domain: process.env.COOKIE_DOMAIN || 'localhost',
      sameSite: 'strict' as const,
      path: '/auth/refresh',
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
    res.cookie('refresh_token', refreshToken, this.cookieOptionsRefresh());

    return { accessToken, user };
  }

  // -------------------------
  // refresh token
  // -------------------------
  @UseGuards(JwtAuthGuard)
  @Post('/refresh')
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const presented = req.cookies?.['refresh_token'] as string | undefined;
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

      res.cookie('refresh_token', newRefresh, this.cookieOptionsRefresh());

      return { accessToken };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Invalid refresh token');
      }
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  @Post('login')
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
      process.env.ACCESS_COOKIE_NAME || 'access_token',
      accessToken,
      this.cookieOptionsAccess(),
    );
    res.cookie(
      process.env.REFRESH_COOKIE_NAME || 'refresh_token',
      refreshToken,
      this.cookieOptionsRefresh(),
    );

    return { user };
  }

  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(
    @User() user: AuthUser,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const presented = req.cookies?.['refresh_token'] as string | undefined;
    if (presented) {
      try {
        const payload = await this.authService[
          'jwtService'
        ].verifyAsync<JwtRefreshPayload>(presented, {
          secret: process.env.JWT_SECRET,
        });
        const jti = payload?.jti as string | undefined;
        if (jti) {
          await this.authService.logoutFromDevice(user.id, jti);
        }
      } catch (err) {
        console.log(err);
      }
    }
    res.clearCookie('access_token', this.cookieOptionsAccess());
    res.clearCookie('refresh_token', this.cookieOptionsRefresh());
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

    res.clearCookie('access_token', this.cookieOptionsAccess());
    res.clearCookie('refresh_token', this.cookieOptionsRefresh());
    return { message: 'Logged out from all devices successfully' };
  }
}
