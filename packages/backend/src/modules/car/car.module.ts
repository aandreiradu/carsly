import { Module } from '@nestjs/common';
import { CarService } from '@modules/car/car.service';
import { CarController } from '@modules/car/car.controller';
import { RedisService } from '@common/redis/redis.service';

@Module({
  imports: [],
  providers: [CarService, RedisService],
  controllers: [CarController],
})
export class CarModule {}
