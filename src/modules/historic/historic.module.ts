import { Module } from '@nestjs/common';
import { HistoricService } from './historic.service';
import { HistoricController } from './historic.controller';
import { NotificationsService } from '../notifications/notifications.service';
import { NotificationsGateway } from '../notifications/gateway/notifications.gateway';

@Module({
    controllers: [HistoricController],
    providers: [HistoricService, NotificationsService, NotificationsGateway],
})
export class HistoricModule {}
