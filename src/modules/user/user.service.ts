import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PSError } from '../../common/constants/dbError';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create({
    email,
    password,
    fullName,
    address,
    birthday,
  }: Partial<User>): Promise<User> {
    try {
      const username = email.split('@')[0];
      const createUser = this.userRepository.create({
        email,
        username,
        password,
        fullName,
        address,
        birthday,
      });
      return await this.userRepository.save(createUser);
    } catch (error) {
      if (error.code === PSError.UniqueViolation)
        throw new ConflictException('Username is already taken');
      throw error;
    }
  }

  async findOne(id: string): Promise<User | null> {
    const findUser = await this.userRepository.findOneBy({ id });
    if (!findUser) throw new NotFoundException();
    return findUser;
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOneBy({ username });
  }

  async existByUsername(username: string): Promise<boolean> {
    return this.userRepository.existsBy({ username });
  }

  async existByEmail(email: string): Promise<boolean> {
    return this.userRepository.existsBy({ email });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    const updateUser = await this.userRepository.update(id, updateUserDto);
    if (updateUser.affected > 0)
      return await this.userRepository.findOneBy({ id });
    return null;
  }
}
