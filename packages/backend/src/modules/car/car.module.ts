import { Module } from '@nestjs/common';
import { CarService } from '@modules/car/car.service';
import { CarController } from '@modules/car/car.controller';

@Module({
  imports: [],
  providers: [CarService],
  controllers: [CarController],
})
export class CarModule {}
