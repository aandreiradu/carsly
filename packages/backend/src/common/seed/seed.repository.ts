import { Injectable } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from '@common/prisma/prisma.service';
import { SeedBrands } from './seed.controller';
import { CarModel } from '@prisma/client';

@Injectable()
export class SeedRepository {
  constructor(private prismaService: PrismaService) {}

  async seedBrandsBulk(brands: SeedBrands[]): Promise<void> {
    for (let i = 0; i < brands.length; i++) {
      try {
        await this.prismaService.carBrand.create({
          data: {
            ...brands[i],
          },
        });
      } catch (error) {
        if (error.constructor.name === PrismaClientKnownRequestError.name) {
          console.log(`Found duplicate brand ${brands[i].name}, skipping...`);
        } else {
          throw error;
        }
      }
    }
  }

  async seedModelsBulk(models: CarModel[]) {
    for (let i = 0; i < models.length; i++) {
      await this.prismaService.carModel.create({
        data: {
          ...models[i],
        },
      });
    }
  }
}
