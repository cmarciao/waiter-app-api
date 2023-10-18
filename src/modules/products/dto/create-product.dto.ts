/* eslint-disable indent */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    image?: Express.Multer.File;

    @IsOptional()
    imageUrl?: string;

    @IsString()
    @IsNotEmpty()
    categoryIds: string[];

    @IsString()
    @IsNotEmpty()
    ingredientIds: string[];
}
