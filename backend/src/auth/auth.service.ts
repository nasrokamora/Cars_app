import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

import { RefreshTokenService } from './refreshToken/refresh-token.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { randomUUID } from 'crypto';
import { JwtRefreshPayload } from './types/jwt-refresh-payload.type';
import { JwtPayload } from './interface/jwt-payload.interface';
import { ConfigService, ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/config/jwt.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly configService: ConfigService,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  // دالة للتحقق من صلاحية بيانات تسجيل الدخول (البريد وكلمة المرور)

  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email); // نبحث عن المستخدم حسب البريد
    if (!user) return null; // إذا لم يكن هناك مستخدم بهذا البريد

    const isPasswordValid = await bcrypt.compare(password, user.password); //نقارن كلمة المرور المدخلة بالنسخة المشفّرة في قاعدة البيانات:

    if (!isPasswordValid) {
      throw new UnauthorizedException(' Invalid password'); // إذا كانت كلمة المرور خاطئة
    } // إذا كانت كلمة المرور خاطئة

    return user; // إعادة البيانات بدون كلمة المرور
  }

  private async generateTokens(userId: string, email?: string) {
    const jwtId = randomUUID(); // إنشاء معرف فريد لكل توكن
    const payload: JwtPayload = {
      sub: userId,
      email: email ?? '',
      jwtId,
    };

    const accessSecret = this.jwtConfiguration.secret;
    const refreshSecret = this.jwtConfiguration.refreshSecret;

    if (!accessSecret || !refreshSecret) {
      throw new Error(
        'JWT_ACCESS_SECRET or JWT_REFRESH_SECRET is not defined in configuration',
      );
    }

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: accessSecret,
      expiresIn: '3m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: refreshSecret,
      expiresIn: '7d',
      jwtid: jwtId,
    });

    return { accessToken, refreshToken, jwtId };
  }

  // private parsExpiresIn(value?: string | number): string | number | undefined {
  //   if (!value) return undefined;
  //   if (!isNaN(Number(value))) return Number(value);
  //   if (typeof value === 'string') return value;
  //   return undefined;
  // }

  // تسجيل مستخدم جديد
  async signup(createUserDto: CreateUserDto, ip?: string, userAgent?: string) {
    try {
      const user = await this.userService.createUser(createUserDto);

      const { accessToken, refreshToken, jwtId } = await this.generateTokens(
        user.id,
        user.email,
      );

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      await this.refreshTokenService.create({
        userId: user.id,
        refreshToken,
        jwtId,
        ip,
        userAgent,
        expiresAt,
      });
      return {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          role: user.role,
          username: user.username,
        },
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new UnauthorizedException(`Error creating user: ${errorMessage}`);
    }
  }

  // تسجيل الدخول

  async login(
    authCredentialsDto: AuthCredentialsDto,
    ip?: string,
    userAgent?: string,
  ) {
    // نتحقق من صحة بيانات تسجيل الدخول
    const user = await this.validateUser(
      authCredentialsDto.email,
      authCredentialsDto.password,
    );

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const { accessToken, refreshToken, jwtId } = await this.generateTokens(
      user.id,
      user.email,
    );

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // صلاحية ال refresh token لمدة 7 أيام

    await this.refreshTokenService.create({
      userId: user.id,
      refreshToken,
      expiresAt,
      ip,
      userAgent,
      jwtId,
    });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        username: user.username,
      },
    };
  }

  //تحديث التوكينات عبر refresh token
  async refreshTokens(presentedToken: string, ip?: string, userAgent?: string) {
    // 1) نتحقق من التوقيع ونستخرج payload (sub, jti)
    let payload: JwtRefreshPayload;
    try {
      payload = await this.jwtService.verifyAsync(presentedToken, {
        secret: this.jwtConfiguration.refreshSecret,
      });
      const userId = payload.sub;
      const jwtId = payload.jwtId as string | undefined;

      if (!userId || !jwtId) {
        // لو مفقود jwtId => غير مصدق
        throw new UnauthorizedException('Invalid refresh token payload');
      }

      // 2) نبحث عن السجل الموجود بالـ jti
      const stored = await this.refreshTokenService.findByJwtId(jwtId);

      if (!stored) {
        // **حالة خطيرة: التوكن المصادق لكنه غير موجود في DB**
        // احتمال reuse أو اختراق -> نلغي كل التوكنات للمستخدم (precaution)
        await this.refreshTokenService.revokedAll(userId).catch(() => {});
        throw new UnauthorizedException('Refresh token reuse detected');
      }

      if (stored.revokedAt) {
        // التوكن قد سبق إبطاله -> احتمال إعادة استخدام -> نلغي الكل
        await this.refreshTokenService.revokedAll(userId).catch(() => {});
        throw new UnauthorizedException(
          'Refresh token was revoked — possible reuse',
        );
      }

      // 3) نتحقق من أن التوكن المقدم يتطابق مع الـ hash المخزن
      const isValid = await this.refreshTokenService.validateByPresentedToken(
        userId,
        presentedToken,
      );
      if (!isValid) {
        // mismatch -> احتمال سرقة أو تلاعب -> نلغي الكل
        await this.refreshTokenService.revokedAll(userId).catch(() => {});
        throw new UnauthorizedException(
          'Invalid refresh token (hash mismatch)',
        );
      }

      // 4) Rotation: نلغي التوكن الحالي ونصدر توكن جديد مع jti جديد
      await this.refreshTokenService.revokedByJwtId(jwtId, userId); // نضع revokedAt على القديم

      // نُنتج توكنات جديدة
      const user = await this.userService.findUserById(userId);
      if (!user) {
        // حالة نادرة: المستخدم محذوف مع وجود توكنات سابقة
        throw new UnauthorizedException('Invalid user (not found)');
      }

      // نُنتج توكنات جديدة
      const {
        accessToken,
        refreshToken: newRefresh,
        jwtId: newJwtId,
      } = await this.generateTokens(userId, user.email);

      // صلاحية ال refresh token لمدة 7 أيام
      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);

      // نخزن التوكن الجديد في DB
      await this.refreshTokenService.create({
        userId,
        refreshToken: newRefresh,
        expiresAt,
        ip,
        userAgent,
        jwtId: newJwtId,
      });

      // نُرجع التوكنات الجديدة للـ caller ليَضَعها في كوكي/RESP
      return { accessToken, refreshToken: newRefresh };
    } catch (err) {
      console.log(err);
      // التوكن غير صالح توقيعياً
      throw new UnauthorizedException('Invalid refresh token (signature)');
    }
  }

  // تسجيل الخروج من جهاز معين logout from device
  async logoutFromDevice(userId: string, presentedToken: string) {
    await this.refreshTokenService.revokeByPresentedToken(
      userId,
      presentedToken,
    );
  }

  // تسجيل الخروج من جميع الأجهزة logout from all devices
  async logoutFromAllDevice(userId: string) {
    await this.refreshTokenService.revokedAll(userId);
  }

  protected() {
    return 'You have accessed a protected route';
  }
}
