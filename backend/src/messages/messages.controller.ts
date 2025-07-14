import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  Query,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AuthenticatedRequest } from 'src/auth/types/authenticatedReq.type';

@Controller('api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @UseGuards(JwtAuthGuard) // Ensure the user is authenticated
  @Post()
  create(
    @Body() createMessageDto: CreateMessageDto,
    @Req() req: AuthenticatedRequest,
  ) {
    const senderId = req.user?.userId;
    if (!req.user.userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.messagesService.createMessage(createMessageDto, senderId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllMessages(
    @Req() req: AuthenticatedRequest,
    @Query('page') page: string,
    @Query('limit') limit: string,
  ) {
    const pageNumber = parseInt(page, 10) || 1;
    const limitNumber = parseInt(limit, 10) || 20;
    if (isNaN(pageNumber) || isNaN(limitNumber)) {
      throw new BadRequestException('Invalid page or limit parameter');
    }
    if (pageNumber < 1 || limitNumber < 1) {
      throw new BadRequestException('Page and limit must be greater than 0');
    }
    const senderId = req.user?.userId;

    if (!req.user?.userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.messagesService.findAllMessages(
      senderId,
      pageNumber,
      limitNumber,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.messagesService.findOneMessage(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    const senderId = req.user?.userId;
    if (!req.user?.userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.messagesService.updateMessage(id, updateMessageDto, senderId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    const senderId = req.user?.userId;
    if (!req.user?.userId) {
      throw new UnauthorizedException('User not authenticated');
    }
    return this.messagesService.deleteMessage(id, senderId);
  }
}
