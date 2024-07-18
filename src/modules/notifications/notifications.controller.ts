import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @Get()
    @UseGuards(RoleGuard)
    @Roles('ADMIN', 'WAITER')
    findAll(@Req() request: Request) {
        const { sub: id } = request['token'];
        return this.notificationsService.findAll(id);
    }

    @Get('has-notifications')
    @UseGuards(RoleGuard)
    @Roles('ADMIN', 'WAITER')
    hasNotifications(@Req() request: Request) {
        const { sub: id } = request['token'];
        return this.notificationsService.hasNotifications(id);
    }

    @Post('read')
    @UseGuards(RoleGuard)
    @Roles('ADMIN', 'WAITER')
    read(@Req() request: Request) {
        const { sub: id } = request['token'];
        return this.notificationsService.markAsRead(id);
    }
}
