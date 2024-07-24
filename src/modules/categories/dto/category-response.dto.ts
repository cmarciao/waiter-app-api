/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDto {
    @ApiProperty({
        name: 'id',
        description: 'Category id.',
        example: '0c270ae9-f93a-4c28-ac0e-ae132f1d44df',
    })
    id: string;

    @ApiProperty({
        name: 'emoji',
        description: 'Category emoji.',
        example: '🍕',
    })
    emoji: string;

    @ApiProperty({
        name: 'name',
        description: 'Category name.',
        example: 'Pizzas',
    })
    name: string;
}
