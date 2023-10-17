import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repository';
import { CategoriesRepository } from './repositories/categories.repository';
import { IngredientsRepository } from './repositories/ingredients.repository';
import { ProductsRepository } from './repositories/products.repository';

@Global()
@Module({
    providers: [
        PrismaService,
        UsersRepository,
        CategoriesRepository,
        IngredientsRepository,
        ProductsRepository,
    ],
    exports: [
        UsersRepository,
        CategoriesRepository,
        IngredientsRepository,
        ProductsRepository,
    ],
})
export class DatabaseModule {}
