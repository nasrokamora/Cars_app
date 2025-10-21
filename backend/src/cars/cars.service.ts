import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Car } from '@prisma/client';
import { CarResponseDto } from './dto/car-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class CarsService {
  constructor(private readonly prisma: PrismaService) {}

  async createCar(dto: CreateCarDto, ownerId: string): Promise<Car> {
    const Car = await this.prisma.car.create({
      data: {
        title: dto.title,
        discription: dto.discription,
        price: dto.price,
        brand: { connect: { id: dto.brandId } },
        category: {
          connect: { id: dto.categoryId }, // Assuming categoryId is a single UUID
        },
        owner: { connect: { id: ownerId } },
        images: {
          create: dto.image?.map((image) => ({
            url: image.url,
            uploadedBy: { connect: { id: ownerId } },
          })),
        },
      },
    });
    if (!Car) {
      throw new NotFoundException('Car creation failed');
    }
    return Car;
  }

  //  جلب جميع السيارات
  async findAllCars(
    page = 1,
    limit = 20,
  ): Promise<{
    data: CarResponseDto[];
    meta: { page: number; limit: number; total: number };
  }> {
    const skip = (page - 1) * limit;
    const [cars, total] = await this.prisma.$transaction([
      this.prisma.car.findMany({
        skip,
        take: limit,
        include: {
          brand: true,
          category: true,
          images: true,
          owner: { select: { username: true } },
          Message: false,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.car.count(),
    ]);
    return {
      data: plainToInstance(CarResponseDto, cars, {
        excludeExtraneousValues: true,
      }),
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findCarById(id: string): Promise<CarResponseDto> {
    const car = await this.prisma.car.findUnique({
      where: { id },
      include: {
        brand: true,
        category: true,
        images: true,
        owner: { select: { username: true } },
        Message: true,
      },
    });
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    return plainToInstance(CarResponseDto, car, {
      excludeExtraneousValues: true,
    });
  }

  //تعديل سيارة
  async updateCar(id: string, updateCarDto: UpdateCarDto, ownerId: string) {
    const car = await this.prisma.car.findUnique({
      where: { id },
      select: { ownerid: true },
    });
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    console.log('من التوكن:', ownerId);
    console.log('من قاعدة البيانات:', car.ownerid);

    if (car.ownerid !== ownerId) {
      throw new ForbiddenException('You are not authorized to update this car');
    }

    return await this.prisma.car.update({
      where: { id },
      data: {
        title: updateCarDto.title,
        discription: updateCarDto.discription,
        price: updateCarDto.price,
        brand: updateCarDto.brandId
          ? { connect: { id: updateCarDto.brandId } }
          : undefined,
        category: updateCarDto.categoryId
          ? { connect: { id: updateCarDto.categoryId } }
          : undefined,
      },
      include: {
        brand: true,
        category: true,
      },
    });
  }

  //حذف سيارة
  async deleteCar(id: string, ownerId: string): Promise<Car> {
    const deletedCar = await this.prisma.car.findUnique({
      where: { id },
      select: { ownerid: true },
    });
    if (!deletedCar) {
      throw new NotFoundException('Car not found');
    }
    if (deletedCar.ownerid !== ownerId) {
      throw new ForbiddenException('You are not authorized to delete this car');
    }
    return await this.prisma.car.delete({
      where: { id },
    });
  }
}
