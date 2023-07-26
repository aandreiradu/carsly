import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdDTO } from './dto/create-ad.dto';
import { CarService } from 'src/car/car.service';
import { v4 as uuidv4 } from 'uuid';
interface CreateAd extends CreateAdDTO {
  userId: string;
  filePaths?: string[];
}

@Injectable()
export class AdsService {
  constructor(private prisma: PrismaService, private carService: CarService) {}

  async createAd(dto: CreateAd) {
    const brandId = await this.carService.getBrandIdByName(dto.brand);
    const modelId = await this.carService.existingBrandModel(
      brandId,
      dto.model,
      dto.bodyType,
    );

    const adId = uuidv4();

    await this.saveAdImages(dto.filePaths, adId);
    console.log('adId', adId);

    await this.prisma.ad.create({
      data: {
        ...dto,
        id: adId,
        carBrandId: brandId,
        carModelId: modelId,
        fuelType: dto.fuel,
        title: dto.adTitle,
      },
    });

    return { brandId, modelId, adId };
  }

  async saveAdImages(filesPaths: string[], adId: string): Promise<void> {
    filesPaths.forEach((filePath) => {
      this.prisma.adImage.create({
        data: {
          path: filePath,
          adId,
        },
      });
    });
  }
}
