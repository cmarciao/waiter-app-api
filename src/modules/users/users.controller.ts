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
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';

import { RoleGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserType } from './entities/enums/user-type';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';
import { MeUpdateUserDto } from './dto/me-update.dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {
        /** Do nothing */
    }

    @Get('me')
    async me(@Req() request: Request) {
        const { sub: id } = request['token'];
        const { name, email } = await this.usersService.findOne(id);

        return {
            name,
            email,
        };
    }

    @Put('/me')
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
    findAll(@Req() request: Request) {
        const { sub: id } = request['token'];
        return this.usersService.findAll(id);
    }

    @Get(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Post()
    // @UseGuards(RoleGuard)
    // @Roles(UserType.ADMIN)
    @IsPublic()
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Put(':id')
    @UseGuards(RoleGuard)
    @Roles('ADMIN')
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
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
