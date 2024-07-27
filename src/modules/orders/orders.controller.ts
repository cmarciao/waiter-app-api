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
import {
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from 'src/shared/types/ErrorResponse';
import { OrderResponseDto } from './dto/order-response.dto';

@ApiTags('orders')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    description: 'Usuário não autenticado.',
    type: ErrorResponse,
})
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {
        /** Do nothing */
    }

    @Get()
    @ApiOkResponse({
        isArray: true,
        type: OrderResponseDto,
        description: 'Lista de todos os pedidos.',
    })
    findAll() {
        return this.ordersService.findAll();
    }

    @Get(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    @ApiOkResponse({
        description: 'O pedido pesquisado.',
        type: OrderResponseDto,
        isArray: true,
    })
    @ApiParam({
        name: 'id',
        description: 'Id do pedido que será pesquisado.',
    })
    @ApiNotFoundResponse({
        description: 'Pedido não encontrado.',
        type: ErrorResponse,
    })
    findOne(@Param('id') id: string) {
        return this.ordersService.findOne(id);
    }

    @Post()
    @ApiCreatedResponse({
        description: 'O pedido criado.',
        type: OrderResponseDto,
    })
    create(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.create(createOrderDto);
    }

    @Patch(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    @ApiParam({
        name: 'id',
        description: 'Id do pedido que será atualizado.',
    })
    @ApiOkResponse({
        description: 'O pedido atualizado.',
        type: OrderResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Pedido não encontrado.',
        type: ErrorResponse,
    })
    update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        return this.ordersService.update(id, updateOrderDto);
    }

    @Delete(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    @ApiOkResponse({
        description: 'Pedido deletado com sucesso.',
    })
    @ApiParam({
        name: 'id',
        description: 'Id do pedido que será deletado.',
    })
    remove(@Param('id') id: string) {
        return this.ordersService.remove(id);
    }
}
