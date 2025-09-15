// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service'; // خدمة المصادقة
import { AuthController } from './auth.controller'; // تحكم بالمسارات (routes) الخاصة بالمصادقة
import { PassportModule } from '@nestjs/passport'; // نحتاجها لتكامل Passport مع NestJS
import { JwtModule } from '@nestjs/jwt'; // لإنشاء التوكنات JWT
import { ConfigModule, ConfigService } from '@nestjs/config'; // لقراءة متغيّرات البيئة
import { JwtStrategy } from './strategies/jwt.strategy'; // استراتيجية JWT
import { LocalStrategy } from './strategies/local.strategy'; // استراتيجية Local (مبنية على البريد وكلمة المرور)
import { UsersModule } from 'src/users/users.module';
import { RefreshTokenService } from './refreshToken/refresh-token.service';

@Module({
  imports: [
    UsersModule, // نحتاج للوصول إلى UserService داخل AuthService
    PassportModule, // نفعّل دعم Passport (بدون خيارات إضافية هنا)
    JwtModule.registerAsync({
      imports: [ConfigModule], // نستورد ConfigModule لكي نستخدم ConfigService
      inject: [ConfigService], // نحقن ConfigService في المصنع (useFactory)
      useFactory: (configService: ConfigService) =>
        Promise.resolve({
          secret: configService.get<string>('JWT_SECRET'), // سرّ توقيع JWT مأخوذ من متغيّر البيئة
          signOptions: {
            expiresIn: configService.get<string>('JWT_EXPIRES_IN'), // مدة صلاحية التوكن (مثلاً '3600s' أو '1h')
          },
        }),
    }),
  ],
  providers: [
    AuthService, // نقدم AuthService
    LocalStrategy, // نقدم استراتيجية Local
    JwtStrategy, // نقدم استراتيجية JWT
    RefreshTokenService, // نقدم خدمة RefreshToken
  ],
  controllers: [AuthController], // نقدم AuthController للتعامل مع المسارات
})
export class AuthModule {}
