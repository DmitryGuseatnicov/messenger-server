import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entity/user.entity';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() dto: LoginDto): Promise<User> {
    return this.authService.login(dto);
  }

  @Post('/register')
  register(@Body() dto: CreateUserDto): Promise<User> {
    return this.authService.register(dto);
  }
}
