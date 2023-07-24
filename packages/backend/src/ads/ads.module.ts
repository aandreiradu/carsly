import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { CarService } from 'src/car/car.service';

@Module({
  controllers: [AdsController],
  providers: [AdsService, CarService],
})
export class AdsModule {}
