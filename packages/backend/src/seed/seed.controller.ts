import {
  BadRequestException,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { SeedService } from './seed.service';
import { Public } from 'src/decorators';
import * as path from 'path';
import { VehicleBodyType } from '@prisma/client';
import { readFileUtf8 } from 'src/utils/readFile';

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

  @Public()
  @Post('brands')
  async seedBrandsBulk() {
    try {
      const fileData = await readFileUtf8<SeedBrands[]>(
        path.join(__dirname, '../../brands-seed.json'),
      );
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

        console.log('insertedModels', insertedModels);

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

  @Public()
  @Post('models')
  async seedModelsBulk() {
    try {
      const parsedData = await readFileUtf8<SeedModels[]>(
        path.join(__dirname, '../../models-seed.json'),
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
