import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

import { Message } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(
    createMessageDto: CreateMessageDto & { senderId: number },
  ): Promise<Message> {
    return await this.prisma.message.create({
      data: {
        content: createMessageDto.content,
        sender: { connect: { id: createMessageDto.senderId } },
        car: { connect: { id: createMessageDto.carId } },
      },
      include: {
        sender: true,
        car: true,
      },
    });
  }

  async findAllMessages(carId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [messages, total] = await this.prisma.$transaction([
      this.prisma.message.findMany({
        where: { carId },
        skip,
        take: limit,
        include: {
          sender: true,
          car: true,
        },
      }),
      this.prisma.message.count({
        where: { carId },
      }),
    ]);
    return {
      data: messages,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} message`;
  }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
