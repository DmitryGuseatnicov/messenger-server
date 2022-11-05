import { IsEmail, IsNotEmpty } from 'class-validator';

export type LoginDtoData = {
  mail: string;
  password: string;
};

export class LoginDto implements LoginDtoData {
  @IsNotEmpty()
  @IsEmail()
  mail: string;

  @IsNotEmpty()
  password: string;
}
