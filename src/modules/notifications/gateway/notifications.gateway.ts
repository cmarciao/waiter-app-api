import {
    OnGatewayInit,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Notification } from '@prisma/client';

@WebSocketGateway(80)
export class NotificationsGateway implements OnGatewayInit {
    @WebSocketServer() server: Server;

    afterInit() {
        console.log('WebSocket Gateway initialized');
    }

    // @SubscribeMessage('orders@update')
    // handleOrdersUpdate(@MessageBody() data: unknown) {
    //     console.log(data);
    // }

    handleSendNotification(path: string, notification: Notification): void {
        this.server.emit(path, notification);
    }
}
