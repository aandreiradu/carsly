import { Module } from '@nestjs/common';
import { SeedController } from '@common/seed/seed.controller';
import { SeedService } from '@common/seed/seed.service';
import { PrismaService } from '@common/prisma/prisma.service';
import { SeedRepository } from '@common/seed/seed.repository';
import { CarService } from '@modules/car/car.service';
import { RedisService } from '@common/redis/redis.service';

@Module({
  controllers: [SeedController],
  providers: [
    SeedService,
    RedisService,
    PrismaService,
    SeedRepository,
    CarService,
  ],
})
export class SeedModule {}
