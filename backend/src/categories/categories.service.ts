import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  // Get all categories
  async findAllCategories(): Promise<Category[]> {
    return await this.prisma.category.findMany({
      include: {
        car: true,
      },
    });
  }

  //بحث عن فئة واحدة حسب المعرف
  async findOneCategory(id: string): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        car: true,
      },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }
}
