import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Car } from '@prisma/client';
import { CarResponseDto } from './dto/car-response.dto';

@Injectable()
export class CarsService {
  constructor(private readonly prisma: PrismaService) {}

  // private MapToResponseCarDto(
  //   car: Car & {
  //     owner: { id: number; username: string };
  //     brand: { id: string; name: string };
  //     category: { id: string; name: string };
  //     images: string[];
  //   },
  // ): CarResponseDto {
  //   return {
  //     id: car.id,
  //     title: car.title,
  //     discription: car.discription,
  //     price: car.price,
  //     brand: car.brand.name,
  //     category: car.category.map((category) => category.name),
  //     image: car.images,
  //   };
  // }
  async createCar(dto: CreateCarDto, ownerId: number): Promise<Car> {
    const Car = await this.prisma.car.create({
      data: {
        title: dto.title,
        discription: dto.discription,
        price: dto.price,
        brand: { connect: { id: dto.brandId } },
        category: {
          connect: dto.categoryId.map((id) => ({ id })),
        },
        owner: { connect: { id: ownerId } },
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
    ownerId: number,
  ): Promise<{
    data: CarResponseDto;
    meta: { page: number; limit: number; total: number };
  }> {
    const skip = (page - 1) * limit;
    const [cars, total] = await this.prisma.$transaction([
      this.prisma.car.findMany({
        where:{id},
        skip,
        take: limit,
        include: {
          brand: true,
          category: true,
          images: true,
          owner: { select: { id: true, username: true } },
          Message: true,
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.car.count({
        where: { ownerid: ownerId },
      }),
    ]);
    return {
      data: cars,
      meta: {
        page,
        limit,
        total,
      },
    };
  }

  async findCarById(id: string) {
    const car = await this.prisma.car.findUnique({
      where: { id },
      include: {
        brand: true,
        category: true,
        images: true,
        owner: { select: { id: true, username: true } },
        Message: true,
      },
    });
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    return car;
  }

  //تعديل سيارة
  async updateCar(id: string, updateCarDto: UpdateCarDto, userId: number) {
    const car = await this.prisma.car.findUnique({
      where: { id },
      select: { ownerid: true },
    });
    if (!car) {
      throw new NotFoundException('Car not found');
    }
    if (car.ownerid !== userId) {
      throw new NotFoundException('You are not authorized to update this car');
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
          ? { set: updateCarDto.categoryId.map((id) => ({ id })) }
          : undefined,
      },
      include: {
        brand: true,
        category: true,
      },
    });
  }

  //حذف سيارة
  async deleteCar(id: string, userId: number) {
    const deletedCar = await this.prisma.car.findUnique({
      where: { id },
      select: { ownerid: true },
    });
    if (!deletedCar) {
      throw new NotFoundException('Car not found');
    }
    if (deletedCar.ownerid !== userId) {
      throw new NotFoundException('You are not authorized to delete this car');
    }
    return await this.prisma.car.delete({
      where: { id },
    });
  }
}
