import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
// import { CreateImageDto } from './dto/create-image.dto';
import { Image } from '@prisma/client';
import { unlinkSync } from 'fs';
import { join } from 'path';
import { PrismaService } from 'src/prisma/prisma.service';
// import { UpdateImageDto } from './dto/update-image.dto';

@Injectable()
export class ImagesService {
  constructor(private readonly prisma: PrismaService) {}
  async createImage(
    userId: string,
    file: Express.Multer.File,
    carId: string,
  ): Promise<Image> {
    // Validate the carId exists in the database
    const car = await this.prisma.car.findFirst({
      where: { id: carId, ownerid: userId },
    });

    if (!car || car.ownerid !== userId) {
      throw new ForbiddenException(
        'You are not allowed to upload images for this car.',
      );
    }
    const newImage = await this.prisma.image.create({
      data: {
        url: file.path, // Assuming the file is saved and its path is available
        uploadedBy: { connect: { id: userId } },
        car: { connect: { id: carId } },
      },
    });

    return newImage;
  }

  async UpdateImage(
    id: string,
    userId: string,
    file: Express.Multer.File,
  ): Promise<Image> {
    const existingImage = await this.prisma.image.findUnique({
      where: { id },
      select: { userId: true },
    });
    if (!existingImage) {
      throw new NotFoundException('Image not found');
    }
    if (existingImage.userId !== userId) {
      throw new ForbiddenException(
        'You are not authorized to update this image',
      );
    }
    const imageUrl = file.path; // Assuming the file is saved and its path is available
    try {
      return await this.prisma.image.update({
        where: { id },
        data: {
          url: imageUrl,
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

  async deleteImage(userId: string, imageId: string) {
    const image = await this.prisma.image.findFirst({
      where: { id: imageId, userId: userId },
    });
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    try {
      unlinkSync(join(process.cwd(), image.url));
    } catch (error) {
      console.error(
        `error deleting file ${image.url}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
    await this.prisma.image.delete({
      where: { id: imageId },
    });
  }
}
