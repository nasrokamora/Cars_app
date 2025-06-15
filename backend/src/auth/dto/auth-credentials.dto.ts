// src/auth/dto/auth-credentials.dto.ts
//ملف DTO لحمل بيانات تسجيل الدخول (auth-credentials.dto.ts)

import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsEmail()
  @IsNotEmpty()
  email: string; // البريد الإلكتروني

  @IsString()
  @MinLength(8)
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    {
      message:
        'يجب أن تحتوي كلمة المرور على حرف كبير واحد على الأقل، وحرف صغير واحد على الأقل، ورقم واحد، ورمز خاص واحد.',
    },
  )
  password: string; // كلمة المرور (بالنص قبل التشفير)
}
