import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWTPayload } from '../types/auth.types';
import { Request } from 'express';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(config: ConfigService) {
    console.log('this is rt strategy');
    super({
      secretOrKey: config.getOrThrow<string>('__RT_SECRET'),
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          let data = request?.cookies['CARSLY_REFRESH_TOKEN'];
          console.log('Rt strategy is rt', data);
          if (!data) {
            return null;
          }
          return data.token;
        },
      ]),
    });
  }

  validate(payload: JWTPayload) {
    console.log('payload din validate este', payload);
    if (!payload) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
