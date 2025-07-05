import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  BadRequestException,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { error } from 'console';
import { Prisma } from '@prisma/client';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCar(@Body() createCarDto: CreateCarDto) {
    try {
      return await this.carsService.createCar(createCarDto);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === '2025'
      )
        throw new BadRequestException('Invalid data provided for car creation');
    }
    if (error instanceof Error) {
      throw new InternalServerErrorException(
        'Failed to create car',
        error.message,
      );
    }
    throw new InternalServerErrorException('Failed to create car');
  }

  //وجلب جميع السيارات
  // Pagination is implemented with default values for page and limit
  // If no page or limit is provided, it defaults to page 1 and limit 20
  // If invalid values are provided, it throws a BadRequestException
  // If page or limit is less than 1, it throws a BadRequestException
  @Get()
  async findAll(@Query('page') page: string, @Query('limit') limit: string) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 20;
    if (isNaN(pageNumber) || isNaN(limitNumber)) {
      throw new BadRequestException('Invalid page or limit parameter');
    }
    if (pageNumber < 1 || limitNumber < 1) {
      throw new BadRequestException('Page and limit must be greater than 0');
    }
    return await this.carsService.findAllCars(pageNumber, limitNumber);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carsService.findCarById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCarDto: UpdateCarDto) {
    return this.carsService.updateCar(id, updateCarDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carsService.deleteCar(id);
  }
}
