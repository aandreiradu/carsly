import { CacheModule, Module } from '@nestjs/common';
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
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
@Module({
  imports: [
    CacheModule.register({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    AuthModule,
    PrismaModule,
    CarModule,
    AdsModule,
    SeedModule,
    SendGridModule,
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
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    JwtService,
  ],
})
export class AppModule {}
