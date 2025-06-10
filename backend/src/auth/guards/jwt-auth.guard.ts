import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // هذا الحارس يستخدم للتحقق من صلاحية المستخدمين باستخدام JWT
  // يمكن استخدامه مع استراتيجيات مثل Passport.js
  // في هذا المثال، لا يحتوي على منطق محدد، بل يستخدم كحارس JWT
}
