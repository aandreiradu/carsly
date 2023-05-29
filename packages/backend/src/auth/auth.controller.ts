import { Request, Response } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO, SignUpDTO } from './dto';
import {
  AuthAccountCreated,
  AuthTokens,
  RequestMetadata,
} from './types/auth.types';
import { Public } from 'src/decorators/public.decorator';
// import { AtGuard, RtGuard } from 'src/guards';
import { GetCurrentUserId } from 'src/decorators';
import { CryptoService } from 'src/utils/crypto';
import { ConfigService } from '@nestjs/config';
import { RtGuard } from 'src/guards';
import { Reflector } from '@nestjs/core';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private crypto: CryptoService,
    private config: ConfigService,
  ) {}

  @Public()
  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  signUpLocal(@Body() dto: SignUpDTO): Promise<AuthAccountCreated> {
    console.log('dto received', dto);
    return this.authService.signUpLocal(dto);
  }

  @Public()
  @Post('/local/signin')
  @HttpCode(HttpStatus.OK)
  async signInLocal(
    @Body() dto: SignInDTO,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string; firstName: string }> {
    const { accessToken, refreshToken, firstName } =
      await this.authService.signInLocal(dto);

    if (refreshToken) {
      response.cookie('CARSLY_REFRESH_TOKEN', refreshToken, {
        sameSite: 'none',
        secure: true,
        maxAge: Number(this.config.get('__RT_EXPIRATION_SECONDS')),
      });
    }

    return {
      accessToken,
      firstName,
    };
  }

  @Public()
  @UseGuards(RtGuard)
  @Get('/refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: RequestMetadata, @Res() res: Response) {
    console.log('req metadata in controller', req['user']);

    const { email, refreshToken, userId } = req['user'];

    if (!userId || !refreshToken) {
      console.log(
        'could not extract the userId or refreshToken from request metadata',
      );
      throw new UnauthorizedException();
    }

    const checkRTHashing = await this.authService.checkRTHashing(
      userId,
      refreshToken,
    );

    if (!checkRTHashing) {
      console.log('Controller the RT hash dont match');
      throw new UnauthorizedException();
    }

    /* here the refresh token is valid, we can generate & return a new access token */
    const accessToken = await this.authService.getTokens(userId, email, 'AT');
    console.log('new access token generated', accessToken);

    return res.json(accessToken);
  }

  @Public()
  @Get('/logout')
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: string) {
    try {
      console.log('userId received in controller', userId);

      await this.authService.logout(userId);

      return {
        message: 'ok',
        status: 200,
      };
    } catch (error) {
      if (error instanceof Error) {
        return {
          message: error.message,
          status: 500,
        };
      }
    }
  }
}
