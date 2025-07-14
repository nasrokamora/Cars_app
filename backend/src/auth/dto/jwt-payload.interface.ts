//واجهة حِمْل بيانات الـ JWT (jwt-payload.interface.ts)

// src/auth/dto/jwt-payload.interface.ts

export interface JwtPayloadInterface {
  sub: number;
  email: string;
  // يمكنك إضافة حقول أخرى مثل الدور (role) لو أردت دعم صلاحيات أكثر تعقيدًا
}
