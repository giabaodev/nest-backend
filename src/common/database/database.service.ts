import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { Database } from './interfaces/database.interface';
import { join } from 'path';

@Injectable()
export class DatabaseService implements Database {
  constructor(private readonly configService: ConfigService) {}

  createOptions(): PostgresConnectionOptions {
    const env = this.configService.get<string>('app.env');
    const host = this.configService.get<string>('database.host');
    const port = this.configService.get<number>('database.port');
    const username = this.configService.get<string>('database.user');
    const password = this.configService.get<string>('database.password');
    const database = this.configService.get<string>('database.name');

    const postgresOptions: PostgresConnectionOptions = {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database,
      // entities: ['src/**/*.entity.ts'],
      synchronize: env === 'dev',
    };
    return postgresOptions;
  }
}
