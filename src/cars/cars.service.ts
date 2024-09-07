import { Injectable } from '@nestjs/common';

@Injectable()
export class CarsService {
  // private cars = ['Honda', 'Toyota', 'Nissan', 'Ford', 'Chevrolet', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Hyundai', 'Kia', 'Mazda', 'Subaru', 'Lexus', 'Jaguar', 'Land Rover', 'Porsche', 'Ferrari', 'Lamborghini', 'Maserati', 'Bentley', 'Rolls-Royce', 'Aston Martin', 'Bugatti', 'Peugeot', 'Renault', 'Citroën', 'Fiat', 'Alfa Romeo', 'Dodge', 'Jeep', 'Chrysler', 'Ram', 'Buick', 'GMC', 'Cadillac', 'Lincoln', 'Acura', 'Infiniti', 'Tesla', 'Volvo', 'Saab', 'Mini', 'Mitsubishi', 'Suzuki', 'Isuzu', 'Genesis', 'Smart', 'Seat', 'Skoda', 'Pagani', 'Koenigsegg', 'McLaren', 'Lotus', 'Opel', 'Vauxhall', 'Polestar', 'Hummer', 'Pontiac', 'Saturn', 'Daewoo', 'Scion', 'Holden', 'Tata', 'Mahindra', 'Lada', 'Maruti Suzuki', 'Dacia', 'Chery', 'Geely', 'Great Wall', 'BYD', 'Baojun', 'FAW', 'Zotye', 'Roewe', 'MG', 'Wuling', 'Lucid', 'Rivian', 'Fisker', 'Ariel', 'Caterham', 'Ginetta', 'Morgan', 'TVR', 'Noble', 'Pininfarina', 'Hennessey', 'Rezvani', 'SSC', 'Borgward', 'Cupra', 'RAM', 'Vectrix', 'Venturi', 'Mullen', 'Zarooq', 'Zenvo', 'Rimac', 'Wiesmann', 'Spyker', 'De Tomaso', 'Delorean', 'Aptera', 'Elio Motors'];
  private cars = [
    {
      id: 1,
      name: 'Honda',
    },
    {
      id: 2,
      name: 'Toyota',
    },
    {
      id: 3,
      name: 'Nissan',
    },
    {
      id: 4,
      name: 'Ford',
    },
    {
      id: 5,
      name: 'Chevrolet',
    },
    {
      id: 6,
      name: 'BMW',
    },
    {
      id: 7,
      name: 'Mercedes-Benz',
    },
    {
      id: 8,
      name: 'Audi',
    },
    {
      id: 9,
      name: 'Volkswagen',
    },
    {
      id: 10,
      name: 'Hyundai',
    },
    {
      id: 11,
      name: 'Kia',
    },
    {
      id: 12,
      name: 'Mazda',
    },
    {
      id: 13,
      name: 'Subaru',
    },
    {
      id: 14,
      name: 'Lexus',
    },
    {
      id: 15,
      name: 'Jaguar',
    },
    {
      id: 16,
      name: 'Land Rover',
    },
    {
      id: 17,
      name: 'Porsche',
    },
    {
      id: 18,
      name: 'Ferrari',
    },
    {
      id: 19,
      name: 'Lamborghini',
    },
    {
      id: 20,
      name: 'Maserati',
    },
    {
      id: 21,
      name: 'Bentley',
    },
  ];

  getCars() {
    return this.cars;
  }

  getCarById(id: number) {
    console.log(id);
    return this.cars.find((car) => car.id === id);
  }

  findAll() {
    return this.cars;
  }
}
