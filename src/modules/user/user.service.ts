import { PSError } from './../../constants/dbError';
import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CryptoService } from 'src/crypto/crypto.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private cryptoService: CryptoService,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<string> {
    try {
      const hashPassword = this.cryptoService.hash(createUserDto.password);
      const createUser = this.userRepository.create({
        ...createUserDto,
        password: hashPassword,
      });
      await this.userRepository.save(createUser);
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updateUser = await this.userRepository.update(id, updateUserDto);
    if (updateUser.affected > 0) return await this.userRepository.findOneBy({ id });
    throw new BadRequestException('Failed to update');
  }
}
