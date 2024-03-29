import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { removeFile } from '@common/utils/removeFile';

@Catch()
export class ValidationFilter implements ExceptionFilter {
  catch(exception, host: ArgumentsHost) {
    // in case of DTO validation failure, remove the files
    console.log('exception ValidationFilter', JSON.stringify(exception));
    const response = host.switchToHttp().getResponse();
    const req = host.switchToHttp().getRequest();

    if (exception instanceof BadRequestException) {
      const status = exception.getStatus();
      if (exception.message === 'Unexpected field') {
        console.log('Exception files', response);
        console.log({
          status,
        });
        return response.status(status).json({
          ...Object(exception.getResponse()),
          message: 'Invalid file extension detected or limit exeeded',
          timestamp: new Date().toISOString(),
          statusCode: status,
        });
      }

      /* delete inserted file */
      if (req?.fileInsert && Object.keys(req?.files).length > 0) {
        let lastFile;
        for (const it in req.files) {
          try {
            if (
              req.files[it][0]?.filename &&
              lastFile !== req.files[it][0].filename
            ) {
              removeFile(req.files[it][0].filename);
              lastFile = req.files[it][0]?.filename;
            }
          } catch (error) {
            console.log('remove file error', error);
            return;
          }
        }
      }

      return response.status(status).json({
        path: req.url,
        ...Object(exception.getResponse()),
        timestamp: new Date().toISOString(),
        statusCode: status,
      });
    } else if (exception instanceof ForbiddenException) {
      const status = exception.getStatus();
      console.log('ForbiddenException', exception);
      return response.status(status).json({
        path: req.url,
        ...Object(exception.getResponse()),
        timestamp: new Date().toISOString(),
        statusCode: status,
      });
    }

    /* delete inserted file */
    if (req?.fileInsert && Object.keys(req?.files).length > 0) {
      let lastFile;
      for (const it in req.files) {
        try {
          if (
            req.files[it][0]?.filename &&
            lastFile !== req.files[it][0].filename
          ) {
            removeFile(req.files[it][0].filename);
            lastFile = req.files[it][0]?.filename;
          }
        } catch (error) {
          console.log('remove file error', error);
          return;
        }
      }
    }
    return response.status(500).json(new InternalServerErrorException());
  }
}
