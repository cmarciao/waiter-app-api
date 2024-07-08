/* eslint-disable indent */
import {
    Controller,
    Post,
    Body,
    Get,
    UseGuards,
    Param,
    Delete,
    Patch,
} from '@nestjs/common';

import { CreateOrderDto } from './dto/create-order.dto';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';

import { OrdersService } from './orders.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UserType } from '../users/entities/enums/user-type';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
        /** Do nothing */
    }

    @Get()
    findAll() {
        return this.ordersService.findAll();
    }

    @Get(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(id);
    }

    @Post()
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    @Patch(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.ordersService.update(id, updateOrderDto);
    }

    @Delete(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    remove(@Param('id') id: string) {
        return this.ordersService.remove(id);
    }
}
