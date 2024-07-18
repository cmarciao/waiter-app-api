import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from 'src/shared/database/repositories/notifications.repository';
import { CreateNotificationDto } from './dto/create-notification-dto';

@Injectable()
export class NotificationsService {
    constructor(
        private readonly notificationsRepository: NotificationsRepository,
    ) {}

    create(createNotificationDto: CreateNotificationDto) {
        return this.notificationsRepository.create(createNotificationDto);
    }

    async hasNotifications(userId: string) {
        const notifications =
            await this.notificationsRepository.hasNewNotification(userId);

        return {
            hasNotifications: !!notifications,
        };
    }

    markAsNotShow() {
        return this.notificationsRepository.markAsNotShow();
    }

    markAsRead(userId: string) {
        return this.notificationsRepository.markAsRead(userId);
    }

    findAll(userId: string) {
        return this.notificationsRepository.findAll(userId);
    }
}
