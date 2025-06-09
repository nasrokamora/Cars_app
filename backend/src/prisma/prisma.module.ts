// src/prisma/prisma.module.ts

import { Global, Module } from '@nestjs/common'; // نستورد ما يلزم من NestJS
import { PrismaService } from './prisma.service'; // نستورد الخدمة التي أنشأناها

@Global() // نجعل هذا الموديول عالميًا بحيث لا نحتاج لاستيراده بإعادة الاستيراد في كل مرة
@Module({
  providers: [PrismaService], // نوفّر PrismaService كـ provider
  exports: [PrismaService], // نصدرها ليتم استخدامها في أي موديول آخر
})
export class PrismaModule {}
