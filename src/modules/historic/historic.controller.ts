import {
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';

import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserType } from '../users/entities/enums/user-type';
import { RoleGuard } from 'src/shared/guards/role.guard';

import { SortOrder } from './entities/enums/sort-order';
import { HistoricService } from './historic.service';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiOkResponse,
    ApiParam,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponse } from 'src/shared/types/ErrorResponse';
import { HistoricResponseDto } from './dto/historic-response.dto';

@ApiTags('historic')
@ApiBearerAuth()
@ApiUnauthorizedResponse({
    description: 'Usuário não autenticado.',
    type: ErrorResponse,
})
@Controller('historic')
export class HistoricController {
    constructor(private readonly historicService: HistoricService) {}

    @Get()
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    @ApiOkResponse({
        isArray: true,
        type: HistoricResponseDto,
        description: 'Lista de todos os pedidos já finalizados.',
    })
    findAll(@Query('orderBy') orderBy = SortOrder.DESC) {
        return this.historicService.findAll(orderBy);
    }

    @Post()
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    @ApiOkResponse({
        description: 'Pedidos colocados em histórico com sucesso.',
    })
    @ApiBadRequestResponse({
        description: 'Não há pedidos para colocar em histórico.',
    })
    create() {
        return this.historicService.create();
    }

    @Delete(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    @ApiOkResponse({
        description: 'Pedido em histórico deletado com sucesso.',
    })
    @ApiParam({
        name: 'id',
        description: 'Id do pedido em histórico que será deletado.',
    })
    remove(@Param('id') id: string) {
        return this.historicService.remove(id);
    }
}
