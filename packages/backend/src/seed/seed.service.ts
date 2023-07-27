import { Injectable } from '@nestjs/common';
import { SeedRepository } from './seed.repository';
import { SeedBrands, SeedModels } from './seed.controller';
import { CarService } from 'src/car/car.service';
import { VehicleBodyType } from '@prisma/client';

interface CarModelDTO {
  name?: string;
  brandId?: string;
  bodyType?: VehicleBodyType;
}

@Injectable()
export class SeedService {
  cachedBrandIds: Record<string, CarModelDTO> = {};
  constructor(
    private seedRepository: SeedRepository,
    private carService: CarService,
  ) {}

  async seedBrandsBulk(data: SeedBrands[]): Promise<void> {
    await this.seedRepository.seedBrandsBulk(data);
  }

  async seedModelsBulk(data: SeedModels[]) {
    const repositoryData = [];
    for (let i = 0; i < data.length; i++) {
      const { bodyType, brand, name } = data[i];

      if (!this.cachedBrandIds[brand]) {
        console.log(brand, 'its not cached,stuff to do');
        const brandId = await this.carService.getBrandIdByName(brand);
        this.cachedBrandIds[brand] = {
          [brand]: brandId,
        };

        repositoryData.push({
          brandId,
          bodyType,
          name,
        });
        console.log(brand, 'was cached');
      } else {
        const brandId = this.cachedBrandIds[brand];
        console.log(brand, 'its cached,just push with this brandId', brandId);
        repositoryData.push({
          brandId,
          bodyType,
          name,
        });
      }
    }
  }
}
