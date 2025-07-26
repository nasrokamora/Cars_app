import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateImageDto } from './dto/create-image.dto';
import { Image } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImagesService {
  constructor(private readonly prisma: PrismaService) {}
  async createImage(
    createImageDto: CreateImageDto,
    userId: string,
  ): Promise<Image> {
    // Validate the carId exists in the database
    const car = await this.prisma.car.findUnique({
      where: { id: createImageDto.carId },
    });

    if (!car || car.ownerid !== userId) {
      throw new ForbiddenException(
        'You are not allowed to upload images for this car.',
      );
    }

    return await this.prisma.image.create({
      data: {
        url: createImageDto.url,
        uploadedBy: { connect: { id: userId } },
        car: { connect: { id: createImageDto.carId } },
      },
    });
  }

  async UpdateImage(
    id: string,
    updateImageDto: UpdateImageDto,
    userId: string,
  ) {
    const existingImage = await this.prisma.image.findUnique({
      where: { id },
      select: { uploadedBy: true },
    });
    if (!existingImage) {
      throw new NotFoundException('Image not found');
    }
    if (existingImage.uploadedBy.id !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this image',
      );
    }
    try {
      return await this.prisma.image.update({
        where: { id },
        data: {
          url: updateImageDto.url,
        },
        include: {
          car: true,
        },
      });
    } catch (error) {
      throw new ForbiddenException(
        error instanceof Error ? error.message : 'Image update failed',
      );
    }
  }

  async deleteImage(id: string, userId: string): Promise<void> {
    const existingImage = await this.prisma.image.findUnique({
      where: { id },
      select: { uploadedBy: true },
    });
    if (!existingImage) {
      throw new NotFoundException('Image not found');
    }
    if (existingImage.uploadedBy.id !== userId) {
      throw new ForbiddenException(
        'You are not authorized to delete this image',
      );
    }
    await this.prisma.image.delete({
      where: { id },
    });
  }
}
