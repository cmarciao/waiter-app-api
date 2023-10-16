import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';

@Injectable()
export class CategoriesRepository {
    constructor(private readonly prismaService: PrismaService) {}

    create(createCategoryDto: Prisma.CategoryCreateArgs) {
        return this.prismaService.category.create(createCategoryDto);
    }

    findByName(name: string) {
        return this.prismaService.category.findUnique({
            where: {
                name,
            },
        });
    }
}
