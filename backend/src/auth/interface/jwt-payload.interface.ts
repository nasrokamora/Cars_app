export interface JwtPayload {
  userId: number;
  email: string;
  // يمكنك إضافة حقول أخرى مثل الدور (role) لو أردت دعم صلاحيات أكثر تعقيدًا
  role?: string;
}
