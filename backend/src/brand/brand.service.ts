import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Brand } from 'generated/prisma';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';

@Injectable()
export class BrandService {
  constructor(private readonly prisma: PrismaService) {}

  async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
    return await this.prisma.brand.create({
      data: { name: createBrandDto.name },
      include: {
        cars: true, // Include related cars in the response
      },
    });
  }

  async findAllBrands(): Promise<Brand[]> {
    return await this.prisma.brand.findMany({
      include: {
        cars: true, // Include related cars in the response
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

  async updateBrand(
    id: string,
    updateBrandDto: UpdateBrandDto,
  ): Promise<Brand | null> {
    return await this.prisma.brand.update({
      where: { id },
      data: { name: updateBrandDto.name },
      include: {
        cars: true, // Include related cars in the response
      },
    });
  }

  async removeBrand(id: string): Promise<Brand> {
    try {
      return await this.prisma.brand.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Brand not found');
      }
      throw error; // Re-throw the error if it's not a known request error
    }
  }
}
