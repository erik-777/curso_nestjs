import { IsNumber, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {
    
    @IsString({message: 'name must be a string'})
    @MinLength(1) 
    name: string;

    @IsPositive()
    @IsNumber()
    @Min(1)
    no: number;
    
}
