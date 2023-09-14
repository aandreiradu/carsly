import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@common/prisma/prisma.service';
import { CreateAdDTOO } from './ads.service';
import { Ad, AdFavorite, AdStatus } from '@prisma/client';
import { AddFavoriteDTO } from './dto/favorite-ad.dto';
import { GetOfferOfTheDay, type TAdDetailsById, LatestAd } from './types';
import {
  polluationNormTypesLabels,
  transmissionTypesLabels,
  vehicleBodyTypesLabels,
} from '@common/utils/mappings';
import { capitalizeFirstLetter } from '@common/utils/text';
import { SearchQueryModelMap } from '@common/utils/ad.utils';

@Injectable()
export class AdRepository {
  constructor(private prismaService: PrismaService) {}

  async createAd(dto: CreateAdDTOO): Promise<Ad> {
    return this.prismaService.ad.create({
      data: {
        isDamaged: dto.isDamaged,
        isRightHandDrive: dto.isRightHandDrive,
        isImported: dto.isImported,
        VIN: dto.VIN,
        KM: dto.KM,
        dayOfRegistration: dto.dayOfRegistration,
        monthOfRegistration: dto.monthOfRegistration,
        yearOfRegistration: dto.yearOfRegistration,
        year: dto.year,
        fuelType: dto.fuelType,
        power: dto.power,
        engineSize: dto.engineSize,
        noOfDoors: dto.noOfDoors,
        gearbox: dto.gearbox,
        transmission: dto.transmission,
        polluationNorm: dto.polluationNorm,
        co2emissions: dto.co2emissions || 0,
        bodyType: dto.bodyType,
        color: dto.color,
        colorType: dto.colorType,
        seats: dto.seats,
        youtubeVideo: dto.youtubeVideo,
        title: dto.title,
        description: dto.description,
        vehicleOrigin: dto.vehicleOrigin,
        isFirstOwner: dto.isFirstOwner,
        isWithoutAccident: dto.isWithoutAccident,
        isRegistered: dto.isRegistered,
        isServiceCardAvailable: dto.isServiceCardAvailable,
        isVintageCar: dto.isVintageCar,
        hasTuning: dto.hasTuning,
        price: dto.price,
        currency: dto.currency,
        isNegotiable: dto.isNegotiable,
        isLeasing: dto.isLeasing,
        sellerFullName: dto.sellerFullName,
        sellerCity: dto.sellerCity,
        sellerPhoneNumber: dto.sellerPhoneNumber,
        userId: dto.userId,
        carBrandId: dto.brandId,
        carModelId: dto.modelId,
        status: AdStatus.PENDING,
      },
    });
  }

  async getAdById(adId: string): Promise<Ad> {
    return this.prismaService.ad.findFirst({
      where: {
        id: adId,
      },
    });
  }

  async getFavoriteByAdId(
    adId: string,
    userId: string,
  ): Promise<AdFavorite | null> {
    const favoriteAdd = await this.prismaService.adFavorite.findFirst({
      where: {
        adId,
        userId,
      },
    });

    if (!favoriteAdd) return null;

    return favoriteAdd;
  }

  async removeAdFromFavorites(adFavoriteId: string): Promise<void> {
    await this.prismaService.adFavorite.delete({
      where: {
        id: adFavoriteId,
      },
    });
  }

  async addAdToFavorites(dto: AddFavoriteDTO): Promise<void> {
    await this.prismaService.adFavorite.create({
      data: {
        ...dto,
      },
    });
  }

  async getAdsByUserId(userId: string): Promise<Ad[]> {
    return this.prismaService.ad.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async saveAdImages(filesPaths: string[], adId: string): Promise<void> {
    filesPaths.forEach(async (filePath) => {
      await this.prismaService.adImage.create({
        data: {
          path: filePath,
          adId,
        },
      });
    });
  }

  async getAdImages() {
    return this.prismaService.adImage.findMany();
  }

  async getOfferOfTheDay(): Promise<GetOfferOfTheDay | null> {
    const countAds = await this.prismaService.ad.count();
    const skip = Math.floor(Math.random() * countAds);

    const offerOfTheDay = await this.prismaService.ad.findMany({
      take: 1,
      skip,
      select: {
        id: true,
        images: true,
        title: true,
        fuelType: true,
        price: true,
        currency: true,
        year: true,
        KM: true,
        engineSize: true,
        description: true,
      },
    });

    if (!offerOfTheDay.length) return null;

    const offer = offerOfTheDay?.map((offer) => ({
      adId: offer.id,
      thumbnail: offer.images?.slice(0, 1)[0]?.path || '',
      title: offer.title,
      fuel: offer.fuelType,
      price: offer.price,
      currency: offer.currency,
      year: offer.year,
      km: offer.KM,
      engineSize: offer.engineSize,
      description: offer.description,
    }))[0];

    return offer;
  }

  async getFavoriteAdsByUserId(userId: string) {
    const count = await this.prismaService.adFavorite.count({
      where: {
        userId,
      },
    });
    const favoritesQuery = await this.prismaService.adFavorite.findMany({
      where: {
        userId,
      },
      select: {
        ad: {
          select: {
            id: true,
            images: {
              select: {
                path: true,
              },
            },
            title: true,
            fuelType: true,
            price: true,
            currency: true,
            year: true,
            KM: true,
            engineSize: true,
            description: true,
            sellerCity: true,
          },
        },
      },
    });

    const favorites = favoritesQuery.map((favItem) => ({
      adId: favItem.ad.id,
      name: favItem.ad.title,
      price: favItem.ad.price,
      currency: favItem.ad.currency,
      thumbnail: favItem.ad.images?.slice(0, 1)[0]?.path ?? null,
      location: favItem.ad.sellerCity,
    }));

    return {
      count,
      favorites,
    };
  }

  async getLatestAds(): Promise<LatestAd[]> {
    const latestAdsQuery = await this.prismaService.ad.findMany({
      take: 15,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        images: {
          select: {
            path: true,
          },
        },
        title: true,
        fuelType: true,
        price: true,
        currency: true,
        year: true,
        KM: true,
        engineSize: true,
        description: true,
        sellerCity: true,
      },
    });

    return latestAdsQuery.map((ad) => ({
      adId: ad.id,
      name: ad.title,
      price: ad.price,
      currency: ad.currency,
      thumbnail: ad.images?.slice(0, 1)[0]?.path ?? '',
      location: ad.sellerCity,
    }));
  }

  async getAdDetailsById(adId: string): Promise<TAdDetailsById | string> {
    const adDetailsQuery = await this.prismaService.ad.findFirst({
      where: {
        id: adId,
      },
      include: {
        images: true,
        brand: {
          select: {
            name: true,
          },
        },
        model: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!adDetailsQuery)
      throw new NotFoundException('Could not found details for requested ad');

    const brandName = adDetailsQuery.brand.name.toUpperCase() || '';
    const modelName = adDetailsQuery.model.name.toUpperCase() || '';

    delete adDetailsQuery['brand'];
    delete adDetailsQuery['model'];

    const adDetails = {
      ...adDetailsQuery,
      brandName,
      modelName,
      transmission: capitalizeFirstLetter(
        transmissionTypesLabels[adDetailsQuery.transmission] || '',
      ),
      polluationNorm: capitalizeFirstLetter(
        polluationNormTypesLabels[adDetailsQuery.polluationNorm] || '',
      ),
      bodyType: capitalizeFirstLetter(
        vehicleBodyTypesLabels[adDetailsQuery.bodyType] || '',
      ),
    } as TAdDetailsById;

    return adDetails;
  }

  async searchAd(query: SearchQueryModelMap) {
    const searchQuery = await this.prismaService.ad.findMany({
      where: {
        ...query,
      },
      select: {
        id: true,
        title: true,
        KM: true,
        year: true,
        fuelType: true,
        bodyType: true,
        images: true,
        price: true,
        currency: true,
        vehicleOrigin: true,
        sellerCity: true,
        sellerFullName: true,
        sellerPhoneNumber: true,
        color: true,
        colorType: true,
        noOfDoors: true,
        engineSize: true,
        power: true,
        description: true,
      },
    });

    return searchQuery.map((data) => ({
      ...data,
      thumbnail: data.images.slice(0, 1)[0]?.path || '',
    }));
  }
}
