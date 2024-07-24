import {
    Controller,
    Post,
    Body,
    UseGuards,
    Put,
    Param,
    Get,
    Delete,
    Query,
} from '@nestjs/common';

import { RoleGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserType } from '../users/entities/enums/user-type';

import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';
import {
    ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiQuery,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from 'src/shared/types/ErrorResponse';
import { IngredientResponseDto } from './dto/ingredient-response.dto';

@ApiTags('ingredients')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    description: 'Usuário não autenticado.',
    type: ErrorResponse,
})
@Controller('ingredients')
export class IngredientsController {
    constructor(private readonly ingredientsService: IngredientsService) {}

    @Get()
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    @ApiOkResponse({
        description: 'Lista de todas os ingredients',
        type: IngredientResponseDto,
        isArray: true,
    })
    @ApiQuery({
        name: 'name',
        description: 'Nome do ingrediente a ser pesquisado.',
        required: false,
    })
    findAll(@Query('name') name: string) {
        return this.ingredientsService.findAll(name);
    }

    @Get(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    @ApiOkResponse({
        description: 'A categoria pesquisada.',
        type: IngredientResponseDto,
        isArray: true,
    })
    @ApiParam({
        name: 'id',
        description: 'Id do ingrediente que será pesquisado.',
    })
    @ApiNotFoundResponse({
        description: 'Ingredient não encontrado.',
        type: ErrorResponse,
    })
    findOne(@Param('id') id: string) {
        return this.ingredientsService.findOne(id);
    }

    @Post()
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    @ApiCreatedResponse({
        description: 'O ingrediente criado.',
        type: IngredientResponseDto,
    })
    @ApiConflictResponse({
        description: 'O ingrediente já está em uso.',
        type: ErrorResponse,
    })
    create(@Body() createIngredientDto: CreateIngredientDto) {
        return this.ingredientsService.create(createIngredientDto);
    }

    @Put(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    @ApiParam({
        name: 'id',
        description: 'Id do ingrediente que será atualizado.',
    })
    @ApiOkResponse({
        description: 'O ingrediente atualizado.',
        type: IngredientResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Ingrediente não encontrado.',
        type: ErrorResponse,
    })
    update(
        @Param('id') id: string,
        @Body() updateIngredientDto: UpdateIngredientDto,
    ) {
        return this.ingredientsService.update(id, updateIngredientDto);
    }

    @Delete(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    @ApiOkResponse({
        description: 'Ingrediente deletado com sucesso.',
    })
    @ApiParam({
        name: 'id',
        description: 'Id do ingrediente que será deletado.',
    })
    remove(@Param('id') id: string) {
        return this.ingredientsService.remove(id);
    }
}
