import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

import { AuthenticatedRequest } from './types/authenticatedReq.type';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // مسار التسجيل (Sign Up)
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }

  // مسار تسجيل الدخول (Login) باستخدام الحارس المحلي (LocalAuthGuard)
  @UseGuards(LocalAuthGuard) // هذا الحارس يحقّق البريد وكلمة المرور أولًا
  @Post('login')
  async login(@Request() req: { user: { email: string; password: string } }) {
    // بعد نجاح الحارس، يكون req.user مُضمّنًا
    return await this.authService.login({
      email: req.user.email,
      password: req.user.password, // تأكد من أن كلمة المرور موجودة في req.user
    });
  }

  @UseGuards(JwtAuthGuard) // هذا الحارس يستخدم للتحقق من صلاحية المستخدمين باستخدام JWT
  @Get('users/profile')
  getProfile(@Request() req: AuthenticatedRequest) {
    return {
      message: 'User profile retrieved successfully',
      user: req.user,
      // يمكنك إضافة المزيد من المعلومات هنا إذا لزم الأمر
    };
  }
}
