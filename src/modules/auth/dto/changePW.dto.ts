import { IsString } from 'class-validator';

export class ChangePWDto {
  @IsString()
  password: string;
}
