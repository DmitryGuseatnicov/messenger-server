import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { User } from 'src/users/entity/user.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { MessageService } from './message.service';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post('/')
  @UseGuards(JwtAuthGuard)
  addMessage(@Req() { user }, @Body() dto: CreateMessageDto) {
    return this.messageService.createMessage(user.id, dto);
  }
}
