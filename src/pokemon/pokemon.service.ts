import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { PagitationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>
  ) {

  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);

      return pokemon;
    } catch (error) {

      this.handleExceptions(error);
    }

  }

  async findAll(pagitationDto: PagitationDto) {

    const { limit = 10, offset = 0 } = pagitationDto;


    const pokemons = await this.pokemonModel.find().limit(limit).skip(offset).sort({ no: 1 }).select('-__v');

    return pokemons;
  }

  async findOne(term: string) {

    let pokemon: Pokemon;

    if (!isNaN(+term)) {

      pokemon = await this.pokemonModel.findOne({ no: term });

    }

    if (!pokemon && isValidObjectId(term)) {

      pokemon = await this.pokemonModel.findById(term)

    }

    if (!pokemon) throw new NotFoundException(`Pokemon with id, name or no "${term}" not found`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name) updatePokemonDto.name = updatePokemonDto.name.toLowerCase();



    try {

      await pokemon.updateOne(updatePokemonDto);
      return { ...pokemon.toJSON(), ...updatePokemonDto }
    } catch (error) {

      this.handleExceptions(error);
    }

  }

  async remove(id: string) {

    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id });

    if (deletedCount === 0) throw new BadRequestException(`Pokemon with id "${id}" not found`);

    return;

  }

  async removeAll() {
    return this.pokemonModel.deleteMany({});
  }

  async insertMany(pokemons: { name: string, no: number }[]) {

    try {

      await this.pokemonModel.insertMany(pokemons);

    } catch (error) {

      this.handleExceptions(error);
    }
  }

  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException('Pokemon exists in db');
    }
    console.log(error);
    throw new InternalServerErrorException('Something went wrong');
  }
}
