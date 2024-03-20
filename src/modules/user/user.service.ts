import { PSError } from './../../constants/dbError';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}
  async create(createUserDto: CreateUserDto): Promise<string> {
    try {
      await this.userRepository.save(createUserDto);
      return 'Create successfully';
    } catch (error) {
      if (error.code === PSError.UniqueViolation) throw new ConflictException('Username is already taken');
      throw error;
    }
  }

  async findOne(id: string): Promise<User | null> {
    const findUser = await this.userRepository.findOneBy({ id });
    if (!findUser) throw new NotFoundException();
    return findUser;
  }

  async findUsername(username: string): Promise<User | null> {
    const findUser = this.userRepository.findOneBy({ username });
    if (!findUser) throw new NotFoundException();
    return findUser;
  }
}
