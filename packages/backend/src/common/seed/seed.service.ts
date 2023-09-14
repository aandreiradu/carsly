import { Injectable } from '@nestjs/common';
import { SeedRepository } from './seed.repository';
import { SeedBrands, SeedModels } from './seed.controller';
import { CarService } from '@modules/car/car.service';

@Injectable()
export class SeedService {
  cachedBrandIds: Record<string, string> = {};
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
      const { bodyType, brand, model } = data[i];

      if (!this.cachedBrandIds[brand]) {
        const brandId = await this.carService.getBrandIdByName(brand);
        this.cachedBrandIds[brand] = brandId;

        repositoryData.push({
          brandId,
          bodyType,
          name: model,
        });
      } else {
        const brandId = this.cachedBrandIds[brand];
        repositoryData.push({
          brandId,
          bodyType,
          name: model,
        });
      }
    }

    return this.seedRepository.seedModelsBulk(repositoryData);
  }
}
