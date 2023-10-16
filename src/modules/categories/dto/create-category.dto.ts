/* eslint-disable indent */
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    emoji: string;

    @IsString()
    @IsNotEmpty()
    name: string;
}
