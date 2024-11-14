import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';



@Injectable()
export class SeedService {


  private readonly axios: AxiosInstance = axios;
  constructor(
    private readonly pokemonService: PokemonService

  ) { }


  async executeSeed() {

    await this.pokemonService.removeAll(); //delete all pokemons

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=10'); //getting 10 pokemons

    const insertPromises = [];

    data.results.map(async ({ name, url }) => {

      const segments = url.split('/');

      const no: number = +segments[segments.length - 2]; // getting the id from the url 

      //await this.pokemonService.create({ name, no });

      insertPromises.push(this.pokemonService.create({ name, no }));

    })

    await Promise.all(insertPromises);

    return data.results
  }
}
