import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';

export interface ExtendedRequest extends Request {
  user: {
    email: string;
    sub: string;
  };
}

export class InjectUserId implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest() as ExtendedRequest;

    if (request?.user?.sub) {
      request.body = {
        ...request.body,
        userId: request?.user?.sub,
      };
    }

    return true;
  }
}
