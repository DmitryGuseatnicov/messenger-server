import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login-dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async auth(user) {
    return await this.usersService.getUser(user.id);
  }

  async login(dto: LoginDto): Promise<string> {
    try {
      const user = await this.usersService.getUserByEmail(dto.mail);

      const isMathPassword = await bcrypt.compare(dto.password, user.password);
      if (isMathPassword) {
        user.password = undefined;

        return this.generateToken(user);
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

  async register({ password, ...req }: CreateUserDto): Promise<string> {
    const hashPassword = await bcrypt.hash(password, 10);

    const dto = {
      ...req,
      password: hashPassword,
    };

    const user = await this.usersService.createUser(dto);
    return this.generateToken(user);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private async generateToken({ password, ...user }: User): Promise<string> {
    return this.jwtService.sign(user);
  }
}
