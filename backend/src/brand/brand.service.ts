import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Brand } from '@prisma/client';
import { CreateBrandDto } from './dto/create-brand.dto';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllBrands(): Promise<Brand[]> {
    return await this.prisma.brand.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async findOneBrand(id: string): Promise<Brand | null> {
    const brand = await this.prisma.brand.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
      },
    });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return brand;
  }

  async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
    const existingBrand = await this.prisma.brand.findUnique({
      where: { name: createBrandDto.name },
    });
    if (existingBrand) {
      throw new NotFoundException('Brand already exists');
    }
    return await this.prisma.brand.create({
      data: createBrandDto,
    });
  }

  async removeBrand(id: string): Promise<Brand> {
    const brand = await this.prisma.brand.findUnique({
      where: { id },
    });
    if (!brand) {
      throw new NotFoundException('Brand not found');
    }
    return await this.prisma.brand.delete({
      where: { id },
    });
  }
}
