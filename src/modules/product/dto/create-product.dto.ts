import { ProductSize } from '@/common/enums/entity.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @ApiProperty({
    required: false,
    description: `Type of product: ${Object.values(ProductSize).join(' | ')}`,
    enum: ProductSize,
  })
  @IsEnum(ProductSize)
  size: ProductSize;
}
