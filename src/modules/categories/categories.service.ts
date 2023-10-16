import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoriesRepository } from 'src/shared/database/repositories/categories.repository';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(private readonly categoriesRepository: CategoriesRepository) {}

    async create({ emoji, name }: CreateCategoryDto) {
        const categoryFound = await this.categoriesRepository.findByName(name);

        if (categoryFound) {
            throw new ConflictException('This category already in use.');
        }

        const category = await this.categoriesRepository.create({
            emoji,
            name,
        });

        return category;
    }

    async findAll() {
        const categories = await this.categoriesRepository.findAll();
        return categories;
    }

    async update(id: string, updateCategoryDto: UpdateCategoryDto) {
        const categoryFound = await this.categoriesRepository.findById(id);

        if (!categoryFound) {
            throw new NotFoundException('Category not found.');
        }

        const newCategory = {
            ...categoryFound,
            ...updateCategoryDto,
        };

        const updatedCategory = await this.categoriesRepository.update(
            id,
            newCategory,
        );

        return updatedCategory;
    }

    async remove(id: string) {
        const categoryFound = await this.categoriesRepository.findById(id);

        if (!categoryFound) {
            throw new NotFoundException('Category not found.');
        }

        await this.categoriesRepository.remove(id);

        return null;
    }
}
