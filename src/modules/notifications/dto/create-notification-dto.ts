import { OrderState } from 'src/modules/orders/entities/enums/order-state';

export class CreateNotificationDto {
    table: string;
    orderState: OrderState;
}
