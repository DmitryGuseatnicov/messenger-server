import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() dto: LoginDto): Promise<string> {
    return this.authService.login(dto);
  }

  @Post('/register')
  register(@Body() dto: CreateUserDto): Promise<string> {
    return this.authService.register(dto);
  }
}
