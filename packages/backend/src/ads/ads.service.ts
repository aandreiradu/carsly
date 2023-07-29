import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdDTO } from './dto/create-ad.dto';
import { CarService } from 'src/car/car.service';
import { AdRepository } from './ads.repository';
export interface CreateAd extends CreateAdDTO {
  userId: string;
  filePaths?: string[];
  brandId: string;
  modelId: string;
}

@Injectable()
export class AdsService {
  constructor(
    private adRepository: AdRepository,
    private carService: CarService,
  ) {}

  async createAd(dto: CreateAd) {
    try {
      console.log('dto in createAd', dto);
      const brandId = await this.carService.getBrandIdByName(dto.brand);
      const modelId = await this.carService.existingBrandModel(
        brandId,
        'rapide s',
        dto.bodyType,
      );

      console.log('modelId', modelId);

      // const { id: adId } = await this.adRepository.createAd(dto);

      // console.log('adId', adId);

      // await this.adRepository.saveAdImages(dto.filePaths, adId);

      // return { brandId, modelId, adId };
      return { brandId, modelId };
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }
}
