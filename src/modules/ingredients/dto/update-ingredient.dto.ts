/* eslint-disable indent */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateIngredientDto } from './create-ingredient.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateIngredientDto extends CreateIngredientDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({
        name: 'emoji',
        description: 'Emoji of the ingredient.',
        example: '🍅',
    })
    emoji: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({
        name: 'name',
        description: 'Name of the ingredient.',
        example: 'Tomate',
    })
    name: string;
}
