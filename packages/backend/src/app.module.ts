import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { CarModule } from './car/car.module';

@Module({
  imports: [PrismaModule, CarModule],
})
export class AppModule {}
