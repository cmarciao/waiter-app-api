import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from 'src/modules/orders/dto/create-order.dto';
import { Order } from '@prisma/client';
import { OrderState } from 'src/modules/orders/entities/enums/order-state';

type CreateOrderRequest = CreateOrderDto & {
    total: number;
};

@Injectable()
export class OrdersRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async create({ table, total, productIds }: CreateOrderRequest) {
        const products = productIds.map((product) => ({
            productId: product,
        }));

        const response = await this.prismaService.order.create({
            data: {
                table,
                total,
                products: {
                    create: products,
                },
            },
            include: {
                products: {
                    select: {
                        product: true,
                    },
                },
            },
        });

        const order = this.orderMapper(response);

        return order;
    }
    async findAll() {
        const response = await this.prismaService.order.findMany({
            include: {
                products: {
                    select: {
                        product: true,
                    },
                },
            },
        });
        const orders = response.map((order) => this.orderMapper(order));

        return orders;
    }

    private orderMapper(order: Order) {
        const mappedOrder = {
            ...order,
            products: order['products'].map((order) => ({
                ...order.product,
            })),
        };

        return mappedOrder;
    }
}
