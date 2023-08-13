import {
  BadRequestException,
  Injectable,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { CreateCarBrandDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarModelDTO } from './dto/create-car-model.dto';
import { capitalizeAll } from 'src/utils/helpers';
import { VehicleBodyType } from '@prisma/client';
import { Cache } from 'cache-manager';
import { ConfigService } from '@nestjs/config';

export interface GetCarsBrands {
  name: string;
  description: string;
  yearOfEst: Date;
  logoUrl: string;
}

type CachedModelsByBrand = Record<string, string[]>;

@Injectable()
export class CarService {
  carsBrands: GetCarsBrands[] = [];
  cachedModelsByBrand: CachedModelsByBrand = {};
  #expireDateCacheModelsByBrand =
    Date.now() +
    +(this.configService.get('CACHE_MODELS_BY_BRAND_SECONDS') || 3600) * 1000;

  constructor(
    private prisma: PrismaService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {}

  async createCarBrand(dto: CreateCarBrandDTO) {
    const carBrand = await this.prisma.carBrand.create({
      data: {
        ...dto,
      },
    });

    return carBrand;
  }

  async getCarsBrands(): Promise<GetCarsBrands[]> {
    let carsBrands = (await this.cacheManager.get(
      'carsBrands',
    )) as GetCarsBrands[];

    if (!carsBrands) {
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

      await this.cacheManager.set('carsBrands', carsBrands, {
        ttl: this.configService.get('configService') ?? 3600,
      });
    }

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

    if (!existingModelQuery) {
      console.log('Could not identify the model based on provided brand', {
        brandId,
        model,
        bodyType,
      });
      throw new BadRequestException(
        'Could not identify the model based on provided brand',
      );
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
    const now = Date.now();

    if (now > this.#expireDateCacheModelsByBrand) {
      this.cachedModelsByBrand = {};
    }

    if (
      !this.cachedModelsByBrand ||
      !this.cachedModelsByBrand[brandName] ||
      this.cachedModelsByBrand[brandName].length === 0
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
