import { CommonModule } from '@/common/common.module';
import { Module } from '@nestjs/common';
import { AuthModule } from '@/modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { UserModule } from './modules/user/user.module';
import { OrderModule } from './modules/order/order.module';
import { LoggerModule } from './common/logging/logger.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    UserModule,
    OrderModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
