import { Injectable } from '@nestjs/common';
import { createHmac, randomBytes } from 'crypto';

@Injectable()
export class CryptoService {
  hash(str: string): string {
    const salt = randomBytes(12).toString('base64');
    const hmac = createHmac('sha256', salt);
    return `${salt}.${hmac.update(str).digest('base64')}`;
  }
  verified(password: string, hashPassword: string): boolean {
    const splitHash = hashPassword.split('.');
    const hmac = createHmac('sha256', splitHash[0]);
    const createPwHash = hmac.update(password).digest('base64');
    return createPwHash === splitHash[1];
  }
}
