/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateIngredientDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'emoji',
        description: 'Emoji of the new ingredient.',
        example: '🍅',
    })
    emoji: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'name',
        description: 'Name of the new ingredient.',
        example: 'Tomate',
    })
    name: string;
}
