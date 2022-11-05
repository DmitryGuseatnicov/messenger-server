import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageController } from './message.controller';
import { UsersModule } from 'src/users/users.module';
import { ChatModule } from 'src/chat/chat.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entity/message.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    UsersModule,
    ChatModule,
    AuthModule,
    TypeOrmModule.forFeature([Message]),
  ],
  providers: [MessageService],
  controllers: [MessageController],
})
export class MessageModule {}
