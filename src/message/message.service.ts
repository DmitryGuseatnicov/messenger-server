import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatService } from 'src/chat/chat.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entity/message.entity';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private messageRepository: Repository<Message>,
    private userService: UsersService,
    private chatService: ChatService,
  ) {}

  async getMessageById(id: string) {
    return await this.messageRepository.findOneBy({ id });
  }

  async getMessagesByChatId(chat_id: string) {
    return await this.messageRepository.findOne({
      where: {
        chat: {
          id: chat_id,
        },
      },
      relations: {
        user: true,
      },
    });
  }

  async getMessagesByUserId(user_id: string) {
    return await this.messageRepository.findOne({
      where: {
        user: {
          id: user_id,
        },
      },
      relations: {
        user: true,
      },
    });
  }

  async createMessage(user_id: string, { text, chat_id }: CreateMessageDto) {
    const user = await this.userService.getUser(user_id);
    const chat = await this.chatService.getChatById(chat_id);
    chat.users = undefined;

    console.log({
      user,
      chat,
    });

    return await this.messageRepository.save({
      user,
      chat,
      text,
    });
  }
}
