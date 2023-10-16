import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma.service';
import { UpdateCategoryDto } from 'src/modules/categories/dto/update-category.dto';
import { CreateCategoryDto } from 'src/modules/categories/dto/create-category.dto';

@Injectable()
export class CategoriesRepository {
    constructor(private readonly prismaService: PrismaService) {}

    create(createCategoryDto: CreateCategoryDto) {
        return this.prismaService.category.create({
            data: createCategoryDto,
        });
    }

    findAll() {
        return this.prismaService.category.findMany();
    }

    findById(id: string) {
        return this.prismaService.category.findUnique({
            where: {
                id,
            },
        });
    }

    findByName(name: string) {
        return this.prismaService.category.findUnique({
            where: {
                name,
            },
        });
    }

    update(id: string, updateCategoryDto: UpdateCategoryDto) {
        return this.prismaService.category.update({
            data: updateCategoryDto,
            where: {
                id,
            },
        });
    }

    remove(id: string) {
        return this.prismaService.category.delete({
            where: {
                id,
            },
        });
    }
}
