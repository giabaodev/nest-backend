import { BaseResponse } from '@/common/bases/base.response';
import { CryptoService } from '@/common/crypto/crypto.service';
import { randomString } from '@/utils/string.utils';
import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly cryptoService: CryptoService,
  ) {}

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<BaseResponse<User>> {
    const existEmail = await this.userService.existByEmail(createUserDto.email);
    if (existEmail) throw new ConflictException('Email already exists');
    const passwordString = randomString(10);
    const password = await this.cryptoService.hashText(passwordString);
    const result = await this.userService.create({
      ...createUserDto,
      password,
    });
    return BaseResponse.success<User>('Create user successfully', result);
  }

  @Get()
  async findOneByUsername(
    @Query('username') username: string,
  ): Promise<BaseResponse<User>> {
    const findUser = await this.userService.findByUsername(username);
    return BaseResponse.success<User>('Find user successfully', findUser);
  }
}
