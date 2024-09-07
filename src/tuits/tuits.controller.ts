import { Body, Controller, Get, Param, Post} from '@nestjs/common';

@Controller('tuits')
export class TuitsController {
    @Get() //rutas get
    getTuits() {
        return 'Tuits';
    }

    @Get('/:id') //decorador
    getTuit(@Param() params) {
        return `Tuit ${params.id}`;
    }

    @Post()
    createTuit(@Body('message') message: string) {
        return `Tuit created: ${message}`;
    }
}
