import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCarBrandDTO, CreateCarDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCarModelDTO } from './dto/create-car-model.dto';
import { capitalizeAll } from 'src/utils/helpers';
import { VehicleBodyType } from '@prisma/client';

@Injectable()
export class CarService {
  constructor(private prisma: PrismaService) {}

  async createCarBrand(dto: CreateCarBrandDTO) {
    const carBrand = await this.prisma.carBrand.create({
      data: {
        ...dto,
      },
    });

    return carBrand;
  }

  async getCarsBrands() {
    const queryData = await this.prisma.carBrand.findMany({
      select: {
        name: true,
        description: true,
        yearOfEst: true,
        logoUrl: true,
      },
    });

    return queryData.map((d) => ({
      ...d,
      name: capitalizeAll(d.name),
    }));
  }

  async getBrandByName(name: string): Promise<string> {
    const brandId = await this.prisma.carBrand.findFirst({
      where: {
        name: name.toLowerCase(),
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
  ) {
    /* 
      Based on the brandId & model & bodyType, this will check if an existing model is already inserted
    */
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

    return existingModelQuery?.id ?? null;
  }

  async createModelByBrand(dto: CreateCarModelDTO) {
    const brandId = await this.getBrandByName(dto.brand);

    const existingModel = await this.existingBrandModel(
      brandId,
      dto.name,
      dto.bodyType,
    );
    console.log('existingModel', existingModel);

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

    return {
      brand: brandName,
      models: modelsMap,
    };
  }
}
