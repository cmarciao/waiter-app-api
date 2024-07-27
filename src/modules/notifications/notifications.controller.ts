import { Controller, Get, Patch, Req } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @Get()
    findAll(@Req() request: Request) {
        const { sub: id } = request['token'];
        return this.notificationsService.findAll(id);
    }

    @Get('has-notifications')
    hasNotifications(@Req() request: Request) {
        const { sub: id } = request['token'];
        return this.notificationsService.hasNotifications(id);
    }

    @Patch('read')
    read(@Req() request: Request) {
        const { sub: id } = request['token'];
        return this.notificationsService.markAsRead(id);
    }
}
