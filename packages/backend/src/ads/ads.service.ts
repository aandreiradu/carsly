import { Injectable } from '@nestjs/common';
import { CarService } from 'src/car/car.service';
import { AdRepository, GetOfferOfTheDay } from './ads.repository';
import {
  Ad,
  AdStatus,
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
import { ConfigService } from '@nestjs/config';
export interface CreateAd extends CreateAdDTO {
  userId: string;
  filePaths?: string[];
  brandId: string;
  modelId: string;
  status: AdStatus;
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
  offerOfTheDayCache = [];
  #offerOfTheDaycacheTTL =
    Date.now() +
    (this.configService.get('CACHE_OFFER_OF_THE_DAY_SECONDS') || 3600);

  constructor(
    private adRepository: AdRepository,
    private carService: CarService,
    private configService: ConfigService,
  ) {}

  async createAd(dto: CreateAdDTOO): Promise<Ad & { images: string[] }> {
    try {
      const brandId = await this.carService.getBrandIdByName(dto.brand);
      const modelId = await this.carService.existingBrandModel(
        brandId,
        dto.model.toLowerCase(),
        dto.bodyType,
      );
      const ad = await this.adRepository.createAd({
        ...dto,
        brandId,
        modelId,
        userId: dto.userId,
      });

      if (dto.filePaths?.length) {
        await this.adRepository.saveAdImages(dto.filePaths, ad.id);
      }

      return {
        ...ad,
        images: dto.filePaths,
      };
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

  async getOfferOfTheDay(): Promise<GetOfferOfTheDay[]> {
    const now = Date.now();

    /* *Reset the cache after TTL expires */
    if (now > this.#offerOfTheDaycacheTTL) {
      this.#offerOfTheDaycacheTTL = {};
    }

    if (!this.offerOfTheDayCache || this.offerOfTheDayCache.length === 0) {
      console.log('its not cached branch');

      const offerOfTheDay = await this.adRepository.getOfferOfTheDay();
      this.offerOfTheDayCache = offerOfTheDay;
      console.log('cached with', offerOfTheDay);
      return offerOfTheDay;
    } else {
      console.log('its cached branch => return', this.offerOfTheDayCache);
      return this.offerOfTheDayCache;
    }
  }
}
