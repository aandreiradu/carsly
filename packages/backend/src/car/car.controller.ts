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
import { SuccessResponse } from 'config/types';
import { CreateCarModelDTO } from './dto/create-car-model.dto';
import { Public } from 'src/decorators';

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
      await this.carsService.createCarBrand(dto);
      return {
        status: 201,
        message: 'Car Brand created successfully',
      };
    } catch (error) {
      console.log('error', error);
      if (error.constructor.name === PrismaClientKnownRequestError.name) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Car brand already exists');
        }
      }

      throw new InternalServerErrorException(
        'Something went wrong, please try agin later',
      );
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
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Public()
  @Post('/carmodel')
  async createCar(@Body() dto: CreateCarModelDTO): Promise<SuccessResponse> {
    try {
      await this.carsService.createModelByBrand({
        ...dto,
        name: dto.name.trim().toLocaleLowerCase(),
      });

      return {
        status: 201,
        message: 'cardmodel added',
      };
    } catch (error) {
      console.error('__ERROR createCar controller', error);
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }

      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Public()
  @Get('/brandModels/:name')
  async getModelsByBrand(@Param() params: { name: string }) {
    console.log('name', params.name);

    if (!params.name) {
      throw new BadRequestException('Expected request params: name');
    }

    const models = await this.carsService.getModelsByBrands(
      params.name.toLowerCase(),
    );

    return {
      status: 200,
      brand: models,
    };
  }
}
