import { CommonModule } from '@/common/common.module';
import { Module } from '@nestjs/common';
import { AuthModule } from '@/modules/auth/auth.module';
import { ProductModule } from './modules/product/product.module';
import { CategoryModule } from './modules/category/category.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    CommonModule,
    AuthModule,
    ProductModule,
    CategoryModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
