import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';


@Module({
  imports: [ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public')
  }), MongooseModule.forRoot('mongodb://pokedex_user:admin12345@10.0.102.9:27018/pokedex'),
    PokemonModule,
    CommonModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule { }
