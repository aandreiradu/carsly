import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCarBrandDTO } from './dto';
import { PrismaService } from '@common/prisma/prisma.service';
import { CreateCarModelDTO } from './dto/create-car-model.dto';
import { capitalizeAll } from '@common/utils/helpers';
import { VehicleBodyType } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '@common/redis/redis.service';

export interface GetCarsBrands {
  name: string;
  description: string;
  yearOfEst: Date;
  logoUrl: string;
}

type CachedModelsByBrand = Record<string, string[]>;

@Injectable()
export class CarService {
  cachedCarsBrands: GetCarsBrands[] | null = null;
  cachedModelsByBrand: CachedModelsByBrand | null = null;

  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}

  async createCarBrand(dto: CreateCarBrandDTO) {
    const carBrand = await this.prisma.carBrand.create({
      data: {
        ...dto,
        name: dto.name.toLowerCase(),
      },
    });

    return carBrand;
  }

  async getCarsBrands(): Promise<GetCarsBrands[]> {
    if (this.cachedCarsBrands && this.cachedCarsBrands.length > 0) {
      return this.cachedCarsBrands;
    }

    let carsBrands = [];

    if (this.configService.get<boolean>('USE_REDIS')) {
      await this.redisService.get<GetCarsBrands[]>('brands');
    }

    if (!carsBrands?.length) {
      carsBrands = await this.prisma.carBrand.findMany({
        select: {
          name: true,
          description: true,
          yearOfEst: true,
          logoUrl: true,
        },
        orderBy: {
          name: 'asc',
        },
      });

      this.cachedCarsBrands = carsBrands.map((d) => ({
        ...d,
        name: capitalizeAll(d.name),
      }));
      if (this.configService.get<boolean>('USE_REDIS')) {
        await this.redisService.set('brands', this.cachedCarsBrands);
      }

      return this.cachedCarsBrands;
    }

    this.cachedCarsBrands = carsBrands;
    return carsBrands.map((d) => ({
      ...d,
      name: capitalizeAll(d.name),
    }));
  }

  async getBrandIdByName(name: string): Promise<string> {
    const brandId = await this.prisma.carBrand.findFirst({
      where: {
        name: name?.toLowerCase(),
      },
      select: {
        id: true,
      },
    });

    if (!brandId) {
      throw new BadRequestException('Could not identify the brand');
    }

    return brandId.id;
  }

  async existingBrandModel(
    brandId: string,
    model: string,
    bodyType: VehicleBodyType,
  ): Promise<string | null> {
    const existingModelQuery = await this.prisma.carModel.findFirst({
      where: {
        brandId: brandId,
        name: model,
        bodyType: bodyType,
      },
      select: {
        id: true,
      },
    });

    if (!existingModelQuery || !Object.keys(existingModelQuery)) {
      console.log('Model not found', {
        brandId,
        model,
        bodyType,
      });
      throw new BadRequestException('Model not found');
    }

    return existingModelQuery?.id ?? null;
  }

  async createModelByBrand(dto: CreateCarModelDTO) {
    const brandId = await this.getBrandIdByName(dto.brand);

    const existingModel = await this.existingBrandModel(
      brandId,
      dto.name,
      dto.bodyType,
    );

    if (existingModel) {
      throw new BadRequestException(
        `This brand ${dto.brand}, model ${dto.name} with body-type ${dto.bodyType} already exists.`,
      );
    }

    await this.prisma.carModel.create({
      data: {
        name: dto.name,
        brandId: brandId,
        bodyType: dto.bodyType,
      },
    });
  }

  async getModelsByBrands(
    brandName: string,
  ): Promise<{ brand: string; models: string[] }> {
    if (
      !this.cachedModelsByBrand ||
      !this.cachedModelsByBrand[brandName] ||
      this.cachedModelsByBrand[brandName]?.length === 0
    ) {
      const models = await this.prisma.carModel.findMany({
        where: {
          brand: {
            name: {
              contains: brandName,
            },
          },
        },
        select: {
          name: true,
        },
        orderBy: {
          name: 'asc',
        },
      });

      const modelsMap = models.map((mod) => mod.name.toUpperCase());
      if (models.length > 0) {
        this.cachedModelsByBrand = {
          ...this.cachedModelsByBrand,
          [brandName]: modelsMap,
        };

        if (this.configService.get<boolean>('USE_REDIS')) {
          await this.redisService.set('models', modelsMap);
        }
      }

      return {
        brand: brandName,
        models: modelsMap,
      };
    } else {
      return {
        brand: brandName,
        models: this.cachedModelsByBrand[brandName],
      };
    }
  }
}
