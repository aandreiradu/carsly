import { DynamicModule, Module, OnModuleInit } from '@nestjs/common';
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
import { UserModule } from '@modules/user/user.module';
import { RedisModule } from '@common/redis/redis.module';
import { exec } from 'node:child_process';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, cache: true }),
    loadModulesDynamically(),
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
export class AppModule implements OnModuleInit {
  onModuleInit() {
    startRedis();
  }
}

function loadModulesDynamically(): DynamicModule {
  const useRedis = process.env.USE_REDIS;

  if (useRedis) {
    return {
      module: RedisModule,
    };
  }
}

function startRedis() {
  exec('brew services start redis', (error, stdout) => {
    if (error) {
      console.error('Error starting Redis:', error);
      return;
    }

    console.log('Redis started successfully:', stdout);
  });
}
