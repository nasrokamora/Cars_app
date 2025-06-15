import { Module } from '@nestjs/common';

// import { PrismaModule } from 'src/prisma/prisma.module';
import { UserService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UsersModule {}
