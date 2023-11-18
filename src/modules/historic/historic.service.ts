import { Injectable } from '@nestjs/common';
import { OrdersRepository } from 'src/shared/database/repositories/orders.repository';
import { OrderState } from '../orders/entities/enums/order-state';

@Injectable()
export class HistoricService {
    constructor(private readonly ordersRepository: OrdersRepository) {}

    findAll() {
        return this.ordersRepository.findByState(OrderState.HISTORIC);
    }

    create() {
        return this.ordersRepository.updateOrdersToHistoricState();
    }
}
