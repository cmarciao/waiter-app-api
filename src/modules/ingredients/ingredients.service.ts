import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { IngredientsRepository } from 'src/shared/database/repositories/ingredients.repository';
import { UpdateIngredientDto } from './dto/update-ingredient.dto';

@Injectable()
export class IngredientsService {
    constructor(
        private readonly ingredientsRepository: IngredientsRepository,
    ) {}

    async create({ emoji, name }: CreateIngredientDto) {
        const ingredientFound =
            await this.ingredientsRepository.findByName(name);

        if (ingredientFound) {
            throw new ConflictException('O ingrediente já está em uso.');
        }

        const ingredient = await this.ingredientsRepository.create({
            emoji,
            name,
        });

        return ingredient;
    }

    async findAll(name: string) {
        const ingredients = await this.ingredientsRepository.findAll(name);
        return ingredients;
    }

    async findOne(id: string) {
        const ingredientFound = await this.ingredientsRepository.findById(id);

        if (!ingredientFound) {
            throw new NotFoundException('Ingrediente não encontrado.');
        }

        return ingredientFound;
    }

    async update(id: string, updateIngredientDto: UpdateIngredientDto) {
        const ingredientFound = await this.ingredientsRepository.findById(id);

        if (!ingredientFound) {
            throw new NotFoundException('Ingrediente não encontrado.');
        }

        const newIngredient = {
            ...ingredientFound,
            ...updateIngredientDto,
        };

        const updatedIngredient = await this.ingredientsRepository.update(
            id,
            newIngredient,
        );

        return updatedIngredient;
    }

    async remove(id: string) {
        const ingredientFound = await this.ingredientsRepository.findById(id);

        if (!ingredientFound) {
            throw new NotFoundException('Ingrediente não encontrado.');
        }

        await this.ingredientsRepository.remove(id);

        return null;
    }
}
