import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
// import * as bcrypt from 'bcrypt';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
  // // const plain = 'test1234';
  // // const hash = '$2b$10$XXXXXXXXXXXXXXXXXXXXXXXXXXXXX'; // من DB
  // // const match = await bcrypt.compare(plain, hash);
  // // console.log('MATCH?', match); // يجب أن تكون true
}
void bootstrap();
