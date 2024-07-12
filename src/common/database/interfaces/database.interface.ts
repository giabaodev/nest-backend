import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export interface Database {
  createOptions(): PostgresConnectionOptions;
}
