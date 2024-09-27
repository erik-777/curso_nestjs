import { v4 as uuid } from "uuid";
import { Car } from "src/cars/interfaces/car.inteface";

export const CARS_SEED: Car[ ] = [
    {
        uuid: uuid(4),
        name: 'Ford',
        model: 'Mustang',
        marca: 'Ford',
        valor: 2000
    },
    {
        uuid: uuid(4),
        name: 'Chevrolet',
        model: 'Camaro',
        marca: 'Chevrolet',
        valor: 3000
    }]