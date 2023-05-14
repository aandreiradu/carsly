import { Injectable } from '@nestjs/common';
import { CreateCarBrandDTO, CreateCarDTO } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async createCar(dto: CreateCarDTO) {}
}
