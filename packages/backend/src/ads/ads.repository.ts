import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateAdDTOO } from './ads.service';
import {
  Ad,
  CountriesTypes,
  PolluationNormTypes,
  TransmissionTypes,
} from '@prisma/client';

@Injectable()
export class AdRepository {
  constructor(private prismaService: PrismaService) {}

  async createAd(dto: CreateAdDTOO): Promise<Ad> {
    return this.prismaService.ad.create({
      data: {
        // ...dto
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
        transmission: TransmissionTypes.fourByFourAutomatic,
        polluationNorm: PolluationNormTypes.Euro_6,
        co2emissions: dto.co2emissions || 0,
        bodyType: dto.bodyType,
        color: dto.color,
        colorType: dto.colorType,
        seats: dto.seats,
        youtubeVideo: dto.youtubeVideo,
        title: dto.title,
        description: dto.description,
        vehicleOrigin: CountriesTypes.ROMANIA,
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
}
