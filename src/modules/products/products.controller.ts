import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';

import { ProductsService } from './products.service';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RoleGuard } from 'src/shared/guards/role.guard';

import { UserType } from '../users/entities/enums/UserType';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(id);
    }

    @Post()
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }
}
