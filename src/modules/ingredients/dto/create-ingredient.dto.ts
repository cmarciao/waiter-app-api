/* eslint-disable indent */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIngredientDto {
    @IsString()
    @IsNotEmpty()
    emoji: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}
