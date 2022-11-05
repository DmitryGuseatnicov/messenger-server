import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('/update')
  @UseGuards(JwtAuthGuard)
  updateUser(@Req() { user }, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(user.id, dto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteUser(@Body() dto: DeleteUserDto) {
    return this.userService.deleteUser(dto.id);
  }
}
