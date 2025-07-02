import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class CarsService {
  constructor(private readonly prisma: PrismaService) {}

  async createCar(dto: CreateCarDto) {
    const Car = await this.prisma.car.create({
      data: {
        title: dto.title,
        discription: dto.discription,
        price: dto.price,
        brand: { connect: { id: dto.brandId } },
        category: {
          connect: dto.categoryId.map((id) => ({ id })),
        },
        owner: { connect: { id: dto.ownerId } },
      },
    });
    if (!Car) {
      throw new NotFoundException('Car creation failed');
    }
    return Car;
  }

  //  جلب جميع السيارات
  async findAllCars() {
    return await this.prisma.car.findMany({
      include: {
        brand: true,
        category: true,
        owner: true,
        images: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findCarById(id: string) {
    try {
      return await this.prisma.car.findUnique({
        where: { id },
        include: {
          brand: true,
          category: true,
          images: true,
          owner: true,
          Message: true,
        },
      });
    } catch (error) {
      throw new Error(`Car with ID not found ${(error as Error).message} `);
    }
  }

  //تعديل سيارة
  async updateCar(id: string, updateCarDto: UpdateCarDto) {
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
        owner: updateCarDto.ownerId
          ? { connect: { id: updateCarDto.ownerId } }
          : undefined,
      },
      include: {
        brand: true,
        category: true,
        images: true,
        owner: true,
      },
    });
  }

  //حذف سيارة
  async deleteCar(id: string) {
    try {
      return await this.prisma.car.delete({
        where: { id },
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2025'
      ) {
        throw new NotFoundException('Car not found');
      }
      throw error;
    }
  }
}
