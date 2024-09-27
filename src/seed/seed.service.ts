import { Injectable } from '@nestjs/common';
import { CARS_SEED } from './data/card.seed';
import { BRANDS_SEED } from './data/brand.seed';
import { CarsService } from 'src/cars/cars.service';
import { BrandsService } from 'src/brands/brands.service';


@Injectable()
export class SeedService {
  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService
  ) { }
  populateDB() {
    

    this.carsService.fillCarWithSeedData(CARS_SEED);
    this.brandsService.fillBrandWithSeedData(BRANDS_SEED);

    return "Seed executed";
  }


}
