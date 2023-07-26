import {
  Body,
  Controller,
  ForbiddenException,
  Post,
  Req,
  UploadedFiles,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, storage } from 'src/config/file-upload';
import { CreateAdDTO } from './dto/create-ad.dto';
import { ValidationFilter } from 'src/filters/validation.filter';
import { Public } from 'src/decorators';

@Controller('/api/ad')
export class AdsController {
  constructor(private adsService: AdsService) {}

  @Public()
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

    return this.adsService.createAd({
      ...dto,
      userId: req?.user?.sub,
      filePaths,
    });
  }
}
