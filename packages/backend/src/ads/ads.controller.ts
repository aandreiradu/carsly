import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, storage } from 'src/config/file-upload';
import { ValidationFilter } from 'src/filters/validation.filter';
import { createAdMapFormData } from 'src/utils/mapFormData';
import { CreateAdDTO } from './dto/create-ad.dto';
import { AddFavoriteDTO } from './dto/favorite-ad.dto';
import { ExtendedRequest, InjectUserId } from 'src/guards';

@Controller('api/ad')
export class AdsController {
  constructor(private adsService: AdsService) {}

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

  @Get()
  async getAdsByUserId(@Req() req) {
    return this.adsService.getAdsByUserId(req?.user?.sub);
  }

  @Get('offerOfTheDay')
  async getOfferOfTheDay() {
    return this.adsService.getOfferOfTheDay();
  }

  @UseGuards(InjectUserId)
  @Get('favorites')
  @HttpCode(HttpStatus.OK)
  async getFavoritesByUserId(@Req() req: ExtendedRequest) {
    return this.adsService.getFavoriteAdsByUserId(req['user']?.sub);
  }

  @UseGuards(InjectUserId)
  @Post('favorites')
  @HttpCode(HttpStatus.OK)
  async favoritesHandler(@Req() req: Request, @Body() dto: AddFavoriteDTO) {
    return this.adsService.addOrRemoveFavorites({
      ...dto,
      userId: req['user']?.sub,
    });
  }
}
