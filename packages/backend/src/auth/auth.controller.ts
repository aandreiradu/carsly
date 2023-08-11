import { Response } from 'express';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO, SignUpDTO } from './dto';
import { AuthAccountCreated, RequestMetadata } from './types/auth.types';
import { Public } from 'src/decorators/public.decorator';
import { GetCurrentUserId } from 'src/decorators';
import { RtGuard } from 'src/guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

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
        maxAge: 24 * 60 * 60 * 1000,
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

    return res.json(accessToken);
  }

  @Get('/logout')
  @UseGuards(RtGuard)
  @HttpCode(HttpStatus.OK)
  async logout(@GetCurrentUserId() userId: string, @Res() res: Response) {
    try {
      await this.authService.logout(userId);
      res.clearCookie('CARSLY_REFRESH_TOKEN');
      return res.json({
        message: 'ok',
        status: 200,
      });
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      throw new InternalServerErrorException('Something went wrong');
    }
  }
}
