/* eslint-disable indent */
import { IsEnum } from 'class-validator';
import { OrderState } from '../entities/enums/order-state';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
    @ApiProperty({
        name: 'orderState',
        description: 'New order state.',
        enum: OrderState,
        example: 'WAITING',
    })
    @IsEnum(OrderState)
    state: OrderState;
}
