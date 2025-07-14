import {
  Controller,
  Get,
  Param,
  InternalServerErrorException,
  Post,
  Body,
  Delete,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { Roles } from 'src/auth/decorators/rols.decorator';
import { CreateBrandDto } from './dto/create-brand.dto';
import { Role } from 'src/auth/interface/Role.enum';
// import { CreateBrandDto } from './dto/create-brand.dto';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  // This endpoint allows the creation of a new brand.
  @Get()
  async findAllBrands() {
    try {
      return await this.brandService.findAllBrands();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        'An error occurred while fetching brands',
        errorMessage,
      );
    }
  }
  // This endpoint allows fetching a single brand by its ID.
  @Get(':id')
  async findOneBrand(@Param('id') id: string) {
    try {
      return await this.brandService.findOneBrand(id);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        'An error occurred while fetching the brand',
        errorMessage,
      );
    }
  }

  @Post()
  @Roles(Role.ADMIN)
  async createBrand(@Body() createBrandDto: CreateBrandDto) {
    try {
      return await this.brandService.createBrand(createBrandDto);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        'An error occurred while creating the brand',
        errorMessage,
      );
    }
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string) {
    try {
      return await this.brandService.removeBrand(id);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        'An error occurred while removing the brand',
        errorMessage,
      );
    }
  }
}
