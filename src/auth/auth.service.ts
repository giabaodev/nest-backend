import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from 'src/crypto/crypto.service';
import { UserService } from '../modules/user/user.service';
import { LoginDto } from './dto/login.dto';
import { ChangePWDto } from './dto/changePW.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private cryptoService: CryptoService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginDto): Promise<object> {
    const user = await this.usersService.findUsername(loginDto.username);
    if (user?.username !== loginDto.username) throw new BadRequestException('Incorrect username or password');
    if (!this.cryptoService.verified(loginDto.password, user?.password)) {
      throw new BadRequestException('Incorrect username or password');
    }
    const payload = { sub: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload);
    await this.usersService.update(user.id, { loginToken: token });
    return {
      status: 'success',
      token,
    };
  }

  async updatePassword(pwDto: ChangePWDto) {
    const hashPW = this.cryptoService.hash(pwDto.password);
    return hashPW;
  }
}
