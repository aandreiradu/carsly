import { Module } from '@nestjs/common';
import { SendGridService } from './send-grid.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [SendGridService, ConfigService],
})
export class SendGridModule {}
