import { Injectable } from '@nestjs/common';
// import { CreateProfileDto } from './dto/create-profile.dto';
// import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}
  async getProfile(userId: string) {
    return await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        cars: {
          select: {
            title: true,
            price: true,
            discription: true,
            brand: true,
            category: true,
          },
        },
      },
    });
  }
}
