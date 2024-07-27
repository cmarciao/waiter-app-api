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
import {
    ApiBearerAuth,
    ApiConflictResponse,
    ApiConsumes,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from 'src/shared/types/ErrorResponse';
import { ProductResponseDto } from './dto/product-response.dto';

@ApiTags('products')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    description: 'Usuário não autenticado.',
    type: ErrorResponse,
})
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {
        /** Do nothing */
    }

    @Get()
    @ApiOkResponse({
        isArray: true,
        type: ProductResponseDto,
        description: 'Lista de todos os produtos.',
    })
    findAll() {
        return this.productsService.findAll();
    }

    @ApiOkResponse({
        description: 'O produto pesquisado.',
        type: ProductResponseDto,
        isArray: true,
    })
    @ApiParam({
        name: 'id',
        description: 'Id do produto que será pesquisado.',
    })
    @ApiNotFoundResponse({
        description: 'Produto não encontrado.',
        type: ErrorResponse,
    })
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
    @ApiConsumes('multipart/form-data')
    @ApiCreatedResponse({
        description: 'O produto criado.',
        type: ProductResponseDto,
    })
    @ApiConflictResponse({
        description: 'O produto já está em uso.',
        type: ErrorResponse,
    })
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
    @ApiConsumes('multipart/form-data')
    @ApiParam({
        name: 'id',
        description: 'Id do produto que será atualizado.',
    })
    @ApiOkResponse({
        description: 'O produto atualizado.',
        type: ProductResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Produto não encontrado.',
        type: ErrorResponse,
    })
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
    @ApiOkResponse({
        description: 'Produto deletado com sucesso.',
    })
    @ApiParam({
        name: 'id',
        description: 'Id do produto que será deletado.',
    })
    remove(@Param('id') id: string) {
        return this.productsService.remove(id);
    }
}
