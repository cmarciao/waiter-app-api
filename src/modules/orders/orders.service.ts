import { Injectable } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersRepository } from 'src/shared/database/repositories/orders.repository';
import { ProductsRepository } from 'src/shared/database/repositories/products.repository';

@Injectable()
export class OrdersService {
    constructor(
        private readonly ordersRepository: OrdersRepository,
        private readonly productsRepository: ProductsRepository,
    ) {}

    async create({ table, productIds }: CreateOrderDto) {
        let total = 0;

        for (const id of productIds) {
            total += await this.productsRepository.getProductPrice(id);
        }

        return this.ordersRepository.create({
            total,
            table,
            productIds,
        });
    }
}
