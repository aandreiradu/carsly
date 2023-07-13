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
    // TODO: in case of DTO validation failure, remove the files
    console.log('exception', exception);
    const response = host.switchToHttp().getResponse();
    const req = host.switchToHttp().getRequest();
    console.log('files', req.files);
    console.log('inserted', req.fileInsert);
    if (exception instanceof BadRequestException) {
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
