import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { removeFile } from 'src/utils/removeFile';

@Catch()
export class ValidationFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    // in case of DTO validation failure, remove the files
    console.log('exception ValidationFilter', exception);
    const response = host.switchToHttp().getResponse();
    const req = host.switchToHttp().getRequest();
    if (exception instanceof BadRequestException) {
      if (exception.message === 'Unexpected field') {
        console.log('exception files', exception.getResponse());
        return response.status(exception.getStatus()).json({
          ...Object(exception.getResponse()),
          message: 'Invalid file extension detected or size exeeded',
        });
      }

      /* delete inserted file */
      if (req?.fileInsert && req?.files?.length > 0) {
        let lastFile;
        req?.files?.forEach((file) => {
          try {
            if (file?.filename && lastFile !== file.filename) {
              removeFile(file.filename);
              lastFile = file?.filename;
            }
          } catch (error) {
            console.log('remove file error', error);
            return;
          }
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
