import { Controller, Get, Patch, Req } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import {
    ApiBearerAuth,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from 'src/shared/types/ErrorResponse';
import { NotificationResponseDto } from './dto/notification-response.dto';

@ApiTags('notifications')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    description: 'Usuário não autenticado.',
    type: ErrorResponse,
})
@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @Get()
    @ApiOkResponse({
        isArray: true,
        type: NotificationResponseDto,
        description: 'Lista de todas as notificações.',
    })
    findAll(@Req() request: Request) {
        const { sub: id } = request['token'];
        return this.notificationsService.findAll(id);
    }

    @Get('has-notifications')
    @ApiOkResponse({
        type: Boolean,
        description: 'Se há novas notificações.',
    })
    hasNotifications(@Req() request: Request) {
        const { sub: id } = request['token'];
        return this.notificationsService.hasNotifications(id);
    }

    @Patch('read')
    @ApiOkResponse({
        description:
            'Atualizar todas as notificações de um usuário como lidas.',
    })
    read(@Req() request: Request) {
        const { sub: id } = request['token'];
        return this.notificationsService.markAsRead(id);
    }
}
