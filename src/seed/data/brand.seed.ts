import { Brand } from 'src/brands/entities/brand.entity';
import { v4 as uuid } from 'uuid';

export const BRANDS_SEED: Brand[] = [
    {
        id: uuid(),
        name: 'ford',
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()

    },
    {
        id: uuid(),
        name: 'chevrolet',
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
    },
    {
        id: uuid(),
        name: 'nissan',
        createdAt: new Date().getTime(),
        updatedAt: new Date().getTime()
    }

]   