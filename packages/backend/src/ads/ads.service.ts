import { BadRequestException, Injectable } from '@nestjs/common';
import { CarService } from 'src/car/car.service';
import { AdRepository } from './ads.repository';
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
import { AddFavoriteDTO } from './dto/favorite-ad.dto';
import { type GetOfferOfTheDay } from './types';
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
  offerOfTheDayCache = {};
  #offerOfTheDaycacheTTL =
    Date.now() +
    (this.configService.get('CACHE_OFFER_OF_THE_DAY_SECONDS') || 3600) * 1000;
  #latestAdsCacheTTL =
    Date.now() + (this.configService.get('CACHE_LATEST_ADS') || 120) * 1000;
  cacheLatestAds = [];

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
      if (!userId) {
        throw new BadRequestException('Missing userId');
      }
      return this.adRepository.getAdsByUserId(userId);
    } catch (error) {
      throw error;
    }
  }

  async getFavoriteAdsByUserId(userId: string) {
    if (!userId) {
      throw new BadRequestException('Could not extract userId');
    }

    return this.adRepository.getFavoriteAdsByUserId(userId);
  }

  async getOfferOfTheDay(): Promise<GetOfferOfTheDay> {
    const now = Date.now();

    /* *Reset the cache after TTL expires */
    if (now > this.#offerOfTheDaycacheTTL) {
      this.#offerOfTheDaycacheTTL =
        now +
        +(this.configService.get('CACHE_OFFER_OF_THE_DAY_SECONDS') || 3600) *
          1000;
      this.offerOfTheDayCache = {};
    }

    if (Object.keys(this.offerOfTheDayCache).length === 0) {
      const offerOfTheDay = await this.adRepository.getOfferOfTheDay();
      if (offerOfTheDay) {
        this.offerOfTheDayCache = offerOfTheDay;
      }

      return offerOfTheDay;
    } else {
      return this.offerOfTheDayCache as GetOfferOfTheDay;
    }
  }

  async addOrRemoveFavorites(dto: AddFavoriteDTO) {
    const isValidAd = await this.adRepository.getAdById(dto.adId);
    if (!isValidAd) {
      throw new BadRequestException('Ad not found');
    }

    const existingFavoriteAd = await this.adRepository.getFavoriteByAdId(
      dto.adId,
      dto.userId,
    );

    if (existingFavoriteAd) {
      await this.adRepository.removeAdFromFavorites(existingFavoriteAd.id);
      const updatedFavoriteAds = await this.adRepository.getFavoriteAdsByUserId(
        dto.userId,
      );
      return updatedFavoriteAds;
    } else {
      await this.adRepository.addAdToFavorites(dto);
      const updatedFavoriteAds = await this.adRepository.getFavoriteAdsByUserId(
        dto.userId,
      );

      return updatedFavoriteAds;
    }
  }

  async getLatestAds() {
    const now = Date.now();

    /* *Reset the cache after TTL expires */
    if (now > this.#latestAdsCacheTTL) {
      this.#latestAdsCacheTTL =
        now + +(this.configService.get('CACHE_LATEST_ADS') || 120) * 1000;
      this.cacheLatestAds = [];
    }

    if (!this.cacheLatestAds.length) {
      const latestAds = await this.adRepository.getLatestAds();
      if (latestAds.length > 0) {
        this.cacheLatestAds = latestAds;
      }

      return latestAds;
    } else {
      return this.cacheLatestAds;
    }
  }

  async getAdDetailsById(adId: string) {
    return this.adRepository.getAdDetailsById(adId);
  }
}
