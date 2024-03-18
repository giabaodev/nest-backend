import { Injectable } from '@nestjs/common';
import { UserService } from '../modules/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async signIn(loginDto: LoginDto): Promise<any> {
    // const user = await this.usersService.findOne(loginDto.username);
    // if (user?.password !== pass) {
    //   throw new UnauthorizedException();
    // }
    // const { password, ...result } = user;
    return loginDto;
  }
}
