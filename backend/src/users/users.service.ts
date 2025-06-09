// src/user/user.service.ts

import { BadRequestException, Injectable } from '@nestjs/common'; // نستورد Injectable للخدمة و BadRequestException لرفع أخطاء
import { PrismaService } from '../prisma/prisma.service'; // نستورد خدمة Prisma للتفاعل مع قاعدة البيانات
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { User } from 'generated/prisma';
// import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {} // نحقن PrismaService
  // 🛠 **إنشاء مستخدم جديد**
  async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    // التحقق إن كان المستخدم موجودًا مسبقًا
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }
    // تشفير كلمة المرور
    const saltRounds = 10;
    const hashedPassword: string = await bcrypt.hash(password, saltRounds);
    // إنشاء المستخدم في قاعدة البيانات
    const user: User = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    // إخفاء كلمة المرور عند الإرجاع
    const { password: _pw, ...result } = user;
    return result;
  }

  // 🔍 **العثور على مستخدم عبر المعرف (ID)**
  async findUserByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({
      where: { email },
    });
  }
  // دالة للعثور على مستخدم بحسب المعرف (ID)
  async findUserById(id: number): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { id },
    });
  }
}
