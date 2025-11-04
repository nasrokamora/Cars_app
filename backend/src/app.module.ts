import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { BrandModule } from './brand/brand.module';
import { CarsModule } from './cars/cars.module';
import { ImagesModule } from './images/images.module';
import { MessagesModule } from './messages/messages.module';
import { CategoriesModule } from './categories/categories.module';
// import { ServeStaticModule } from '@nestjs/serve-static';
// import { join } from 'path';
import { ProfileModule } from './profile/profile.module';
import jwtConfig from './config/jwt.config';
import { configValidationSchema } from './config/validation';
// import { configValidationSchema } from './config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
      validationSchema: configValidationSchema,
    }),

    PrismaModule,
    AuthModule,
    UsersModule,
    BrandModule,
    CarsModule,
    ImagesModule,
    MessagesModule,
    CategoriesModule,
    ProfileModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
