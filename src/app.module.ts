import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot(
      {
        load: [],
        isGlobal: true
      }
    ),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public')
    }), 
    MongooseModule.forRoot('mongodb://pokedex_user:admin12345@10.0.102.9:27018/pokedex'),
    //MongooseModule.forRoot('mongodb://mongo:nUhKoMnRnUbvpnUbwNnvyofqxLwYmCZB@junction.proxy.rlwy.net:32000/pokedex'),
    PokemonModule,
    CommonModule,
    SeedModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule { }
