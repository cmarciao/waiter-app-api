/* eslint-disable indent */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateIngredientDto } from './create-ingredient.dto';

export class UpdateIngredientDto extends CreateIngredientDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    emoji: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;
}
