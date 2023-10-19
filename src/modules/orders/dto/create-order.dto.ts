/* eslint-disable indent */
import { Type } from 'class-transformer';
import { IsArray, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOrderDto {
    @IsNumber()
    @IsInt()
    table: number;

    @IsArray()
    @IsNotEmpty()
    @Type(() => String)
    productIds: string[];
}
