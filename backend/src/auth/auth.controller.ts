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

  private cookieOptionsAccess() {
    return {
      httpOnly: true,
      secure:
        process.env.COOKIE_SECURE === 'true' ||
        process.env.NODE_ENV === 'production',
      domain: process.env.COOKIE_DOMAIN || 'localhost',
      sameSite: 'strict' as const,
      path: '/',
      maxAge: Number(process.env.JWT_EXPIRES_IN) || 15 * 60 * 1000, // 15 minutes
    };
  }

  private cookieOptionsRefresh() {
    return {
      httpOnly: true,
      secure:
        process.env.COOKIE_SECURE === 'true' ||
        process.env.NODE_ENV === 'production',
      domain: process.env.COOKIE_DOMAIN || 'localhost',
      sameSite: 'strict' as const,
      path: '/auth/refresh',
      maxAge:
        Number(process.env.JWT_REFRESH_EXPIRES_IN) || 7 * 24 * 60 * 60 * 1000, // 7 days
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
    const refreshToken = req.cookies?.['refresh_token'] as string | undefined;
    if (!refreshToken) {
      return { message: 'No refresh token provided' };
    }

    try {
      // عادةً نستخرج userId من الـ JWT payload أو من DB
      const payload = await this.authService[
        'jwtService'
      ].verifyAsync<JwtRefreshPayload>(refreshToken, {
        secret: process.env.JWT_SECRET,
      });

      const { accessToken, refreshToken: newRefresh } =
        await this.authService.refreshTokens(payload.sub, refreshToken);

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
    const refreshToken = req.cookies?.['refresh_token'] as string | undefined;
    if (refreshToken) {
      await this.authService.logoutFromDevice(user.id, refreshToken);
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
