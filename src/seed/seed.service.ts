import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';


@Injectable()
export class SeedService {

  private readonly axios: AxiosInstance = axios;


  async executeSeed() {

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');
    
    data.results.map(async ({ name, url }) => {
      console.log(name)
      console.log(url)

      const segments = url.split('/');
      const no: number = +segments[segments.length - 2];
      console.log(no)
      //await this.pokemonModel.create({ no, name })
    })

    return data.results
  }
}
