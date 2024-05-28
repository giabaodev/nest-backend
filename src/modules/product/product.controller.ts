import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { BaseResponse } from '@/common/bases/base.response';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiCreatedResponse()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<BaseResponse<Product>> {
    const result = await this.productService.create(createProductDto);
    return {
      message: 'Product created successfully',
      statusCode: HttpStatus.CREATED,
      data: result,
    };
  }

  @Get()
  async getListProduct(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product | null> {
    return await this.productService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<string> {
    return await this.productService.delete(+id);
  }
}
