import {
    Controller,
    Post,
    Put,
    Body,
    UseGuards,
    Param,
    Delete,
    Get,
    Req,
    BadRequestException,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Request } from 'express';

import { RoleGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserType } from './entities/enums/user-type';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';
import { MeUpdateUserDto } from './dto/me-update.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { ErrorResponse } from 'src/shared/types/ErrorResponse';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
        /** Do nothing */
    }

    @Get('me')
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'Usuário não autenticado.',
        type: ErrorResponse,
    })
    @ApiOkResponse({
        description: 'As informações da sua conta.',
        type: MeUpdateUserDto,
    })
    @ApiNotFoundResponse({
        description: 'Usuário não econtraodo.',
        type: ErrorResponse,
    })
    async me(@Req() request: Request) {
        const { sub: id } = request['token'];
        const { name, email } = await this.usersService.findOne(id);

        return {
            name,
            email,
        };
    }

    @Put('/me')
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'Usuário não autenticado.',
        type: ErrorResponse,
    })
    @ApiOkResponse({
        description: 'As informações da sua conta atualizadas.',
        type: MeUpdateUserDto,
    })
    @ApiNotFoundResponse({
        description: 'Usuário não econtraodo.',
        type: ErrorResponse,
    })
    async meUpdate(
        @Req() request: Request,
        @Body() meUpdateUserDto: MeUpdateUserDto,
    ) {
        const { sub: id } = request['token'];

        return this.usersService.meUpdate(id, meUpdateUserDto);
    }

    @Get()
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'Usuário não autenticado.',
        type: ErrorResponse,
    })
    @ApiOkResponse({
        isArray: true,
        type: UserResponseDto,
        description: 'Lista de todos os usuários.',
    })
    findAll(@Req() request: Request) {
        const { sub: id } = request['token'];
        return this.usersService.findAll(id);
    }

    @Get(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'Usuário não autenticado.',
        type: ErrorResponse,
    })
    @ApiParam({
        name: 'id',
        description: 'Id do usuário que será pesquisado.',
    })
    @ApiOkResponse({
        description: 'O usuário pesquisado.',
        type: UserResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Usuário não encontrado',
        type: ErrorResponse,
    })
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Post()
    // @UseGuards(RoleGuard)
    // @Roles(UserType.ADMIN)
    @IsPublic()
    @ApiCreatedResponse({
        description: 'O usuário criado.',
        type: UserResponseDto,
    })
    @ApiConflictResponse({
        description: 'O email já está em uso.',
        type: ErrorResponse,
    })
    create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        return this.usersService.create(createUserDto);
    }

    @Put(':id')
    @UseGuards(RoleGuard)
    @Roles('ADMIN')
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'Usuário não autenticado.',
        type: ErrorResponse,
    })
    @ApiParam({
        name: 'id',
        description: 'Id do usuário que será atualizado.',
    })
    @ApiOkResponse({
        description: 'O usuário atualizado.',
        type: UserResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'Usuário não encontrado.',
        type: ErrorResponse,
    })
    @ApiBadRequestResponse({
        description: 'Você não pode mudar o seu próprio tipo de usuário.',
        type: ErrorResponse,
    })
    update(
        @Req() request: Request,
        @Param('id') updateUserid: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        const { sub: activeUserId, ...token } = request['token'];

        if (
            activeUserId === updateUserid &&
            updateUserDto.type &&
            updateUserDto?.type !== token.type
        ) {
            throw new BadRequestException(
                'Você não pode mudar o seu próprio tipo de usuário.',
            );
        }

        return this.usersService.update(updateUserid, updateUserDto);
    }

    @Delete(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    @ApiBearerAuth()
    @ApiUnauthorizedResponse({
        description: 'Usuário não autenticado.',
        type: ErrorResponse,
    })
    @ApiParam({
        name: 'id',
        description: 'Id do usuário que será deletado.',
    })
    remove(@Req() request: Request, @Param('id') id: string) {
        const { sub: activeUserId } = request['token'];

        if (activeUserId === id) {
            throw new BadRequestException(
                'Você não pode remover seu próprio usuário.',
            );
        }

        return this.usersService.remove(id);
    }
}
