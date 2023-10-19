import {
    Controller,
    Post,
    Put,
    Body,
    UseGuards,
    Param,
    Delete,
    Get,
} from '@nestjs/common';

import { RoleGuard } from 'src/shared/guards/role.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { UserType } from './entities/enums/user-type';
import { User } from 'src/shared/decorators/user.decorator';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    findAll() {
        return this.usersService.findAll();
    }

    @Get(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

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

    @Delete(':id')
    @UseGuards(RoleGuard)
    @Roles(UserType.ADMIN)
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
