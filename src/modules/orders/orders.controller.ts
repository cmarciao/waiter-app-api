/* eslint-disable indent */
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';

import { OrdersService } from './orders.service';
import { UserType } from '../users/entities/enums/user-type';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get(':state')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    findAll() {
        return this.ordersService.findAll();
    }

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }
}
