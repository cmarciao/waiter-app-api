import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { OrderState } from '../orders/entities/enums/order-state';
import { OrdersRepository } from 'src/shared/database/repositories/orders.repository';

@Injectable()
export class HistoricService {
    constructor(private readonly ordersRepository: OrdersRepository) {}

    findAll() {
        return this.ordersRepository.findByState(OrderState.HISTORIC);
    }

    create() {
        return this.ordersRepository.updateOrdersToHistoricState();
    }

    async remove(id: string) {
        const orderFound = await this.ordersRepository.findById(id);

        if (!orderFound) {
            throw new NotFoundException('Order not found.');
        }

        if (orderFound.orderState !== OrderState.HISTORIC) {
            throw new BadRequestException(
                'Order is not in the historic state.',
            );
        }

        await this.ordersRepository.remove(id);

        return null;
    }
}
