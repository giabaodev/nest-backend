import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ChangePWDto } from './dto/changePW.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() loginDto: LoginDto): Promise<object> {
    return this.authService.signIn(loginDto);
  }

  @HttpCode(HttpStatus.OK)
  @Put('password-change')
  updatePassword(@Body() passwordDto: ChangePWDto): Promise<string> {
    return this.authService.updatePassword(passwordDto);
  }
}
