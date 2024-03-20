import { IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsPositive()
  quantity: number;

  @IsString()
  @IsOptional()
  description: string;

  @IsNotEmpty()
  categoryId: number;
}
