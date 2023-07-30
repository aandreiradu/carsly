import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CarService } from 'src/car/car.service';
import { AdRepository } from './ads.repository';
import {
  Ad,
  CarsColors,
  ColorTypes,
  CountriesTypes,
  CurrencyTypes,
  FuelType,
  GearboxTypes,
  PolluationNormTypes,
  TransmissionTypes,
  VehicleBodyType,
} from '@prisma/client';
import { CreateAdDTO } from './dto/create-ad.dto';
export interface CreateAd extends CreateAdDTO {
  userId: string;
  filePaths?: string[];
  brandId: string;
  modelId: string;
}

export interface CreateAdDTOO {
  isDamaged?: boolean;
  isRightHandDrive?: boolean;
  isImported?: boolean;
  VIN: string;
  KM: number;
  dayOfRegistration: number;
  monthOfRegistration: number;
  yearOfRegistration: number;
  year: number;
  fuelType: FuelType;
  power: number;
  engineSize: number;
  noOfDoors: number;
  gearbox: GearboxTypes;
  transmission: TransmissionTypes;
  polluationNorm: PolluationNormTypes;
  co2emissions?: number;
  bodyType: VehicleBodyType;
  color: CarsColors;
  colorType: ColorTypes;
  seats: number;
  youtubeVideo?: string;
  title: string;
  description?: string;
  vehicleOrigin: CountriesTypes;
  isFirstOwner?: boolean;
  isWithoutAccident?: boolean;
  isRegistered?: boolean;
  isServiceCardAvailable?: boolean;
  isVintageCar?: boolean;
  hasTuning?: boolean;
  price: number;
  currency: CurrencyTypes;
  isNegotiable?: boolean;
  isLeasing?: boolean;
  sellerFullName: string;
  sellerCity: string;
  sellerPhoneNumber: string;
  brand?: string;
  model?: string;
  userId?: string;
  filePaths?: string[];
  brandId?: string;
  modelId?: string;
}

@Injectable()
export class AdsService {
  constructor(
    private adRepository: AdRepository,
    private carService: CarService,
  ) {}

  async createAd(dto: CreateAdDTOO) {
    try {
      const brandId = await this.carService.getBrandIdByName(dto.brand);
      const modelId = await this.carService.existingBrandModel(
        brandId,
        dto.model.toLowerCase(),
        dto.bodyType,
      );
      const { id: adId } = await this.adRepository.createAd({
        ...dto,
        brandId,
        modelId,
        userId: dto.userId,
      });

      await this.adRepository.saveAdImages(dto.filePaths, adId);

      return { brandId, modelId, adId };
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  }

  async getAdsByUserId(userId: string): Promise<Ad[]> {
    try {
      return this.adRepository.getAdsByUserId(userId);
    } catch (error) {
      throw error;
    }
  }
}
