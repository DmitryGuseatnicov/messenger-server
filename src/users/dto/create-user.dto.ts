import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../entity/user.entity';

export class CreateUserDto
  implements Omit<Pick<User, keyof User>, 'id' | 'chats' | 'messages'>
{
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  mail: string;

  @IsNotEmpty()
  password: string;
}
