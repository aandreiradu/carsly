import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { CryptoService } from 'src/utils/crypto';
// import { AtStrategy, RtStrategy } from './strategies';
import { AtStrategy } from './strategies';

@Module({
  imports: [JwtModule.register({})],
  providers: [AuthService, CryptoService, AtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
