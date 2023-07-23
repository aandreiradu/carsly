import {
  Body,
  Controller,
  Post,
  UploadedFiles,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import {
  FileFieldsInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import { Public } from 'src/decorators';
import { diskStorage } from 'multer';
import { fileFilter, storage } from 'src/config/file-upload';
//import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { CreateAdDTO } from './dto/create-ad.dto';
import { ValidationFilter } from 'src/filters/validation.filter';

@Controller('/api/ad')
export class AdsController {
  constructor(private adsService: AdsService) {}

  // @Public()
  // @Post()
  // @UseFilters(ValidationFilter)
  // @UseInterceptors(
  //   FilesInterceptor('files', 5, {
  //     storage: diskStorage(storage),
  //     fileFilter,
  //     limits: {
  //       fieldSize: 2500,
  //     },
  //   }),
  // )
  // async createAd(
  //   @UploadedFiles() files: Array<Express.Multer.File>,
  //   @Body() dto: CreateAdDTO,
  // ) {
  //   console.log('dto', dto);
  //   console.log('files', files);
  //   // console.log('headers', req.headers);

  //   return {
  //     message: 'success',
  //   };
  // }
  @Public()
  @Post()
  @UseFilters(ValidationFilter)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'imageOne', maxCount: 1 },
        { name: 'imageTwo', maxCount: 1 },
        { name: 'imageThree', maxCount: 1 },
        { name: 'imageFour', maxCount: 1 },
        { name: 'imageFive', maxCount: 1 },
      ],
      {
        fileFilter,
        storage: diskStorage(storage),
      },
    ),
  )
  async createAd(
    @UploadedFiles()
    files: {
      imageOne?: Express.Multer.File[];
      imageTwo?: Express.Multer.File[];
    },
    @Body() dto: CreateAdDTO,
  ) {
    console.log('dto', dto);
    console.log('files', files);
    // console.log('headers', req.headers);

    return {
      message: 'success',
    };
  }
}
