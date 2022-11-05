import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';
import { User } from './users/entity/user.entity';
import { ChatModule } from './chat/chat.module';
import { AuthModule } from './auth/auth.module';
import { Chat } from './chat/entity/chat.entity';
import { MessageModule } from './message/message.module';
import { Message } from './message/entity/message.entity';

@Module({
  imports: [
    UsersModule,
    ChatModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'admin',
      password: 'root',
      database: 'postgres',
      entities: [User, Chat, Message],
      synchronize: true,
    }),
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
