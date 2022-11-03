import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUser(id: string) {
    return await this.usersRepository.findOne({ where: { id } });
  }

  async getAllUsers(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(dto);
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    await this.usersRepository.delete(id);
    return user;
  }
}
