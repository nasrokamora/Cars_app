import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt'; // مكتبة لتشفير كلمات المرور
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { Logger } from '@nestjs/common';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly logger: Logger = new Logger(AuthService.name),
  ) {}

  // دالة للتحقق من صلاحية بيانات تسجيل الدخول (البريد وكلمة المرور)
  async validateUser(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email); // نبحث عن المستخدم حسب البريد
    if (!user) return null; // إذا لم يكن هناك مستخدم بهذا البريد

    const isPasswordValid = await bcrypt.compare(password, user.password); //نقارن كلمة المرور المدخلة بالنسخة المشفّرة في قاعدة البيانات:
    if (!isPasswordValid) return null; // إذا كانت كلمة المرور خاطئة

    return user; // إعادة البيانات بدون كلمة المرور
  }

  // تسجيل الدخول

  async login(authCredentialsDto: AuthCredentialsDto) {
    const { email, password } = authCredentialsDto;
    const user = await this.validateUser(email, password);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const payload = { email: user.email, sub: user.id };
    // 2. إعداد الحمولة Payload للتوكن
    const token = await this.jwtService.signAsync(payload);
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
  async signup(authCredentialsDto: AuthCredentialsDto) {
    try {
      const user = await this.userService.createUser(authCredentialsDto);
      const payload = { email: user.email, sub: user.id };
      const token = await this.jwtService.signAsync(payload);
      return {
        accessToken: token,
        user,
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      this.logger.error(`signup failed: ${errorMessage}`);
      throw new UnauthorizedException(`Error creating user: ${errorMessage}`);
    }
  }
}
