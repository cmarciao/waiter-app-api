/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IngredientResponseDto } from 'src/modules/ingredients/dto/ingredient-response.dto';

export class ProductResponseDto {
    @ApiProperty({
        name: 'id',
        description: 'Product id.',
        example: '0c270ae9-f93a-4c28-ac0e-ae132f1d44df',
    })
    id: string;

    @ApiProperty({
        name: 'name',
        description: 'Product name.',
        example: 'Four cheese pizza.',
    })
    name: string;

    @ApiProperty({
        name: 'description',
        description: 'Product description.',
        example: 'Delicious 4-cheese pizza.',
    })
    description: string;

    @ApiProperty({
        name: 'price',
        description: 'Product price.',
        example: 10.25,
    })
    price: number;

    @ApiProperty({
        name: 'imageUrl',
        description: 'Product image url.',
        example: 'https://example.com',
    })
    imageUrl: string;

    @ApiProperty({
        name: 'ingredients',
        description: 'Product ingredients.',
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
