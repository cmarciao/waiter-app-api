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
            throw new ConflictException('This ingredient already in use.');
        }

        const ingredient = await this.ingredientsRepository.create({
            emoji,
            name,
        });

        return ingredient;
    }

    async update(id: string, updateIngredientDto: UpdateIngredientDto) {
        const ingredientFound = await this.ingredientsRepository.findById(id);

        if (!ingredientFound) {
            throw new NotFoundException('Ingredient not found.');
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
}
