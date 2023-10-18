/* eslint-disable indent */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProductDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description: string;

    @IsOptional()
    image?: Express.Multer.File;

    @IsOptional()
    imageId?: string;

    @IsOptional()
    imageUrl?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    categoryIds: string[];

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    ingredientIds: string[];
}
