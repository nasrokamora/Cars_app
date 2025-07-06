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
  Query,
  Req,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/types/authenticatedReq.type';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCar(
    @Body() createCarDto: CreateCarDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new BadRequestException('User not authenticated');
    }
    return await this.carsService.createCar(createCarDto, userId);
  }

  //وجلب جميع السيارات
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

  //جلب سيارة واحدة
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.carsService.findCarById(id);
  }

  // تحديث سيارة
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCarDto: UpdateCarDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new BadRequestException('User not authenticated');
    }

    return await this.carsService.updateCar(id, updateCarDto, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: AuthenticatedRequest) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new BadRequestException('User not authenticated');
    }
    return await this.carsService.deleteCar(id, userId);
  }
}
