import {
  BadGatewayException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'; // مكتبة لتشفير كلمات المرور

import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from '@prisma/client';
import { RefreshTokenService } from './refreshToken/refresh-token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
    // private readonly logger: Logger = new Logger(AuthService.name),
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

  async getToken(userId: string, email: string) {
    const payload = { email, sub: userId };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_IN,
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  // تسجيل الدخول
  async login(user: User, ip?: string, userAgent?: string) {
    if (!user) throw new BadGatewayException('Invalid credentials');

    const tokens = await this.getToken(user.id, user.email);
    // 1. إنشاء refresh token وتخزينه في DB
    // 1.1. إنشاء توكن جديد
    // 1.2. تخزينه في DB
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // صلاحية ال refresh token لمدة 7 أيام
    await this.refreshTokenService.create(
      user.id,
      tokens.refreshToken,
      expiresAt,
      ip,
      userAgent,
    );
    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  //تحديث التوكينات عبر refresh token
  async refreshTokens(userId: string, refreshToken: string) {
    // 1. التحقق من صحة ال refresh token
    const isValid = await this.refreshTokenService.validate(
      userId,
      refreshToken,
    );
    if (!isValid) throw new UnauthorizedException('Invalid refresh token');

    const token = await this.getToken(userId, '');

    //نلغي كل التوكينات القديمة وننشئ توكن جديد
    await this.refreshTokenService.revokedAll(userId);

    const expiresAt = new Date();
    // صلاحية ال refresh token لمدة 7 أيام
    expiresAt.setDate(expiresAt.getDate() + 7); // صلاحية ال refresh token لمدة 7 أيام
    await this.refreshTokenService.create(
      userId,
      token.refreshToken,
      expiresAt,
    );
    return token;
  }

  // تسجيل الخروج من جهاز معين
  async logoutFromDevice(userId: string) {
    await this.refreshTokenService.revokedById(userId);
  }

  // تسجيل الخروج من جميع الأجهزة
  async logoutFromAllDevice(tokenId: string) {
    await this.refreshTokenService.revokedAll(tokenId);
  }

  // تسجيل مستخدم جديد
  async signup(createUserDto: CreateUserDto, ip?: string, userAgent?: string) {
    try {
      const user = await this.userService.createUser(createUserDto);

      const tokens = await this.getToken(user.id, user.email);

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      await this.refreshTokenService.create(
        user.id,
        tokens.refreshToken,
        expiresAt,
        ip,
        userAgent,
      );
      return {
        ...tokens,
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
}
