import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUser(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    user.password = undefined;
    return user;
  }

  async getUserByEmail(mail: string) {
    return await this.usersRepository.findOneBy({ mail });
  }

  async getAllUsers(): Promise<User[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => this.removePassword(user));
  }

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.save(dto);
    user.password = undefined;
    return user;
  }

  async updateUser(id: string, dto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update({ id }, dto);
    return await this.usersRepository.findOneBy({ id });
  }

  async deleteUser(id: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    await this.usersRepository.delete(id);
    return user;
  }

  private removePassword(user: User) {
    user.password = undefined;
    return user;
  }
}
