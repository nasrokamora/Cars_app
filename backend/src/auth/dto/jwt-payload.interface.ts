//واجهة حِمْل بيانات الـ JWT (jwt-payload.interface.ts)

// src/auth/dto/jwt-payload.interface.ts

export interface JwtPayloadInterface {
  userId: number; // المعرف الرقمي للمستخدم
  email: string; // البريد الإلكتروني (اختياري ولكنه يُسهل الاستخدام)
  role: string;
  // يمكنك إضافة حقول أخرى مثل الدور (role) لو أردت دعم صلاحيات أكثر تعقيدًا
}
