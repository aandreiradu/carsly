import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AtGuard } from './guards';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, PrismaModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    JwtService,
  ],
})
export class AppModule {}
