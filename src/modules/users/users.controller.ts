import { Controller, Post, Put, Body, UseGuards, Param } from '@nestjs/common';

import { RoleGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserType } from './entities/enums/UserType';
import { User } from 'src/shared/decorators/user.decorator';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @Put(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    update(
        @User('id') activeUserId: string,
        @Param('id') updateUserid: string,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return this.usersService.update(
            activeUserId,
            updateUserid,
            updateUserDto,
        );
    }
}
