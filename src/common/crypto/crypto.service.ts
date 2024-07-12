import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bcrypt from 'bcrypt';

@Injectable()
export class CryptoService {
  constructor(private readonly configService: ConfigService) {}

  async hashText(str: string): Promise<string> {
    const saltRounds = this.configService.get<number>('auth.saltRounds');
    return await bcrypt.hash(str, saltRounds);
  }

  async verifyHash(str: string, hashedString: string): Promise<boolean> {
    return await bcrypt.compare(str, hashedString);
  }
}
