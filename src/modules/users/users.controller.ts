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
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiConflictResponse,
    ApiCreatedResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiParam,
    ApiTags,
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
    @ApiOkResponse({
        description: 'Your account informations.',
        type: MeUpdateUserDto,
    })
    @ApiNotFoundResponse({
        description: 'The user not found.',
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
    @ApiOkResponse({
        description: 'The updated informations.',
        type: MeUpdateUserDto,
    })
    @ApiNotFoundResponse({
        description: 'The user not found.',
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
    @ApiOkResponse({
        isArray: true,
        type: UserResponseDto,
        description: 'List of all the users.',
    })
    findAll(@Req() request: Request) {
        const { sub: id } = request['token'];
        return this.usersService.findAll(id);
    }

    @Get(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    @ApiParam({
        name: 'id',
        description: 'The user id for find.',
    })
    @ApiOkResponse({
        description: 'The user found.',
        type: UserResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'User not found.',
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
        description: 'The created user is returned.',
        type: UserResponseDto,
    })
    @ApiConflictResponse({
        description: 'The user already exists.',
        type: ErrorResponse,
    })
    create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
        return this.usersService.create(createUserDto);
    }

    @Put(':id')
    @UseGuards(RoleGuard)
    @Roles('ADMIN')
    @ApiParam({
        name: 'id',
        description: 'User id for udpate.',
    })
    @ApiOkResponse({
        description: 'The updated user.',
        type: UserResponseDto,
    })
    @ApiNotFoundResponse({
        description: 'The user for update was not found.',
        type: ErrorResponse,
    })
    @ApiBadRequestResponse({
        description: 'The user can not change your own type user.',
        type: ErrorResponse,
    })
    update(
        @Req() request: Request,
        @Param('id') updateUserid: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        const { sub: activeUserId } = request['token'];

        return this.usersService.update(
            activeUserId,
            updateUserid,
            updateUserDto,
        );
    }

    @Delete(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    @ApiParam({
        name: 'id',
        description: 'User id for delete.',
    })
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
