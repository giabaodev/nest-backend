import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Type(() => String)
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly fullName: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly address: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  readonly birthday: Date;
}
