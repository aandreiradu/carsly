import { Module } from '@nestjs/common';
import { AdsController } from '@modules/ads/ads.controller';
import { AdsService } from '@modules/ads/ads.service';
import { CarService } from '@modules/car/car.service';
import { AdRepository } from '@modules/ads/ads.repository';
import { InjectUserId } from '@common/guards';
import { RedisService } from '@common/redis/redis.service';

@Module({
  controllers: [AdsController],
  providers: [AdsService, RedisService, CarService, AdRepository, InjectUserId],
})
export class AdsModule {}
