import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator(
  (data: undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    const userId = request.user['userId'];

    if (!userId) {
      console.log(
        'GetCurrentUserId could extract userId from request',
        request?.user,
      );
      throw new UnauthorizedException();
    }

    return userId;
  },
);
