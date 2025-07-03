import {
  Controller,
  Get,
  Param,
  InternalServerErrorException,
} from '@nestjs/common';
import { BrandService } from './brand.service';
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
}
