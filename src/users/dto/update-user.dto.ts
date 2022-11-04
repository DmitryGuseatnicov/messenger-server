import { IsEmail, IsNotEmpty } from 'class-validator';
import { User } from '../entity/user.entity';

export class UpdateUserDto implements Partial<User> {
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
