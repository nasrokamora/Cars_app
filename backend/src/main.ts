import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
// import * as bcrypt from 'bcrypt';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // -----------------------------
  // Cookie parser -
  // -----------------------------

  app.use(cookieParser());

  // -----------------------------
  // CORS - ضروري إذا كان FE في دومين آخر ويستخدم الكوكيز
  // credentials: true يسمح بارسال واستقبال الكوكيز
  // -----------------------------

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    credentials: true,
  });

  // -----------------------------
  // Validation global pipe - التحقق من صحة البيانات المدخلة
  // -----------------------------
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
