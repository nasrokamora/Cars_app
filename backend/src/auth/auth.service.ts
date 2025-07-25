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

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
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

  // تسجيل الدخول

  login(user: User) {
    if (!user) throw new BadGatewayException('Invalid credentials');

    const payload = { email: user.email, sub: user.id };
    // 2. إعداد الحمولة Payload للتوكن
    const token = this.jwtService.sign(payload);
    return {
      accessToken: token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  // تسجيل مستخدم جديد
  async signup(createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(createUserDto);
      const payload = { email: user.email, sub: user.id };
      const token = await this.jwtService.signAsync(payload);
      return {
        accessToken: token,
        user,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      throw new UnauthorizedException(`Error creating user: ${errorMessage}`);
    }
  }
}
