// src/auth/dto/auth-credentials.dto.ts
//ملف DTO لحمل بيانات تسجيل الدخول (auth-credentials.dto.ts)

import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  email: string; // البريد الإلكتروني

  @IsString()
  @MinLength(8)
  password: string; // كلمة المرور (بالنص قبل التشفير)
}
