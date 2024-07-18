import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateNotificationDto } from 'src/modules/notifications/dto/create-notification-dto';

@Injectable()
export class NotificationsRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createNotification: CreateNotificationDto) {
        const createdNotification =
            await this.prismaService.notification.create({
                data: createNotification,
            });

        const users = await this.prismaService.user.findMany({
            where: {
                type: 'WAITER',
            },
        });

        const queries = users.map((user) =>
            this.prismaService.notificationToUsers.create({
                data: {
                    userId: user.id,
                    notificationId: createdNotification.id,
                },
            }),
        );

        await Promise.all(queries);

        return createdNotification;
    }

    markAsNotShow() {
        return this.prismaService.notificationToUsers.updateMany({
            data: {
                read: true,
                show: false,
            },
            where: {
                show: true,
            },
        });
    }

    markAsRead(userId: string) {
        return this.prismaService.notificationToUsers.updateMany({
            data: {
                read: true,
            },
            where: {
                userId: userId,
                read: false,
            },
        });
    }

    hasNewNotification(userId: string) {
        return this.prismaService.notificationToUsers.findFirst({
            where: {
                userId,
                read: false,
            },
        });
    }

    async findAll(userId: string) {
        const notifications =
            await this.prismaService.notificationToUsers.findMany({
                where: {
                    userId,
                    show: true,
                },
                orderBy: {
                    notification: {
                        createdAt: 'desc',
                    },
                },
                include: {
                    notification: true,
                },
            });

        return notifications.map((notification) => ({
            id: notification.notification.id,
            table: notification.notification.table,
            orderState: notification.notification.orderState,
            createdAt: notification.notification.createdAt,
            show: notification.show,
            read: notification.read,
        }));
    }
}
