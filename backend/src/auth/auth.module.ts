// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from 'src/users/users.module';
import { RefreshTokenService } from './refreshToken/refresh-token.service';
import jwtConfig from 'src/config/jwt.config';
// import jwtConfig from 'src/config/jwt.config';
// import { StringValue } from 'ms';
// import { StringValue } from 'ms';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): JwtModuleOptions => {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: { expiresIn: '60s' },
        };
      },
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
