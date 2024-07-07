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
    Put,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RoleGuard } from 'src/shared/guards/role.guard';

import { UserType } from '../users/entities/enums/user-type';
import { CreateProductDto } from './dto/create-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductPipe } from 'src/shared/pipes/create-product.pipe';
import { UpdateProductDto } from './dto/update-product.dto';
import { UpdateProductPipe } from 'src/shared/pipes/update-product.pipe';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {
        /** Do nothing */
    }

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
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

    @Put(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    @UseInterceptors(FileInterceptor('image'))
    @UsePipes(new UpdateProductPipe())
    update(
        @Param('id') id: string,
        @UploadedFile() file: Express.Multer.File,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        const params = { ...updateProductDto };

        if (file) {
            Object.assign(params, { image: file });
        }

        return this.productsService.update(id, params);
    }

    @Delete(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    remove(@Param('id') id: string) {
        return this.productsService.remove(id);
    }
}
