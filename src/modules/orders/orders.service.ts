import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { OrdersRepository } from 'src/shared/database/repositories/orders.repository';
import { ProductsRepository } from 'src/shared/database/repositories/products.repository';
import { NotificationsService } from '../notifications/notifications.service';
import { OrderState } from './entities/enums/order-state';

@Injectable()
export class OrdersService {
    constructor(
        private readonly ordersRepository: OrdersRepository,
        private readonly productsRepository: ProductsRepository,
        private readonly notificationsService: NotificationsService,
    ) {}

    async create({ table, productIds }: CreateOrderDto) {
        let total = 0;

        for (const id of productIds) {
            total += await this.productsRepository.getProductPrice(id);
        }

        const order = await this.ordersRepository.create({
            total,
            table,
            productIds,
        });

        this.notificationsService
            .create(['orders@new', 'orders@update'], {
                table: order.table,
                orderState: OrderState.WAITING,
            })
            .then();

        return order;
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

        await this.notificationsService.create(['orders@update'], {
            table: order.table,
            orderState: updateOrderDto.state,
        });

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
