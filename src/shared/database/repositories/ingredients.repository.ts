import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { CreateIngredientDto } from 'src/modules/ingredients/dto/create-ingredient.dto';
import { UpdateIngredientDto } from 'src/modules/ingredients/dto/update-ingredient.dto';

@Injectable()
export class IngredientsRepository {
    constructor(private readonly prismaService: PrismaService) {}

    create(createIngredientDto: CreateIngredientDto) {
        return this.prismaService.ingredient.create({
            data: createIngredientDto,
        });
    }

    findAll(name: string) {
        return this.prismaService.ingredient.findMany({
            where: {
                name: {
                    contains: name.toLocaleLowerCase(),
                    mode: 'insensitive',
                },
            },
        });
    }

    findById(id: string) {
        return this.prismaService.ingredient.findUnique({
            where: {
                id,
            },
        });
    }

    findByName(name: string) {
        return this.prismaService.ingredient.findUnique({
            where: {
                name,
            },
        });
    }

    update(id: string, updateIngredientDto: UpdateIngredientDto) {
        return this.prismaService.ingredient.update({
            data: updateIngredientDto,
            where: {
                id,
            },
        });
    }

    remove(id: string) {
        return this.prismaService.ingredient.delete({
            where: {
                id,
            },
        });
    }
}
