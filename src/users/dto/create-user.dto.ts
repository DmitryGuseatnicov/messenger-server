import { IsNotEmpty } from 'class-validator';
import { User } from '../entity/user.entity';

export class CreateUserDto implements Omit<Pick<User, keyof User>, 'id'> {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}
