import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { UsersModule } from 'src/users/users.module';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { Chat } from './entity/chat.entity';

@Module({
  imports: [UsersModule, AuthModule, TypeOrmModule.forFeature([Chat])],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
