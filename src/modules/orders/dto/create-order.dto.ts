/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
    @ApiProperty({
        name: 'table',
        description: 'Order table.',
        example: 'N11',
    })
    @IsString()
    @IsNotEmpty()
    table: string;

    @ApiProperty({
        name: 'productIds',
        description: 'Product ids of the order.',
        example: [
            '0c270ae9-f93a-4c28-ac0e-ae132f1d44df',
            'ae132f1d44df-0c270ae9-f93a-ac0e-4c28',
            '4c28- 0c270ae9-f93a-ae132f1d44df-ac0e',
        ],
    })
    @IsArray()
    @IsNotEmpty()
    @Type(() => String)
    productIds: string[];
}
