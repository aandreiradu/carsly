import { PrismaService } from '@common/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserAds } from './types';

@Injectable()
export class UserRepository {
  constructor(private prismaService: PrismaService) {}

  async listAds(userId: string): Promise<UserAds[]> {
    return this.prismaService.ad.findMany({
      select: {
        title: true,
        thumbnail: true,
        price: true,
        currency: true,
        year: true,
        fuelType: true,
        KM: true,
        power: true,
        gearbox: true,
      },
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
