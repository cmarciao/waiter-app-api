import { ConflictException, Injectable } from '@nestjs/common';
import { CreateIngredientDto } from './dto/create-ingredient.dto';
import { IngredientsRepository } from 'src/shared/database/repositories/ingredients.repository';

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
}
