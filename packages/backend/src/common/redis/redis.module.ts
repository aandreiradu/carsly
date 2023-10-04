import { Module } from '@nestjs/common';
import { RedisModule as Redis } from '@liaoliaots/nestjs-redis';
import { ConfigService } from '@nestjs/config';
import { RedisService } from './redis.service';

@Module({
  imports: [
    Redis.forRootAsync({
      useFactory(config: ConfigService) {
        const host = config.get<string>('REDIS_HOST');
        const port = +config.get<number>('REDIS_PORT');
        const password = config.get<string>('REDIS_PASSWORD');

        return {
          config: {
            host,
            port,
            password,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [RedisService],
})
export class RedisModule {}
