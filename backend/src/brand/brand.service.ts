import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Brand } from '@prisma/client';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllBrands(): Promise<Brand[]> {
    return await this.prisma.brand.findMany({
      include: {
        cars: false, // Include related cars in the response
      },
    });
  }

  async findOneBrand(id: string): Promise<Brand | null> {
    const brand = await this.prisma.brand.findUnique({
      where: { id },
      include: {
        cars: true, // Include related cars in the response
      },
    });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return brand;
  }
}
