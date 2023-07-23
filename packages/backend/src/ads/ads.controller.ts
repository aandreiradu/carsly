import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, storage } from 'src/config/file-upload';
//import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { CreateAdDTO } from './dto/create-ad.dto';
import { ValidationFilter } from 'src/filters/validation.filter';

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
  async createAd(
    @UploadedFiles()
    files,
    @Body() dto: CreateAdDTO,
  ) {
    console.log('dto', dto);
    console.log('files', files);
    return {
      message: 'success',
    };
  }
}
