/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'name',
        description: 'Name of the new product.',
        example: 'Pizza',
    })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'description',
        description: 'Description of the new product.',
        example: 'Delicious pizza.',
    })
    description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'price',
        description: 'Price of the new product.',
        example: 10.25,
    })
    price: number;

    @IsOptional()
    @ApiProperty({
        name: 'image',
        description: 'Image of the new product.',
        type: 'string',
        format: 'binary',
    })
    image?: Express.Multer.File;

    @IsOptional()
    imageId?: string;

    @IsOptional()
    imageUrl?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'categoryId',
        description: 'Id of the category of the new product.',
        example: '0c270ae9-f93a-4c28-ac0e-ae132f1d44df',
    })
    categoryId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        name: 'ingredientIds',
        description: 'Ids of the ingredients of the new product.',
        example: [
            '0c270ae9-f93a-4c28-ac0e-ae132f1d44df',
            'ae132f1d44df-0c270ae9-f93a-ac0e-4c28',
            '4c28- 0c270ae9-f93a-ae132f1d44df-ac0e',
        ],
    })
    ingredientIds: string[];
}
