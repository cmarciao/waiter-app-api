/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({
        name: 'emoji',
        description: 'Emoji of the category.',
        example: '🍕',
    })
    emoji?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({
        name: 'name',
        description: 'Name of the category.',
        example: 'Pizzas',
    })
    name?: string;
}
