import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export abstract class BaseResponse<T> {
  @ApiProperty()
  readonly message: string;
  @ApiProperty()
  readonly statusCode: HttpStatus;
  @ApiProperty()
  readonly data: T;
}
