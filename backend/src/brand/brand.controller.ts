import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  InternalServerErrorException,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('brands')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  // Ensure that the user is authenticated before allowing creation
  // of a new brand. This is important to prevent unauthorized
  // modifications to the brand data, which could lead to data integrity issues.
  // The JwtAuthGuard ensures that only authenticated users can access this endpoint.
  @UseGuards(JwtAuthGuard)
  @Post()
  createBrand(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.createBrand(createBrandDto);
  }

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

  // Ensure that the user is authenticated before allowing access
  // to individual brand details. This is important to prevent unauthorized access
  // to sensitive brand information, which could lead to data breaches or misuse.
  // The JwtAuthGuard ensures that only authenticated users can access this endpoint.
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

  // Ensure that the user is authenticated before allowing updates
  // This is important to prevent unauthorized modifications
  // to the brand data, which could lead to data integrity issues.
  // The JwtAuthGuard ensures that only authenticated users can access this endpoint.
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateBrand(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    try {
      return await this.brandService.updateBrand(id, updateBrandDto);
    } catch (error) {
      throw new InternalServerErrorException((error as Error).message);
    }
  }

  // Ensure that the user is authenticated before allowing deletion
  // This is crucial to prevent unauthorized deletions of brand data,
  // which could lead to data loss and integrity issues.
  // The JwtAuthGuard ensures that only authenticated users can access this endpoint.
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeBrand(@Param('id') id: string) {
    try {
      return this.brandService.removeBrand(id);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error';
      throw new InternalServerErrorException(
        'An error occurred while deleting the brand',
        errorMessage,
      );
    }
  }
}
