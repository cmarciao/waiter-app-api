/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IngredientResponseDto } from 'src/modules/ingredients/dto/ingredient-response.dto';

export class ProductResponseDto {
    @ApiProperty({
        name: 'id',
        description: 'Created product id.',
        example: '0c270ae9-f93a-4c28-ac0e-ae132f1d44df',
    })
    id: string;

    @ApiProperty({
        name: 'name',
        description: 'Created product name.',
        example: 'Four cheese pizza.',
    })
    name: string;

    @ApiProperty({
        name: 'description',
        description: 'Created product description.',
        example: 'Delicious 4-cheese pizza.',
    })
    description: string;

    @ApiProperty({
        name: 'price',
        description: 'Created product price.',
        example: 10.25,
    })
    price: number;

    @ApiProperty({
        name: 'imageUrl',
        description: 'Created product image url.',
        example: 'https://example.com',
    })
    imageUrl: string;

    @ApiProperty({
        name: 'ingredients',
        description: 'Created product ingredients.',
        isArray: true,
        example: [
            {
                id: '0c270ae9-f93a-4c28-ac0e-ae132f1d44df',
                emoji: '🍕',
                name: 'Pizza',
            },
        ],
    })
    ingredients: IngredientResponseDto;
}
