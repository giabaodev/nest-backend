import { registerAs } from '@nestjs/config';

export default registerAs(
  'database',
  (): Record<string, unknown> => ({
    host: process.env.DATABASE_HOST,
    port: Number.parseInt(process.env.DATABASE_PORT) || 5432,
    name: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
  }),
);
