import databaseConfig from '@/common/configs/database.config';
import serverConfig from '@/common/configs/server.config';
import { DatabaseModule } from '@/common/database/database.module';
import { DatabaseService } from '@/common/database/database.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, serverConfig],
      envFilePath: ['.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [DatabaseService],
      imports: [DatabaseModule],
      useFactory: (databaseService: DatabaseService) =>
        databaseService.createOptions(),
    }),
  ],
})
export class CommonModule {}
