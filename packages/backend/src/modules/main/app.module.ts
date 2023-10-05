import { Module } from '@nestjs/common';
import { PrismaModule } from '@common/prisma/prisma.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AtGuard, RolesGuard } from '@common/guards';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { CarModule } from '@modules/car/car.module';
import { AdsModule } from '@modules/ads/ads.module';
import { SeedModule } from '@common/seed/seed.module';
import { SendGridModule } from '@modules/send-grid/send-grid.module';
// import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from '@modules/user/user.module';
import { RedisModule } from '@common/redis/redis.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    RedisModule,
    AuthModule,
    PrismaModule,
    CarModule,
    AdsModule,
    SeedModule,
    SendGridModule,
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    JwtService,
  ],
})
export class AppModule {}
