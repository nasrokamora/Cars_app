import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

import { AuthenticatedUserRequest } from './types/authenticatedReq.type';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { User } from 'src/users/decorator/user.decorator';
import { AuthUser } from 'src/users/types/user.types';
import { RemovePasswordInterceptor } from 'src/Interceptors/remove-password.interceptor';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // مسار التسجيل (Sign Up)
  @Post('/signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    return await this.authService.signup(createUserDto);
  }

  // مسار تسجيل الدخول (Login) باستخدام الحارس المحلي (LocalAuthGuard)
  @UseGuards(LocalAuthGuard) // هذا الحارس يحقّق البريد وكلمة المرور أولًا
  @Post('/login')
  login(
    @Req() req: AuthenticatedUserRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    // بعد نجاح الحارس، يكون req.user مُضمّنًا
    const data = this.authService.login(req.user);
    res.cookie('access_token', data.accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    return data.user;
    // return this.authService.login(req.user);
  }

  @UseInterceptors(RemovePasswordInterceptor)
  @UseGuards(JwtAuthGuard) // هذا الحارس يستخدم للتحقق من صلاحية المستخدمين باستخدام JWT
  @Get('/profile')
  getProfile(@User() user: AuthUser): AuthUser {
    return user;
  }
}
