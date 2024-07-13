import 'dotenv/config';

import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { AuthGuard } from './shared/guards/auth.guard';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './shared/database/database.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { IngredientsModule } from './modules/ingredients/ingredients.module';
import { ProductsModule } from './modules/products/products.module';
import { OrdersModule } from './modules/orders/orders.module';
import { HistoricModule } from './modules/historic/historic.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

@Module({
    imports: [
        UsersModule,
        DatabaseModule,
        AuthModule,
        CategoriesModule,
        IngredientsModule,
        ProductsModule,
        OrdersModule,
        HistoricModule,
        NotificationsModule,
    ],
    controllers: [],
    providers: [
        {
            provide: APP_GUARD,
            useClass: AuthGuard,
        },
    ],
})
export class AppModule {}
