import { Module } from '@nestjs/common';
import { CarService } from './car.service';
import { CarController } from './car.controller';

@Module({
  imports: [],
  providers: [CarService],
  controllers: [CarController],
})
export class CarModule {}
