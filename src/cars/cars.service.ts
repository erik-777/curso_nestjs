import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto, } from './dto';
import { v4 as uuid } from "uuid"
import { Car } from './interfaces/car.inteface';


@Injectable()
export class CarsService {


  private cars: Car[] = [
    // {
    //   "uuid": "def0dcae-1c63-4e55-a7a7-e9459d7ddf86",
    //   "name": "Car 1",
    //   "model": "modelo1",
    //   "marca": "marca1",
    //   "valor": "valor1"
    // },

  ];

  getCars() {
    return this.cars;
  }

  getCarById(uuid: string) {
    console.log(uuid);
    const car = this.cars.find((car) => car.uuid === uuid);
    if (!car) throw new NotFoundException(`Car with id ${uuid} not found`);
    return car;
  }

  findAll() {
    return this.cars;
  }
  createCar(createCarDto: CreateCarDto) {
    const car = {
      uuid: uuid(4),
      ...CreateCarDto
    }
    //this.cars.push(car)
    return createCarDto
  }
  fillCarWithSeedData(cars: Car[]) {
    this.cars = cars
  }
}
