import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';

import { Message } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { MessageResponseDto } from './dto/message-response.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  private MapToResponseDto(
    message: Message & {
      sender: { id: string; username: string };
      car: { id: string; title: string; price: number };
    },
  ): MessageResponseDto {
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

  async createMessage(
    createMessageDto: CreateMessageDto,
    senderId: string,
  ): Promise<Message> {
    return await this.prisma.message.create({
      data: {
        content: createMessageDto.content,
        sender: { connect: { id: senderId } },
        car: { connect: { id: createMessageDto.carId } },
      },
    });
  }

  async findAllMessages(
    senderId: string,
    page = 1,
    limit = 20,
  ): Promise<{
    data: MessageResponseDto[];
    meta: { page: number; limit: number; total: number };
  }> {
    const skip = (page - 1) * limit;
    const [messages, total] = await this.prisma.$transaction([
      this.prisma.message.findMany({
        where: { senderId },
        skip,
        take: limit,
        include: {
          sender: { select: { id: true, username: true } },
          car: { select: { id: true, title: true, price: true } },
        },
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.message.count({
        where: { senderId },
      }),
    ]);
    return {
      data: messages,
      meta: {
        page,
        limit,
        total,
      },
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
    if (!message || !message.sender || !message.car) {
      throw new NotFoundException(`message with id ${id} not found`);
    }
    // Map the message to the MessageResponseDto format
    return this.MapToResponseDto(message);
  }

  // Update a message
  // This method allows the sender to update their own message content and associated car.
  async updateMessage(
    id: string,
    updateMessageDto: UpdateMessageDto,
    senderId: string,
  ): Promise<MessageResponseDto | null> {
    const message = await this.prisma.message.findUnique({
      where: { id },
      include: {
        sender: { select: { id: true, username: true } },
        car: { select: { id: true, title: true, price: true } },
      },
    });
    if (!message) {
      throw new NotFoundException(`Message with id ${id} not found`);
    }
    if (message.senderId !== senderId) {
      throw new BadRequestException(
        `You are not authorized to update this message`,
      );
    }
    const updatedMessage = await this.prisma.message.update({
      where: { id },
      data: {
        content: updateMessageDto.content,
        car: { connect: { id: updateMessageDto.carId } },
      },
      include: {
        sender: { select: { id: true, username: true } },
        car: { select: { id: true, title: true, price: true } },
      },
    });
    return this.MapToResponseDto(updatedMessage);
  }

  // Delete a message
  // This method allows the sender to delete their own message.
  async deleteMessage(id: string, senderId: string): Promise<boolean> {
    const message = await this.prisma.message.findUnique({
      where: { id },
    });
    if (!message || message.senderId !== senderId) {
      return false;
    }
    await this.prisma.message.delete({
      where: { id },
    });
    return true;
  }
}
