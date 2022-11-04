import { IsEmail, IsNotEmpty } from 'class-validator';
import { Entity } from 'typeorm';

export type LoginDtoData = {
  mail: string;
  password: string;
};

@Entity()
export class LoginDto implements LoginDtoData {
  @IsNotEmpty()
  @IsEmail()
  mail: string;

  @IsNotEmpty()
  password: string;
}
