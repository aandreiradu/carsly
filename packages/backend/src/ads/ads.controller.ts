import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseFilters,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, storage } from 'src/config/file-upload';
import { ValidationFilter } from 'src/filters/validation.filter';
import { createAdMapFormData } from 'src/utils/mapFormData';
import { CreateAdDTO } from './dto/create-ad.dto';
import { CreateAdDTOMappingPipe } from 'src/pipes/create-ad-mapping.pipe';

@Controller('/api/ad')
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
}
