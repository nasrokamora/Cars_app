import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  UnauthorizedException,
  UseInterceptors,
  UploadedFile,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { ImagesService } from './images.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/types/authenticatedReq.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateImageDto } from './dto/update-image.dto';
import multer from 'multer';
import { extname } from 'path';
// import { UpdateImageDto } from './dto/update-image.dto';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @UseGuards(JwtAuthGuard) // Ensure the user is authenticated
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: './upload',
        filename(req, file, cb) {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}-${extname(file.originalname)}`);
        },
      }),
    }),
  ) // Use FileInterceptor to handle file uploads
  @Post('/upload/:carId')
  createImage(
    @Param('carId') carId: string,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.imagesService.createImage(userId, file, carId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateImageDto: UpdateImageDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user?.userId;
    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return await this.imagesService.UpdateImage(id, userId, file);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(
    @Param('id', ParseUUIDPipe) imageId: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const userId = req.user?.userId;
    await this.imagesService.deleteImage(userId, imageId);
    return { message: 'Image deleted successfully' };
  }
}
