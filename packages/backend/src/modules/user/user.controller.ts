import { ExtendedRequest } from '@common/guards';
import { BadRequestException, Controller, Get, Req } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Throttle({ medium: { limit: 10, ttl: 1000 } })
  @Get('/ads')
  async listUserAds(@Req() req: ExtendedRequest) {
    if (!req?.user?.sub) {
      throw new BadRequestException('Missing userId');
    }
    return this.userService.listAds(req.user.sub);
  }
}
