import { Response } from 'express';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Post,
  Query,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { SignInDTO, SignUpDTO } from '@modules/auth/dto';
import {
  AuthAccountCreated,
  RequestMetadata,
} from '@modules/auth/types/auth.types';
import { Public } from '@common/decorators/public.decorator';
import { GetCurrentUserId } from '@common/decorators';
import { RtGuard } from '@common/guards';
import {
  GetTokenResetPasswordDTO,
  ResetPasswordDTO,
} from './dto/reset-password.dto';
import { Throttle } from '@nestjs/throttler';
import { RedisService } from '@common/redis/redis.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly redisService: RedisService,
  ) {}

  @Throttle({ short: { limit: 3, ttl: 1000 } })
  @Public()
  @Post('/local/signup')
  @HttpCode(HttpStatus.CREATED)
  async signUpLocal(@Body() dto: SignUpDTO): Promise<AuthAccountCreated> {
    return this.authService.signUpLocal(dto);
  }

  @Throttle({ short: { limit: 3, ttl: 1000 } })
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

  @Throttle({ short: { limit: 5, ttl: 1000 } })
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

  @Throttle({ short: { limit: 3, ttl: 1000 } })
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

  @Public()
  @Post('/reset-password/token')
  async getTokenResetPassword(
    @Body() resetPasswordDto: GetTokenResetPasswordDTO,
  ): Promise<void> {
    await this.authService.sendResetPasswordToken(resetPasswordDto);
  }

  @Public()
  @Get('/reset-password/verify/:token')
  async verifyResetPasswordToken(@Param('token') token: string): Promise<void> {
    if (!token) {
      throw new BadRequestException('Missing params token');
    }

    const user = await this.authService.verifyResetTokenPassword(token);

    if (!user || !Object.keys(user).length) {
      throw new UnauthorizedException('Invalid token');
    }

    return;
  }

  @Public()
  @Post('/reset-password')
  async resetPassword(
    @Body() resetPasswordDto: ResetPasswordDTO,
    @Query('token') token: string,
  ) {
    if (!token) {
      throw new BadRequestException('Missing token param');
    }

    return this.authService.resetPassword(resetPasswordDto.password, token);
  }
}
