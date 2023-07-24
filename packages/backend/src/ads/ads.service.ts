import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdDTO } from './dto/create-ad.dto';
import { CarService } from 'src/car/car.service';
import { VehicleBodyType } from '@prisma/client';

@Injectable()
export class AdsService {
  constructor(private prisma: PrismaService, private carService: CarService) {}

  async createAd(dto: CreateAdDTO) {
    const brandId = await this.carService.getBrandIdByName(dto.brand);
    const modelId = await this.carService.existingBrandModel(
      brandId,
      dto.model,
      dto.bodyType,
    );

    console.log({ brandId, modelId });

    return { modelId, brandId };
    // return this.prisma.ad.create({
    //   data: {
    //     ...dto,
    //   },
    // });
  }
}
