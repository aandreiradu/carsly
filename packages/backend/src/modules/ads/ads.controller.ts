import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdsService } from '@modules/ads/ads.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, storage } from '@common/config/file-upload';
import { ValidationFilter } from '@common/filters/validation.filter';
import { createAdMapFormData } from '@common/utils/mapFormData';
import { CreateAdDTO } from '@modules/ads/dto/create-ad.dto';
import { AddFavoriteDTO } from '@modules/ads/dto/favorite-ad.dto';
import { ExtendedRequest, InjectUserId } from '@common/guards';
import { AdDetailsDto, QueryAdDTO } from '@modules/ads/dto/ad.dto';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@Controller('api/ad')
export class AdsController {
  constructor(private adsService: AdsService) {}

  @Throttle({ medium: { limit: 10, ttl: 1000 } })
  @Post()
  @UseFilters(ValidationFilter)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image-1', maxCount: 1 },
        { name: 'image-2', maxCount: 1 },
        { name: 'image-3', maxCount: 1 },
        { name: 'image-4', maxCount: 1 },
        { name: 'image-5', maxCount: 1 },
      ],
      {
        fileFilter,
        storage: diskStorage(storage),
      },
    ),
  )
  async createAd(@Body() dto: CreateAdDTO, @Req() req) {
    const filePaths = [];
    for (const i in req?.files) {
      filePaths.push(req?.files[i][0]?.filename || '');
    }

    const mappedReqBody = createAdMapFormData(dto);

    return this.adsService.createAd({
      ...mappedReqBody,
      filePaths,
      userId: req?.user?.sub,
      bodyType: req.body?.bodyType?.toLowerCase(),
    });
  }

  @Throttle({ short: { limit: 3, ttl: 1000 } })
  @Get()
  async getAdsByUserId(@Req() req) {
    return this.adsService.getAdsByUserId(req?.user?.sub);
  }

  @Throttle({ medium: { limit: 10, ttl: 1000 } })
  @Get('/offerOfTheDay')
  async getOfferOfTheDay() {
    return this.adsService.getOfferOfTheDay();
  }

  @Throttle({ medium: { limit: 10, ttl: 1000 } })
  @UseGuards(InjectUserId)
  @Get('/favorites')
  @HttpCode(HttpStatus.OK)
  async getFavoritesByUserId(@Req() req: ExtendedRequest) {
    return this.adsService.getFavoriteAdsByUserId(req['user']?.sub ?? null);
  }

  @Throttle({ medium: { limit: 10, ttl: 1000 } })
  @UseGuards(InjectUserId)
  @Post('/favorites')
  @HttpCode(HttpStatus.OK)
  async favoritesHandler(@Req() req: Request, @Body() dto: AddFavoriteDTO) {
    return this.adsService.addOrRemoveFavorites({
      ...dto,
      userId: req['user']?.sub,
    });
  }

  @SkipThrottle({ default: true })
  @Get('/latest')
  async getLatestAds() {
    return this.adsService.getLatestAds();
  }

  @Throttle({ medium: { limit: 10, ttl: 1000 } })
  @Get('/search')
  async searchAdsController(@Query() query?: QueryAdDTO) {
    if (!query || Object.keys(query).length === 0) {
      throw new BadRequestException('Filters not provided');
    }

    const resultSearch = await this.adsService.searchAd(query);

    return {
      results: resultSearch,
      resultsCount: resultSearch.length,
    };
  }

  @Throttle({ medium: { limit: 10, ttl: 1000 } })
  @Get('/:adId')
  async getAdDetailsById(@Param() dto: AdDetailsDto) {
    return this.adsService.getAdDetailsById(dto.adId);
  }
}
