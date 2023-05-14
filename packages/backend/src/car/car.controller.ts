import {
  Body,
  Controller,
  ForbiddenException,
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

  @Post('/brand')
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
        status: 200,
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

  @Post('/create')
  createCar(@Body() dto: CreateCarDTO) {
    return 'ok';
  }
}
