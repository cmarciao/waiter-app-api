import {
    Controller,
    Post,
    Body,
    UseGuards,
    Put,
    Param,
    Get,
} from '@nestjs/common';

import { RoleGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserType } from '../users/entities/enums/UserType';

import { IngredientsService } from './ingredients.service';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Controller('ingredients')
export class IngredientsController {
    constructor(private readonly ingredientsService: IngredientsService) {}

    @Get()
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    findAll() {
        return this.ingredientsService.findAll();
    }

    @Post()
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    create(@Body() createIngredientDto: CreateIngredientDto) {
        return this.ingredientsService.create(createIngredientDto);
    }

    @Put(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    update(
        @Param('id') id: string,
        @Body() updateIngredientDto: UpdateIngredientDto,
    ) {
        return this.ingredientsService.update(id, updateIngredientDto);
    }
}
