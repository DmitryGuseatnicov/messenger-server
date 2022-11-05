import { Message } from 'src/message/entity/message.entity';
import { User } from 'src/users/entity/user.entity';
import {
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable()
  users: User[];
}
