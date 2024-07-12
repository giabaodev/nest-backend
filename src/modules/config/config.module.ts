import { Module } from '@nestjs/common';
import {
  ConfigService,
  ConfigModule as NestConfigModule,
} from '@nestjs/config';
import databaseConfig from 'src/configs/database.config';
import serverConfig from 'src/configs/server.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [databaseConfig, serverConfig],
      envFilePath: ['.env'],
      isGlobal: true,
    }),
  ],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {}
