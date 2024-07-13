import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationsGateway } from '../notifications/gateway/notifications.gateway';

@Module({
    controllers: [OrdersController],
    providers: [OrdersService, NotificationsService, NotificationsGateway],
})
export class OrdersModule {}
