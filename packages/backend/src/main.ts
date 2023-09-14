import { NestFactory } from '@nestjs/core';
import { AppModule } from '@modules/main/app.module';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
    app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        const errors = validationErrors.map((error) => ({
          field: error.property,
          error: Object.values(error.constraints).join(', '),
        }));
        return new BadRequestException(errors);
      },
      whitelist: true,
    }),
  );
  app.useStaticAssets(join(__dirname, '..', 'uploads'));
  await app.listen(5174);
}
bootstrap();
