/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'emoji',
        description: 'Emoji of the new category.',
        example: '🍕',
    })
    emoji: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'name',
        description: 'Name of the new category.',
        example: 'Pizzas',
    })
    name: string;
}
