import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-dto';
import { JwtAuthGuard } from './guard/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  auth(@Req() { user }) {
    return this.authService.auth(user);
  }

  @Post('/login')
  login(@Body() dto: LoginDto): Promise<string> {
    return this.authService.login(dto);
  }

  @Post('/register')
  register(@Body() dto: CreateUserDto): Promise<string> {
    return this.authService.register(dto);
  }
}
