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
import { exec } from 'node:child_process';

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
  app.enableShutdownHooks();
  app.useStaticAssets(join(__dirname, '..', 'uploads'));

  process.on('SIGINT', () => {
    console.log('SIGINT received', __dirname);
    exec(
      'docker compose -f ../../docker/docker-compose.yaml stop dev-db',
      (err) => {
        if ('err') {
          console.log('err', err);
          app.close().then(() => {
            console.error('Closing Nest application');
            process.exit(0);
          });
        }

        app.close().then(() => {
          console.log('NestJS application closed gracefully.');
          process.exit(0);
        });
      },
    );
  });

  await app.listen(5174);
}

bootstrap();
