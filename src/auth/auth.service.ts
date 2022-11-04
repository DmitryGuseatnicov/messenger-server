import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login-dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(dto: LoginDto): Promise<User> {
    try {
      const user = await this.usersService.getUserByEmail(dto.mail);

      const isMathPassword = await bcrypt.compare(dto.password, user.password);
      if (isMathPassword) {
        user.password = undefined;
        return user;
      }

      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async register({ password, ...req }: CreateUserDto) {
    const hashPassword = await bcrypt.hash(password, 10);

    const dto = {
      ...req,
      password: hashPassword,
    };

    return await this.usersService.createUser(dto);
  }
}
