import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from './helpers/file.filter';


@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) { }

  @Post('product')
  @UseInterceptors(FileInterceptor('file', {
    fileFilter: fileFilter
  }))
  upload(@UploadedFile() file: Express.Multer.File) {

    if (!file) {
      throw new BadRequestException('Invalid file format');
    }
    //console.log(file);
    return {
      name: file.originalname,
      size: file.size.toPrecision(2)
    };

  }
}
