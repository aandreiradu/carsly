import {
  Body,
  Controller,
  Post,
  Req,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/decorators';
import { diskStorage } from 'multer';
import { fileFilter, storage } from 'src/config/file-upload';
//import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { CreateAdDTO } from './dto/create-ad.dto';
import { ValidationFilter } from 'src/filters/validation.filter';
import { RequestMetadata } from 'src/auth/types/auth.types';

@Controller('/api/ad')
export class AdsController {
  constructor(private adsService: AdsService) {}

  @Public()
  @Post()
  @UseFilters(ValidationFilter)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'pic-1', maxCount: 1 },
        { name: 'pic-2', maxCount: 1 },
        { name: 'pic-3', maxCount: 1 },
        { name: 'pic-4', maxCount: 1 },
        { name: 'pic-5', maxCount: 1 },
      ],
      {
        storage: diskStorage(storage),
        fileFilter,
      },
    ),
  )
  // async createAd(files: Array<Express.Multer.File>, @Body() dto: CreateAdDTO) {
  async createAd(
    files: Array<Express.Multer.File>,
    @Req() req: RequestMetadata,
  ) {
    console.log('req.files', req.file, req.files);
    console.log('file', files);
    return 'success';
  }
}
