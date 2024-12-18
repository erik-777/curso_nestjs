import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException, Get, Param, Res } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  fileFilter, fileNamer
} from './helpers';
import { diskStorage } from 'multer';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { envs } from 'src/config';



@Controller('files')
export class FilesController {
  constructor(
    private readonly filesService: FilesService,
    private readonly configService: ConfigService
  ) { }

  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 },
    storage: diskStorage({
      destination: './static/products', filename: fileNamer
    })
  }))
  upload(@UploadedFile() file: Express.Multer.File) {

    if (!file) {
      throw new BadRequestException('Invalid file format');
    }

    const secureUrl = `${envs.server.api}files/product/${file.filename}`

    console.log(file);

    return {
      secureUrl
    };

  }

  @Get('product/:imageName')
  findProductImage(
    @Res() res: Response,
    @Param('imageName') imageName: string) {

    const path = this.filesService.getStaticProductImage(imageName);

    res.status(200).sendFile(path);

  }

}
