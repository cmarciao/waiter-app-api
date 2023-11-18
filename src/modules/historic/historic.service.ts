import { Injectable } from '@nestjs/common';
import { OrdersRepository } from 'src/shared/database/repositories/orders.repository';

@Injectable()
export class HistoricService {
    constructor(private readonly ordersRepository: OrdersRepository) {}

    create() {
        return this.ordersRepository.updateOrdersToHistoricState();
    }
}
