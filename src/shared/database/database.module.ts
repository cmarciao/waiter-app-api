import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repository';
import { CategoriesRepository } from './repositories/categories.repository';
import { IngredientsRepository } from './repositories/ingredients.repository';

@Global()
@Module({
    providers: [
        PrismaService,
        UsersRepository,
        CategoriesRepository,
        IngredientsRepository,
    ],
    exports: [UsersRepository, CategoriesRepository, IngredientsRepository],
})
export class DatabaseModule {}
