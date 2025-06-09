// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service'; // خدمة المصادقة
import { AuthController } from './auth.controller'; // تحكم بالمسارات (routes) الخاصة بالمصادقة
// موديول المستخدم (للوصول إلى UserService)
import { PassportModule } from '@nestjs/passport'; // نحتاجها لتكامل Passport مع NestJS
import { JwtModule } from '@nestjs/jwt'; // لإنشاء التوكنات JWT
import { ConfigModule, ConfigService } from '@nestjs/config'; // لقراءة متغيّرات البيئة
import { JwtStrategy } from './strategies/jwt.strategy'; // استراتيجية JWT
import { LocalStrategy } from './strategies/local.strategy'; // استراتيجية Local (مبنية على البريد وكلمة المرور)
import { UsersModule } from 'src/users/users.module';

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
  ],
  controllers: [AuthController], // نقدم AuthController للتعامل مع المسارات
})
export class AuthModule {}

// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { JwtModule } from '@nestjs/jwt';
// import { PrismaModule } from 'src/prisma/prisma.module';
// import { PassportModule } from '@nestjs/passport';
// import { UsersModule } from 'src/users/users.module';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { LocalStrategy } from './strategies/local.strategy';
// import { JwtStrategy } from './strategies/jwt.strategy';

// export const jwtSecret = 'secret';
// @Module({
//   imports: [
//     UsersModule,
//     PassportModule,
//     JwtModule.registerAsync({
//       imports:[ConfigModule],
//       inject: [ConfigModule],
//       useFactory:async (configService: ConfigService) => ({
//         secret: configService.get<string>('JWT_SECRET') || jwtSecret,
//         signOptions: {
//           expiresIn: configService.get<string>('JWT_EXPIRES_IN') || '1h',
//         },
//     }),
//   ],
//   providers: [
//     AuthService,
//     LocalStrategy,
//     JwtStrategy,
//   ],

//   controllers: [AuthController],
// })
// export class AuthModule {}
