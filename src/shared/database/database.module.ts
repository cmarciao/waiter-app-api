import { Global, Module } from '@nestjs/common';

import { PrismaService } from './prisma.service';
import { UsersRepository } from './repositories/users.repository';
import { CategoriesRepository } from './repositories/categories.repository';
import { IngredientsRepository } from './repositories/ingredients.repository';
import { ProductsRepository } from './repositories/products.repository';
import { OrdersRepository } from './repositories/orders.repository';
import { RefreshTokenRepository } from './repositories/refresh-token.repository';

@Global()
@Module({
    providers: [
        PrismaService,
        UsersRepository,
        CategoriesRepository,
        IngredientsRepository,
        ProductsRepository,
        OrdersRepository,
        RefreshTokenRepository,
    ],
    exports: [
        UsersRepository,
        CategoriesRepository,
        IngredientsRepository,
        ProductsRepository,
        OrdersRepository,
        RefreshTokenRepository,
    ],
})
export class DatabaseModule {}
