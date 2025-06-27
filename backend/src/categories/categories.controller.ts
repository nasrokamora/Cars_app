import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  async findAllCategories() {
    return await this.categoriesService.findAllCategories();
  }

  @Get(':id')
  async findOneCategory(@Param('id') id: string) {
    return await this.categoriesService.findOneCategory(id);
  }

  @Patch(':id')
  async updateCategories(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return await this.categoriesService.updateCategories(id, updateCategoryDto);
  }

  @Delete(':id')
  async removeCategory(@Param('id') id: string) {
    return await this.categoriesService.removeCategory(id);
  }
}
