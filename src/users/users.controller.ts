import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { DeleteUserDto } from './dto/delete-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get('/:id')
  getUser(@Param('id') id: string) {
    return this.userService.getUser(id);
  }

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post('/:id')
  updateUser(@Param('id') id, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser(id, dto);
  }

  @Delete()
  deleteUser(@Body() dto: DeleteUserDto) {
    return this.userService.deleteUser(dto.id);
  }
}
