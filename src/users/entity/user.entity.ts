import { Chat } from 'src/chat/entity/chat.entity';
import { Message } from 'src/message/entity/message.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  mail: string;

  @Column()
  password: string;

  @OneToMany(() => Message, (message) => message.user)
  messages: Message[];

  @ManyToMany(() => Chat, (chat) => chat.users)
  chats: Chat[];
}
