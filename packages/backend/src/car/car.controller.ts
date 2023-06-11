import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CarService } from './car.service';
import { CreateCarBrandDTO, CreateCarDTO } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { SuccessResponse } from 'config/types';

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
        console.log('sunt aici arunc');
        throw new BadRequestException(error.message);
        console.log('sunt aici nu mai arunc');
      }

      throw new InternalServerErrorException('Internal server error');
    }
  }

  @Post('/create')
  createCar(@Body() dto: CreateCarDTO) {
    return 'ok';
  }
}
