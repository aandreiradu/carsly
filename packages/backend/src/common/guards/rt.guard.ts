import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { JWTPayload } from '@modules/auth/types/auth.types';

@Injectable()
export class RtGuard extends AuthGuard('jwt-refresh') {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {
    super();
  }

  /* 
      This guard will check the validity of the refreshToken. If the refresh token is still valid, we're generare a new access token in the service.
    */
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.cookies['CARSLY_REFRESH_TOKEN'];

    if (!refreshToken) {
      throw new UnauthorizedException();
    }
    try {
      const tokenPayload = (await this.jwtService.verifyAsync(refreshToken, {
        secret: this.config.getOrThrow<string>('__RT_SECRET'),
      })) as JWTPayload;

      const metadata = {
        userId: tokenPayload.sub,
        refreshToken,
        email: tokenPayload.email,
      };

      request['user'] = metadata;
      return true;
    } catch (error) {
      console.log('error RT GUARD', error);

      throw new UnauthorizedException();
    }
  }
}
