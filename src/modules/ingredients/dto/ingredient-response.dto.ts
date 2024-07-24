/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IngredientResponseDto {
    @ApiProperty({
        name: 'id',
        description: 'Ingredient id.',
        example: '0c270ae9-f93a-4c28-ac0e-ae132f1d44df',
    })
    id: string;

    @ApiProperty({
        name: 'emoji',
        description: 'Ingredient emoji.',
        example: '🍅',
    })
    emoji: string;

    @ApiProperty({
        name: 'name',
        description: 'Ingredient name.',
        example: 'Tomate',
    })
    name: string;
}
