import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): Record<string, unknown> => ({
    port: process.env.PORT || 3000,
  }),
);
