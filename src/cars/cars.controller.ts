import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dto/index';

@Controller('cars')
export class CarsController {
  constructor(private readonly carsService: CarsService) { }
  @Get()
  getAllCars() {
    return this.carsService.findAll();
  }

  @Get(':uuid')
  getCarById(@Param('uuid', ParseIntPipe) uuid: string) {

    /**Exception not controlled */
    // throw new Error('Method not implemented.');
    return this.carsService.getCarById(uuid);
  }
  @Post()
  createCar(@Body() createCarDto: CreateCarDto) {
    return this.carsService.createCar(createCarDto)

  }
}
