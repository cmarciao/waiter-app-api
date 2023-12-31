import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

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

    async findAll() {
        const orders = await this.ordersRepository.findAll();

        return orders;
    }

    async findOne(id: string) {
        const orderFound = await this.ordersRepository.findById(id);

        if (!orderFound) {
            throw new NotFoundException('Order not found.');
        }

        return orderFound;
    }

    async update(id: string, updateOrderDto: UpdateOrderDto) {
        const orderFound = await this.ordersRepository.findById(id);

        if (!orderFound) {
            throw new NotFoundException('Order not found.');
        }

        const order = await this.ordersRepository.update(id, updateOrderDto);

        return order;
    }

    async remove(id: string) {
        const orderFound = await this.ordersRepository.findById(id);

        if (!orderFound) {
            throw new NotFoundException('Order not found.');
        }

        await this.ordersRepository.remove(id);

        return null;
    }
}
