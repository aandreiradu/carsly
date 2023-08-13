import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import {} from 'rxjs';
import { TokenExpiredError } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AtGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    /* 
      If its not a public route, verify the AT. 
    
      If the AT is missing, return 401.
      If the AT is expired, return 403.
    
    */
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      console.log('no token provided in authorization header');
      throw new ForbiddenException();
    }
    try {
      const tokenPayload = await this.jwtService.verifyAsync(token, {
        secret: this.config.getOrThrow<string>('__AT_SECRET'),
      });
      request['user'] = tokenPayload;
      return true;
    } catch (error) {
      console.log('error decoding the token', error);
      if (error instanceof TokenExpiredError) {
        console.log('token is expired');

        throw new ForbiddenException();
      }
      throw new UnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
