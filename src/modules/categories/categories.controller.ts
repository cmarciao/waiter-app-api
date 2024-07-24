import {
    Controller,
    Post,
    Body,
    UseGuards,
    Put,
    Param,
    Get,
    Delete,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiUnauthorizedResponse,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';

import { RoleGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserType } from '../users/entities/enums/user-type';

import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryResponseDto } from './dto/category-response.dto';
import { ErrorResponse } from 'src/shared/types/ErrorResponse';

@ApiTags('categories')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    description: 'Usuário não autenticado.',
    type: ErrorResponse,
})
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    @ApiOkResponse({
        description: 'Lista de todas as categorias',
        type: CategoryResponseDto,
        isArray: true,
    })
    findAll() {
        return this.categoriesService.findAll();
    }

    @Get(':id')
    @ApiOkResponse({
        description: 'A categoria pesquisada.',
        type: CategoryResponseDto,
        isArray: true,
    })
    @ApiParam({
        name: 'id',
        description: 'Id da categoria que será pesquisada.',
    })
    @ApiNotFoundResponse({
        description: 'Categoria não encontrada.',
        type: ErrorResponse,
    })
    findOne(@Param('id') id: string) {
        return this.categoriesService.findOne(id);
    }

    @Post()
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    @ApiCreatedResponse({
        description: 'A categoria criada.',
        type: CategoryResponseDto,
    })
    @ApiConflictResponse({
        description: 'A categoria já está em uso.',
        type: ErrorResponse,
    })
    create(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoriesService.create(createCategoryDto);
    }

    @Put(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    @ApiParam({
        name: 'id',
        description: 'Id da categoria que será atualizada.',
    })
    @ApiOkResponse({
        description: 'A categoria atualizada.',
        type: CategoryResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Categoria não encontrada.',
        type: ErrorResponse,
    })
    update(
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
        return this.categoriesService.update(id, updateCategoryDto);
    }

    @Delete(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    @ApiOkResponse({
        description: 'Categoria deletada com sucesso.',
    })
    @ApiParam({
        name: 'id',
        description: 'Id da categoria que será deletada.',
    })
    remove(@Param('id') id: string) {
        return this.categoriesService.remove(id);
    }
}
