import { registerAs } from '@nestjs/config';

export default registerAs(
  'app',
  (): Record<string, unknown> => ({
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'dev',
    httpEnable: process.env.HTTP_ENABLE || true,
  }),
);
