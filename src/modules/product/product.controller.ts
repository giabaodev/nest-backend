import { BaseResponse } from '@/common/bases/base.response';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('Product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @HttpCode(201)
  @ApiCreatedResponse()
  async create(
    @Body() createProductDto: CreateProductDto,
  ): Promise<BaseResponse<Product>> {
    const result = await this.productService.create(createProductDto);
    return BaseResponse.success('Create product successfully', result);
  }

  @Get()
  async getListProduct(): Promise<BaseResponse<Product[]>> {
    const result = await this.productService.findAll();
    return BaseResponse.success('Product list successfully', result);
  }

  @Get(':id')
  async getProductById(
    @Param('id') id: string,
  ): Promise<BaseResponse<Product>> {
    const product = await this.productService.findOne(+id);
    if (!product) throw new NotFoundException('Product not found');
    return BaseResponse.success('Find product successfully', product);
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
