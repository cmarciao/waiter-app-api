/* eslint-disable indent */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    price: number;

    @IsOptional()
    image?: Express.Multer.File;

    @IsOptional()
    imageId?: string;

    @IsOptional()
    imageUrl?: string;

    @IsString()
    @IsNotEmpty()
    categoryIds: string[];

    @IsString()
    @IsNotEmpty()
    ingredientIds: string[];
}
