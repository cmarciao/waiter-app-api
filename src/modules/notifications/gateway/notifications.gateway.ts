import {
    MessageBody,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Notification } from '@prisma/client';
import { Server } from 'socket.io';
import { NotificationsService } from '../notifications.service';

@WebSocketGateway(80)
export class NotificationsGateway implements OnGatewayInit {
    @WebSocketServer() server: Server;

    constructor(private readonly notificationService: NotificationsService) {}

    afterInit() {
        console.log('WebSocket Gateway initialized');
    }

    @SubscribeMessage('notifications@read')
    handleOrdersUpdate(@MessageBody() userId: string) {
        this.notificationService.markAsRead(userId);
    }

    handleSendNotification(path: string, notification?: Notification): void {
        this.server.emit(path, notification);
    }
}
