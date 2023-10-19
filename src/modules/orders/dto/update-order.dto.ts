/* eslint-disable indent */
import { IsEnum } from 'class-validator';
import { OrderState } from '../entities/enums/order-state';

export class UpdateOrderDto {
    @IsEnum(OrderState)
    state: OrderState;
}
