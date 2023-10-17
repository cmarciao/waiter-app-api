import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { CreateIngredientDto } from 'src/modules/ingredients/dto/create-ingredient.dto';

@Injectable()
export class IngredientsRepository {
    constructor(private readonly prismaService: PrismaService) {}

    create(createIngredientDto: CreateIngredientDto) {
        return this.prismaService.ingredient.create({
            data: createIngredientDto,
        });
    }

    findByName(name: string) {
        return this.prismaService.ingredient.findUnique({
            where: {
                name,
            },
        });
    }
}
