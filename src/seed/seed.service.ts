import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';



@Injectable()
export class SeedService {


  private readonly axios: AxiosInstance = axios;
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter

  ) { }


  async executeSeed() {

    await this.pokemonService.removeAll(); //delete all pokemons

    const data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=600'); //getting 10 pokemons

    const pokemonsToInsert: { name: string, no: number }[] = [];

    data.results.map(async ({ name, url }) => {

      const segments = url.split('/');

      const no: number = +segments[segments.length - 2]; // getting the id from the url 

      pokemonsToInsert.push({ name, no });

    })

    await this.pokemonService.insertMany(pokemonsToInsert);

    return data.results
  }
}
