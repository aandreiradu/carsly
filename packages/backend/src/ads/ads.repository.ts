import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdDTOO } from './ads.service';
import { Ad, AdImage, AdStatus, CurrencyTypes, FuelType } from '@prisma/client';

export interface GetOfferOfTheDay {
  imageURL: AdImage[];
  title: string;
  fuel: FuelType;
  price: number;
  currency: CurrencyTypes;
  year: number;
  km: number;
  engineSize: number;
  description?: string;
}
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

  async getOfferOfTheDay(): Promise<GetOfferOfTheDay[]> {
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

    return offerOfTheDay.map((offer) => ({
      imageURL: offer.images?.slice(0, 1) || [],
      title: offer.title,
      fuel: offer.fuelType,
      price: offer.price,
      currency: offer.currency,
      year: offer.year,
      km: offer.KM,
      engineSize: offer.engineSize,
      description: offer.description,
    }));
  }
}
