import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // هذا الحارس يستخدم للتحقق من صلاحية المستخدمين عند تسجيل الدخول
  // يمكن استخدامه مع استراتيجيات مثل Passport.js
  // في هذا المثال، لا يحتوي على منطق محدد، بل يستخدم كحارس محلي
}
