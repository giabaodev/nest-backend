import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from 'src/crypto/crypto.service';
import { UserService } from '../modules/user/user.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private cryptoService: CryptoService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginDto): Promise<object> {
    const user = await this.usersService.findUsername(loginDto.username);
    if (user?.password !== loginDto.password) throw new BadRequestException('Incorrect username or password');
    if (!this.cryptoService.verified(loginDto.password, user?.password)) {
      throw new BadRequestException('Incorrect username or password');
    }
    return {
      status: 'success',
      token: this.jwtService.sign({ username: loginDto.username }),
    };
  }
}
