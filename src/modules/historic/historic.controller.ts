import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    UseGuards,
} from '@nestjs/common';

import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserType } from '../users/entities/enums/user-type';
import { RoleGuard } from 'src/shared/guards/role.guard';

import { HistoricService } from './historic.service';

@Controller('historic')
export class HistoricController {
    constructor(private readonly historicService: HistoricService) {}

    @Get()
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    findAll() {
        return this.historicService.findAll();
    }

    @Post()
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    create() {
        return this.historicService.create();
    }

    @Delete(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    remove(@Param('id') id: string) {
        return this.historicService.remove(id);
    }
}
