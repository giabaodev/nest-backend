import { registerAs } from '@nestjs/config';
import ms from 'ms';

export default registerAs(
  'auth',
  (): Record<string, unknown> => ({
    jwt: {
      secretKey: process.env.JWT_SECRETKEY,
      expiresIn: ms(process.env.JWT_EXPIRATION) || '1d',
    },
  }),
);
