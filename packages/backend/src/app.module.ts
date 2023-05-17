import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { CarModule } from './car/car.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, CarModule, AuthModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AppModule {}
