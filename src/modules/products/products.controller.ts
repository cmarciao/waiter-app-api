import {
    Controller,
    Post,
    Body,
    UseGuards,
    Get,
    Param,
    UseInterceptors,
    UploadedFile,
    UsePipes,
    Delete,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RoleGuard } from 'src/shared/guards/role.guard';

import { UserType } from '../users/entities/enums/UserType';
import { CreateProductDto } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductPipe } from 'src/shared/pipes/create-product.pipe';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(id);
    }

    @Get('category/:id')
    findByCategory(@Param('id') id: string) {
        return this.productsService.findByCategory(id);
    }

    @Post()
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    @UseInterceptors(FileInterceptor('image'))
    @UsePipes(new CreateProductPipe())
    create(
        @UploadedFile() file: Express.Multer.File,
        @Body() createProductDto: CreateProductDto,
    ) {
        return this.productsService.create({
            ...createProductDto,
            image: file,
        });
    }

    @Delete(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    remove(@Param('id') id: string) {
        return this.productsService.remove(id);
    }
}
