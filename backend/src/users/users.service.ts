// src/user/user.service.ts

import { Injectable, UnauthorizedException } from '@nestjs/common'; // نستورد Injectable للخدمة و BadRequestException لرفع أخطاء
import { PrismaService } from 'src/prisma/prisma.service'; // نستورد خدمة Prisma للتفاعل مع قاعدة البيانات
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt'; // مكتبة لتشفير كلمات المرور
import { User } from 'generated/prisma';
// import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {} // نحقن PrismaService
  // 🕵️‍♂️ **البحث عن مستخدم بواسطة البريد الإلكتروني**
  async findUserByEmail(email: string): Promise<User | null> {
    return (await this.prisma.user.findUnique({
      where: { email }, // نبحث عن مستخدم بنفس البريد
    })) as User | null;
  }

  // 🛠 **إنشاء مستخدم جديد**
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto; // نفكك البيانات من DTO

    // نتحقق من وجود مستخدم بنفس البريد
    const existingUser = (await this.prisma.user.findUnique({
      where: { email }, // نبحث عن مستخدم بنفس البريد
    })) as User | null;
    if (existingUser) {
      throw new UnauthorizedException('User with this email already exists'); // إذا وجد، نرفع خطأ
    }

    const salt = await bcrypt.genSalt(10); // نحصل على ملح لتشفير كلمة المرور
    const hashedPassword = await bcrypt.hash(password, salt); // نشفر كلمة المرور

    // نستخدم Prisma لإنشاء مستخدم جديد
    const newUser = await this.prisma.user.create({
      data: {
        ...createUserDto,
        password: hashedPassword, // نستخدم كلمة المرور المشفرة
      },
    });
    return newUser; // نعيد المستخدم الجديد
  }
}
