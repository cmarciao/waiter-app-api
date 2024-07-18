import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

import { OrdersRepository } from 'src/shared/database/repositories/orders.repository';
import { ProductsRepository } from 'src/shared/database/repositories/products.repository';
import { NotificationsService } from '../notifications/notifications.service';
import { OrderState } from './entities/enums/order-state';
import { NotificationsGateway } from '../notifications/gateway/notifications.gateway';

@Injectable()
export class OrdersService {
    constructor(
        private readonly ordersRepository: OrdersRepository,
        private readonly productsRepository: ProductsRepository,
        private readonly notificationsService: NotificationsService,
        private readonly notificationsGateway: NotificationsGateway,
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

        const notification = await this.notificationsService.create({
            table: order.table,
            orderState: OrderState.WAITING,
        });

        ['orders@new', 'orders@update'].forEach((path) => {
            this.notificationsGateway.handleSendNotification(
                path,
                notification,
            );
        });

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

        const notification = await this.notificationsService.create({
            table: order.table,
            orderState: updateOrderDto.state,
        });

        this.notificationsGateway.handleSendNotification(
            'orders@update',
            notification,
        );

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
