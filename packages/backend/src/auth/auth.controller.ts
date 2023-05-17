import {
  Body,
  Controller,
  ForbiddenException,
  Header,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDTO } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { AuthAccountCreated } from './types/auth.types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUpLocal(@Body() dto): Promise<AuthAccountCreated> {
    console.log('dto received', dto);
    return this.authService.signUpLocal(dto);
  }
}
