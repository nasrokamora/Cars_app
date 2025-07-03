import {
  Controller,
  Get,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  // This endpoint allows the creation of a new category.
  @Get()
  async findAllCategories() {
    try {
      return await this.categoriesService.findAllCategories();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        'An error occurred while fetching categories',
        errorMessage,
      );
    }
  }

  // This endpoint allows fetching a single category by its ID.
  @Get(':id')
  async findOneCategory(@Param('id') id: string) {
    try {
      return await this.categoriesService.findOneCategory(id);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        'An error occurred while fetching the category',
        errorMessage,
      );
    }
  }
}
