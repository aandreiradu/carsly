import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarBrandDTO } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { SuccessResponse } from 'src/config/types';
import { CreateCarModelDTO } from './dto/create-car-model.dto';

@Controller('/api/car')
export class CarController {
  constructor(private carsService: CarService) {}

  @Post('/brands')
  async createCarBrand(
    @Body() dto: CreateCarBrandDTO,
  ): Promise<SuccessResponse> {
    try {
      const yearOfEst = dto.yearOfEst;
      if (yearOfEst) {
        dto.yearOfEst = new Date(dto.yearOfEst).toISOString();
      }

      await this.carsService.getBrandByName(dto.name);

      await this.carsService.createCarBrand(dto);
      return {
        status: 201,
        message: 'Car Brand created successfully',
      };
    } catch (error) {
      console.log(')))error', error);
      if (error.constructor.name === PrismaClientKnownRequestError.name) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Car brand already exists');
        }
      }

      if (error instanceof Error) {
        const { message } = error;
        throw new BadRequestException(message);
      }

      throw new InternalServerErrorException('Unexpected error occured');
    }
  }

  @Get('/brands')
  async getCarsBrands() {
    try {
      const carsBrands = await this.carsService.getCarsBrands();
      return {
        carsBrands,
      };
    } catch (error) {
      console.error('__ERROR getCarsBrands controller', error);
      if (error instanceof Error) {
        return {
          message: error.message,
        };
      }

      throw new InternalServerErrorException();
    }
  }

  @Post('/carmodel')
  async createCarModel(
    @Body() dto: CreateCarModelDTO,
  ): Promise<SuccessResponse> {
    await this.carsService.createModelByBrand({
      ...dto,
      name: dto.name.trim().toLocaleLowerCase(),
    });

    return {
      status: 201,
      message: 'car model added',
    };
  }

  @Get('/carmodel/:name')
  async getModelsByBrand(@Param() params: { name: string }) {
    if (!params.name) {
      throw new BadRequestException('Expected request params: name');
    }

    const dataModels = await this.carsService.getModelsByBrands(
      params.name.toLowerCase(),
    );

    const { models } = dataModels;

    let mapFormat = {};
    mapFormat = {
      ...mapFormat,
      [params.name]: models,
    };

    return {
      status: 200,
      brandModels: mapFormat,
      brand: params.name,
    };
  }
}
