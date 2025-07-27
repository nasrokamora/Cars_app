// src/users/types/user.types.ts

import { User } from '@prisma/client';

// نوع المستخدم بدون كلمة المرور
export type UserWithoutPassword = Omit<User, 'password'>;

// نوع المستخدم للتسجيل
export interface CreateUserResponse {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

// نوع المستخدم للتحديث
export interface UpdateUserDto {
  email?: string;
  password?: string;
}

// نوع الاستجابة للمصادقة
export interface AuthUser {
  id: string;
  email: string;
  username: string;
  role: string;
}
