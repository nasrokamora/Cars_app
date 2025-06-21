import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from 'generated/prisma';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a new category
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.prisma.category.create({
      data: { name: createCategoryDto.name },
    });
  }

  // Get all categories
  async findAllCategories() {
    return await this.prisma.category.findMany({
      include: {
        car: true,
      },
    });
  }

  //بحث عن فئة واحدة حسب المعرف
  async findOneCategory(id: string): Promise<Category | null> {
    return await this.prisma.category.findUnique({
      where: { id },
      include: {
        car: true,
      },
    });
  }

  //
  async updateCategories(id: string, updateCategoryDto: UpdateCategoryDto) {
    return await this.prisma.category.update({
      where: { id },
      data: { name: updateCategoryDto.name },
    });
  }

  async removeCategory(id: string): Promise<Category> {
    return await this.prisma.category.delete({
      where: { id },
    });
  }
}
