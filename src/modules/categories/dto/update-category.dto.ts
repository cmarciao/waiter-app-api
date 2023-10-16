/* eslint-disable indent */
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    emoji?: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;
}
