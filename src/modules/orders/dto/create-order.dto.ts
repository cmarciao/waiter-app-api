/* eslint-disable indent */
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    table: string;

    @IsArray()
    @IsNotEmpty()
    @Type(() => String)
    productIds: string[];
}
