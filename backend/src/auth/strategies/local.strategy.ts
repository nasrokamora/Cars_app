import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // نستدعي البنّاء في الطبقة العليا مع تمرير خيارات الاستراتيجية
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }
  // دالة validate يُدعى إليها تلقائيًا عند عملية المصادقة عبر Local Strategy
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (user == null) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return user;
  }
}

//شرح السطور:

//import { Strategy } from 'passport-local';

//نستورد Strategy الأساسية من حزمة passport-local للتحقّق بالبريد وكلمة المرور.

//import { PassportStrategy } from '@nestjs/passport';

//PassportStrategy تغلّف استراتيجية Passport التقليدية لتعمل داخل NestJS.

//import { Injectable, UnauthorizedException } from '@nestjs/common';

//@Injectable() لتمكين الحقن، وUnauthorizedException لرفع خطأ HTTP 401 عند فشل التحقّق.

//import { AuthService } from '../auth.service';

//نستورد خدمة المصادقة (ستتبعها منطق التحقّق في AuthService).

//export class LocalStrategy extends PassportStrategy(Strategy) { ... }

//ننشئ كلاس يرث من PassportStrategy(Strategy)، أي ندمج Local Strategy مع NestJS.
