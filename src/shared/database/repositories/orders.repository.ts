import { Order } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from 'src/modules/orders/dto/create-order.dto';
import { UpdateOrderDto } from 'src/modules/orders/dto/update-order.dto';
import { OrderState } from 'src/modules/orders/entities/enums/order-state';
import { SortOrder } from 'src/modules/historic/entities/enums/sort-order';

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

    async findById(id: string) {
        const response = await this.prismaService.order.findUnique({
            where: {
                id,
            },
            include: {
                products: {
                    select: {
                        product: true,
                    },
                },
            },
        });

        if (response) {
            const orders = this.orderMapper(response);
            return orders;
        }

        return response;
    }

    async findByState(state: OrderState, orderBy = SortOrder.DESC) {
        const response = await this.prismaService.order.findMany({
            where: {
                orderState: state,
            },
            orderBy: {
                createdAt: orderBy,
            },
            include: {
                products: {
                    select: {
                        product: {
                            include: {
                                category: true,
                            },
                        },
                    },
                },
            },
        });

        const orders = response.map((order) => this.orderMapper(order));

        return orders;
    }

    async findActiveOrders() {
        const response = await this.prismaService.order.findMany({
            where: {
                orderState: {
                    not: 'HISTORIC',
                },
            },
            include: {
                products: {
                    select: {
                        product: {
                            include: {
                                category: true,
                            },
                        },
                    },
                },
            },
        });

        const orders = response.map((order) => this.orderMapper(order));

        return orders;
    }

    updateOrdersToHistoricState() {
        return this.prismaService.order.updateMany({
            data: {
                orderState: 'HISTORIC',
            },
            where: {
                orderState: {
                    not: 'HISTORIC',
                },
            },
        });
    }

    async update(id: string, updateOrderDto: UpdateOrderDto) {
        const response = await this.prismaService.order.update({
            where: {
                id,
            },
            data: {
                orderState: updateOrderDto.state,
            },
            include: {
                products: {
                    select: {
                        product: true,
                    },
                },
            },
        });

        const orders = this.orderMapper(response);

        return orders;
    }

    remove(id: string) {
        const deleteProductsQuery =
            this.prismaService.orderToProducts.deleteMany({
                where: {
                    orderId: id,
                },
            });

        const deleteOrderQuery = this.prismaService.order.delete({
            where: {
                id,
            },
        });

        return this.prismaService.$transaction([
            deleteProductsQuery,
            deleteOrderQuery,
        ]);
    }

    private orderMapper(order: Order) {
        const oldProducts = order['products'];
        const mappedOrder = {
            ...order,
            products: oldProducts.map((order) => ({
                ...order.product,
            })),
        };

        const products = mappedOrder['products'];
        const newProducts = [];
        const totalProducts = products.length;

        for (let i = 0; i < products.length; i++) {
            const currentProduct = products[i];
            if (
                newProducts.filter((item) => item.id === currentProduct.id)
                    .length > 0
            ) {
                continue;
            }

            let count = 0;

            for (const product of products) {
                if (product.id === currentProduct.id) {
                    count++;
                }
            }

            newProducts.push({
                ...currentProduct,
                count,
            });
        }

        const finalOrder = {
            ...order,
            products: newProducts,
            totalProducts,
        };

        return finalOrder;
    }
}
