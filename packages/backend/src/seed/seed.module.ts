import { Module } from '@nestjs/common';
import { SeedController } from './seed.controller';
import { SeedService } from './seed.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SeedRepository } from './seed.repository';
import { CarService } from 'src/car/car.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService, PrismaService, SeedRepository, CarService],
})
export class SeedModule {}
