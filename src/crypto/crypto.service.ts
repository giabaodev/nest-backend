import { Injectable } from '@nestjs/common';
import { createHmac, randomBytes } from 'crypto';

@Injectable()
export class CryptoService {
  hash(str: string): string {
    const salt = randomBytes(12).toString('base64');
    const hmac = createHmac('sha256', salt);
    return `${salt}.${hmac.update(str).digest('base64')}`;
  }
  verified(password: string, hashPassword: string) {
    const splitHash = hashPassword.split('.');
    console.log('------splitHash---', splitHash);
    const hmac = createHmac('sha256', splitHash[0]);
    console.log('------hmac---', hmac);
    const createPwHash = hmac.update(password).digest('base64');
    console.log('------createPwHash---', createPwHash);
    return createPwHash === splitHash[1];
  }
}
