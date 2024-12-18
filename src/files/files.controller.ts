import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  fileFilter, fileNamer
} from './helpers';
import { diskStorage } from 'multer';


@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

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
    console.log(file);
    return {
      name: file.filename,
      size: file.size.toPrecision(2)
    };

  }
}
