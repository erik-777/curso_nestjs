import { Type } from "class-transformer";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";
export class CreateCarDto {
    @IsUUID(4)
    @IsNotEmpty()
    uuid: string
    @IsString()
    @IsNotEmpty()
    name: string
    @IsString()
    @IsNotEmpty()
    model: string
    @IsString()
    @IsNotEmpty()
    marca: string
    @IsString()
    @IsNotEmpty()
    valor: number
}