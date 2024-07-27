/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { OrderState } from '@prisma/client';
import { IsEnum, IsOptional } from 'class-validator';
import { ProductResponseDto } from 'src/modules/products/dto/product-response.dto';

export class OrderResponseDto {
    @ApiProperty({
        name: 'id',
        description: 'Order id.',
        example: '0c270ae9-f93a-4c28-ac0e-ae132f1d44df',
    })
    id: string;

    @ApiProperty({
        name: 'table',
        description: 'Order table.',
        example: 'N11',
    })
    table: string;

    @ApiProperty({
        name: 'total',
        description: 'Order total price.',
        example: 10,
    })
    total: number;

    @ApiProperty({
        name: 'createdAt',
        description: 'Order creation date.',
        example: '2024-07-19 01:22:10.353',
    })
    createdAt: Date;

    @ApiProperty({
        name: 'finishedAt',
        description: 'Order creation date.',
        example: '2024-07-19',
    })
    @IsOptional()
    finishedAt: Date | null;

    @ApiProperty({
        name: 'products',
        isArray: true,
        description: 'Order products.',
        type: ProductResponseDto,
    })
    products: ProductResponseDto[];

    @ApiProperty({
        name: 'totalProducts',
        description: 'Total amount of products in the order.',
        example: 10,
    })
    totalProducts: number;

    @ApiProperty({
        name: 'orderState',
        description: 'Current order state',
        default: 'WAITING',
        enum: OrderState,
        example: 'WAITING',
    })
    @IsEnum(OrderState)
    orderState: OrderState;
}
