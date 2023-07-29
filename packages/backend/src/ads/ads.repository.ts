import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAd } from './ads.service';
import { Ad } from '@prisma/client';

@Injectable()
export class AdRepository {
  constructor(private prismaService: PrismaService) {}

  async createAd(dto: CreateAd): Promise<Ad> {
    const ad = this.prismaService.ad.create({
      data: {
        ...dto,
        carBrandId: dto.brandId,
        carModelId: dto.modelId,
        fuelType: dto.fuel,
        title: dto.adTitle,
      },
    });
    return ad;
  }

  async saveAdImages(filesPaths: string[], adId: string): Promise<void> {
    console.log('insert the following paths', filesPaths);
    filesPaths.forEach(async (filePath) => {
      await this.prismaService.adImage.create({
        data: {
          path: filePath,
          adId,
        },
      });
    });
  }

  async getAdImages() {
    return this.prismaService.adImage.findMany();
  }
}
