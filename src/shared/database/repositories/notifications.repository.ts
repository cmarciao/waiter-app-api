import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateNotificationDto } from 'src/modules/notifications/dto/create-notification-dto';

@Injectable()
export class NotificationsRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createNotification: CreateNotificationDto) {
        await this.markAsRead(createNotification.table);

        return this.prismaService.notification.create({
            data: createNotification,
        });
    }

    async markAsRead(table: string) {
        const notification = await this.prismaService.notification.findFirst({
            where: {
                table,
                read: false,
            },
        });

        if (notification) {
            await this.prismaService.notification.update({
                data: {
                    read: true,
                },
                where: {
                    id: notification.id,
                    table,
                },
            });
        }
    }

    findAll() {
        return this.prismaService.notification.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
    }
}
