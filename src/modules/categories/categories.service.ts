import { ConflictException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repository';

@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepository: CategoriesRepository) {}

    async create({ emoji, name }: CreateCategoryDto) {
        const categoryFound = await this.categoriesRepository.findByName(name);

        if (categoryFound) {
            throw new ConflictException('This category already in use.');
        }

        const category = await this.categoriesRepository.create({
            data: {
                emoji,
                name,
            },
        });

        return category;
    }
}
