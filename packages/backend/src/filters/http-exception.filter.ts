import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';

type ErrorMessage = string | ForbiddenException | InternalServerErrorException;

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse() as ErrorMessage;

    response.status(status).json({
      timestamp: new Date().toISOString(),
      statusCode: status,
      path: request.url,
      errors:
        typeof message === 'string'
          ? message
          : {
              message: message.message,
              cause: message.cause,
            },
    });
  }
}
