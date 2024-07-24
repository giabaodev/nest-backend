import { HttpStatus } from '@nestjs/common';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class BaseResponse<T> {
  @ApiProperty({
    example: 'Success',
  })
  readonly status: string;

  @ApiProperty({
    example: 'Get API Successfully',
  })
  readonly message: string;

  @ApiProperty({
    example: 200,
  })
  readonly statusCode: HttpStatus;

  @ApiHideProperty()
  readonly data: T;

  constructor(init?: Partial<BaseResponse<T>>) {
    Object.assign(this, init);
  }

  public static success<U>(message: string, data?: U): BaseResponse<U> {
    return new BaseResponse<U>({
      status: 'Success',
      statusCode: HttpStatus.OK,
      message,
      data,
    });
  }

  public static failed<unknow>(
    code: HttpStatus,
    message: string,
  ): BaseResponse<unknow> {
    return new BaseResponse<unknow>({
      status: 'Failed',
      statusCode: code,
      message,
      data: null,
    });
  }

  public static badRequest<U>(
    code: HttpStatus,
    message: string,
  ): BaseResponse<U> {
    return new BaseResponse<U>({
      status: 'Failed',
      statusCode: HttpStatus.BAD_REQUEST,
      message,
      data: null,
    });
  }

  public static internalError<U>(
    code: HttpStatus,
    message: string,
  ): BaseResponse<U> {
    return new BaseResponse<U>({
      status: 'Failed',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message,
      data: null,
    });
  }

  public toString(): string {
    return JSON.stringify(this);
  }
}
