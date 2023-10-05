import {
  BadRequestException,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { SeedService } from '@common/seed/seed.service';
import { Roles } from '@common/decorators';
import * as path from 'path';
import { VehicleBodyType } from '@prisma/client';
import { readFileUtf8 } from '@common/utils/readFile';
import brandsSeed from '@common/seed/brands-seed.json';
import modelsSeed from '@common/seed/models-seed.json';

export interface SeedBrands {
  name: string;
  description: string;
}

export interface SeedModels {
  model: string;
  brand: string;
  bodyType: VehicleBodyType;
}

@Controller('/api/seed')
export class SeedController {
  cachedModels = {};
  constructor(private seedService: SeedService) {}

  @Post('brands')
  @Roles(['admin'])
  async seedBrandsBulk() {
    try {
      const fileData = await readFileUtf8<SeedBrands[]>(
        path.join(__dirname, './brands-seed.json'),
      );
      console.log('fileData', fileData);
      const insertedModels = {};
      if (fileData?.length) {
        for (let i = 0; i < fileData.length; i++) {
          const brandName = fileData[i].name.toLocaleLowerCase();
          if (!insertedModels[brandName]) {
            insertedModels[brandName] = {
              name: brandName,
              description: fileData[i].description,
            };
          }
        }

        const brandToInsert = [];
        for (const idx in insertedModels) {
          brandToInsert.push({
            name: insertedModels[idx].name,
            description: insertedModels[idx].description,
          });
        }

        await this.seedService.seedBrandsBulk(brandToInsert);

        return { message: 'seed succeedeed' };
      }

      return { message: 'seed failed' };
    } catch (error) {
      console.log(error);
      if (error.code === 'ENOENT') {
        throw new BadRequestException('File path does not exists');
      }

      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }

      throw new InternalServerErrorException('Unable to seed brands');
    }
  }

  @Post('models')
  @Roles(['admin'])
  async seedModelsBulk() {
    try {
      const parsedData = await readFileUtf8<SeedModels[]>(
        path.join(__dirname, './models-seed.json'),
      );

      if (parsedData?.length) {
        await this.seedService.seedModelsBulk(parsedData);

        return { message: 'seed succeedeed' };
      }

      return { message: 'seed failed' };
    } catch (error) {
      console.log(error);
      if (error.code === 'ENOENT') {
        throw new BadRequestException('File path does not exists');
      }

      if (error instanceof Error) {
        throw new InternalServerErrorException(error.message);
      }

      throw new InternalServerErrorException('Unable to seed models');
    }
  }
}
