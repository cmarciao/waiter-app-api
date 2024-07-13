import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from 'src/shared/database/repositories/notifications.repository';
import { CreateNotificationDto } from './dto/create-notification-dto';
import { NotificationsGateway } from './gateway/notifications.gateway';

@Injectable()
export class NotificationsService {
    constructor(
        private readonly notificationsRepository: NotificationsRepository,
        private readonly notificationsGateway: NotificationsGateway,
    ) {}

    async create(
        paths: string[],
        createNotificationDto: CreateNotificationDto,
    ) {
        const notification = await this.notificationsRepository.create(
            createNotificationDto,
        );

        paths.forEach((path) => {
            this.notificationsGateway.handleSendNotification(
                path,
                notification,
            );
        });
    }

    async findAll() {
        const all = await this.notificationsRepository.findAll();
        return all;
    }
}
