import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CryptoService } from '@/common/crypto/crypto.service';
import { LoginDto } from './dto/login.dto';
import { ChangePWDto } from './dto/changePW.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private cryptoService: CryptoService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginDto: LoginDto): Promise<object> {
    const user = await this.usersService.findByUsername(loginDto.username);
    if (user?.username !== loginDto.username)
      throw new BadRequestException('Incorrect username or password');
    if (!this.cryptoService.verifyHash(loginDto.password, user?.password)) {
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

  async updatePassword(pwDto: ChangePWDto): Promise<string> {
    const hashPW = this.cryptoService.hashText(pwDto.password);
    return hashPW;
  }
}
