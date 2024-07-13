import { Controller, Get } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { ApiTags } from '@nestjs/swagger';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';

@ApiTags('notifications')
@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) {}

    @IsPublic()
    @Get()
    findAll() {
        return this.notificationsService.findAll();
    }
}
