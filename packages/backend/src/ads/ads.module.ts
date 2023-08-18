import { Module } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { CarService } from 'src/car/car.service';
import { AdRepository } from './ads.repository';
import { InjectUserId } from 'src/guards';

@Module({
  controllers: [AdsController],
  providers: [AdsService, CarService, AdRepository, InjectUserId],
})
export class AdsModule {}
