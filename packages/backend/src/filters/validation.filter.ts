import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch()
export class ValidationFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const req = host.switchToHttp().getRequest();
    if (exception instanceof BadRequestException) {
      console.log('files', req?.files, req?.filesInserted);

      if (exception.message === 'Unexpected field') {
        return response.status(exception.getStatus()).json({
          ...Object(exception.getResponse()),
          message: 'Invalid file extension detected or size exeeded',
        });
      }

      return response
        .status(exception.getStatus())
        .json(exception.getResponse());
    } else if (exception instanceof ForbiddenException) {
      return response.status(exception.getStatus()).json({
        ...Object(exception.getResponse()),
        message: 'Invalid file extension detected or size exeeded',
      });
    }
    return response.status(500).json(new InternalServerErrorException());
  }
}
