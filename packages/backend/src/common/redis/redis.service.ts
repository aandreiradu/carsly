import { RedisService as NestRedisService } from '@liaoliaots/nestjs-redis';
import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redis: Redis;

  constructor(private readonly redisService: NestRedisService) {
    this.redis = this.redisService.getClient();
  }

  async set(key: string, value: any) {
    return this.redis.set(key, JSON.stringify(value));
  }

  async get<T>(key: string): Promise<T | null> {
    const value = await this.redis.get(key);
    if (!value) return null;

    return JSON.parse(value);
  }
}
