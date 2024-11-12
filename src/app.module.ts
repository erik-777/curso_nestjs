import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public')
  }), MongooseModule.forRoot('mongodb://10.0.102.9:27018/pokemondb'),
    PokemonModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule { }
