import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entity/chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private chatRepository: Repository<Chat>,
    private userService: UsersService,
  ) {}

  async getMyChats(user_id: string) {
    const userChats = await this.userService.getUserChatsById(user_id);

    const chats = await this.chatRepository.find({
      where: [...userChats.chats],
      relations: {
        users: true,
      },
    });
    return chats;
  }

  async getChatById(id) {
    return await this.chatRepository.findOne({
      where: { id },
      relations: {
        users: true,
      },
    });
  }

  async createChat(user_id, dto: CreateChatDto) {
    const firstUser = await this.userService.getUser(user_id);
    const secondUser = await this.userService.getUser(dto.user_id);

    const chat = new Chat();
    chat.users = [firstUser, secondUser];

    return await this.chatRepository.save(chat);
  }
}
