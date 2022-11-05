import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';

@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  getMyChats(@Req() { user }) {
    return this.chatService.getMyChats(user.id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createChat(@Req() { user }, @Body() dto: CreateChatDto) {
    return this.chatService.createChat(user.id, dto);
  }
}
