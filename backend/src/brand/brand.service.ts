import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Brand } from 'generated/prisma';

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

  findAll() {
    return `This action returns all brand`;
  }

  findOne(id: number) {
    return `This action returns a #${id} brand`;
  }

  update(id: number, updateBrandDto: UpdateBrandDto) {
    return `This action updates a #${id} brand`;
  }

  remove(id: number) {
    return `This action removes a #${id} brand`;
  }
}
