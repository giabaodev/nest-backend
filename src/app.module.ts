import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { CryptoModule } from './modules/crypto/crypto.module';
import { ProductModule } from './modules/product/product.module';
import { UserModule } from './modules/user/user.module';
import { ConfigModule } from './modules/config/config.module';

@Module({
  imports: [
    ConfigModule,
    DatabaseModule,
    ProductModule,
    UserModule,
    CryptoModule,
    CategoryModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
