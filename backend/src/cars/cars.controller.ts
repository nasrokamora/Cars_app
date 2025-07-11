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
  Req,
  UsePipes,
  ValidationPipe,
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
  async create(
    @Body() createCarDto: CreateCarDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const ownerId = req.user?.userId;
    if (!ownerId) {
      throw new BadRequestException('User not authenticated');
    }
    return await this.carsService.createCar(createCarDto, ownerId);
  }

  //وجلب جميع السيارات
  @Get('/allcars')
  @UsePipes(new ValidationPipe({ transform: true }))
  async findAll() {
    return await this.carsService.findAllCars();
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
    const ownerId = req.user?.userId;
    if (!ownerId) {
      throw new BadRequestException('User not authenticated');
    }

    return await this.carsService.updateCar(id, updateCarDto, ownerId);
  }

  // حذف سيارة

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
