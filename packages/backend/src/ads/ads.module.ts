import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdsController } from './ads.controller';
import { AdsService } from './ads.service';
import { CarService } from 'src/car/car.service';
import { AdRepository } from './ads.repository';

@Module({
  controllers: [AdsController],
  providers: [AdsService, CarService, AdRepository],
})
export class AdsModule {}
