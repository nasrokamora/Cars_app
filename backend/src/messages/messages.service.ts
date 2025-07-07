import { Injectable } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

import { Message } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageResponseDto } from './dto/message-response.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async createMessage(
    createMessageDto: CreateMessageDto,
    senderId: number,
  ): Promise<Message> {
    return await this.prisma.message.create({
      data: {
        content: createMessageDto.content,
        sender: { connect: { id: senderId } },
        car: { connect: { id: createMessageDto.carId } },
      },
    });
  }

  async findAllMessages(senderId: string, page = 1, limit = 20) {
    const skip = (page - 1) * limit;
    const [messages, total] = await this.prisma.$transaction([
      this.prisma.message.findMany({
        where: { senderId },
        skip,
        take: limit,
        include: {
          sender: true,
          car: true,
        },
      }),
      this.prisma.message.count({
        where: { senderId },
      }),
    ]);
    return {
      data: messages,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findOneMessage(id: string): Promise<MessageResponseDto | null> {
    const message = await this.prisma.message.findUnique({
      where: { id },
      include: {
        sender: { select: { id: true, username: true } },
        car: { select: { id: true, title: true, price: true } },
      },
    });
    if (!message) {
      return null;
    }
    return {
      id: message.id,
      content: message.content,
      createdAt: message.createdAt,
      sender: {
        id: message.sender.id,
        username: message.sender.username,
      },
      car: {
        id: message.car.id,
        title: message.car.title,
        price: message.car.price,
      },
    };
  }

  // update(id: number, updateMessageDto: UpdateMessageDto) {
  //   return `This action updates a #${id} message`;
  // }

  remove(id: number) {
    return `This action removes a #${id} message`;
  }
}
