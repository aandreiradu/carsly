import { Module } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { AuthController } from '@modules/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { CryptoService } from '@common/utils/crypto';
import { AtStrategy, RtStrategy } from '@modules/auth/strategies';
import { SendGridService } from '@modules/send-grid/send-grid.service';
import { RedisService } from '@common/redis/redis.service';

@Module({
  imports: [JwtModule.register({})],
  providers: [
    AuthService,
    CryptoService,
    AtStrategy,
    RtStrategy,
    SendGridService,
    RedisService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
