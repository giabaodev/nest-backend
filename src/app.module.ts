import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import databaseConfig from './configs/database.config';
import serverConfig from './configs/server.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './modules/product/product.module';
import { AccountModule } from './modules/account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, serverConfig],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get<string>('db_host'),
          port: configService.get<number>('db_port'),
          username: configService.get<string>('db_user'),
          password: configService.get<string>('db_password'),
          database: configService.get<string>('db_name'),
          autoLoadEntities: true,
          // synchronize: true,
        };
      },
    }),
    ProductModule,
    AccountModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
