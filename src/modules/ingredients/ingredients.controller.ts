import { Controller, Post, Body, UseGuards } from '@nestjs/common';

import { RoleGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { CreateIngredientDto } from './dto/create-ingredient.dto';

import { IngredientsService } from './ingredients.service';
import { UserType } from '../users/entities/enums/UserType';

@Controller('ingredients')
export class IngredientsController {
    constructor(private readonly ingredientsService: IngredientsService) {}

    @Post()
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    create(@Body() createIngredientDto: CreateIngredientDto) {
        return this.ingredientsService.create(createIngredientDto);
    }
}
