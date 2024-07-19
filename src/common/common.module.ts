import databaseConfig from '@/common/configs/database.config';
import serverConfig from '@/common/configs/server.config';
import { DatabaseModule } from '@/common/database/database.module';
import { DatabaseService } from '@/common/database/database.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import authConfig from './configs/auth.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, serverConfig, authConfig],
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [DatabaseService],
      imports: [DatabaseModule],
      useFactory: (databaseService: DatabaseService) => {
        return {
          ...databaseService.createOptions(),
          autoLoadEntities: true,
        };
      },
    }),
  ],
})
export class CommonModule {}
