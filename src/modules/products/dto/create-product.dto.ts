/* eslint-disable indent */
import { Type } from 'class-transformer';

import { IsArray, IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsUrl()
    @IsNotEmpty()
    imageUrl: string;

    @IsArray()
    @IsNotEmpty()
    @Type(() => String)
    categorieIds: string[];

    @IsArray()
    @IsNotEmpty()
    @Type(() => String)
    ingredientIds: string[];
}
