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

  @Get()
  async findAll() {
    return await this.carsService.findAllCars();
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
