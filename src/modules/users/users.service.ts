import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { hash } from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { MeUpdateUserDto } from './dto/me-update.dto';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {
        /** Do nothing */
    }

    async create({ name, email, password, type }: CreateUserDto) {
        const emailFound = await this.usersRepository.findByEmail(email);

        if (emailFound) {
            throw new ConflictException('This email is already in use.');
        }

        const hashedPassword = await hash(password, 12);

        const user = await this.usersRepository.create({
            data: {
                name,
                email,
                password: hashedPassword,
                type,
            },
        });

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            type: user.type,
        };
    }

    async findAll() {
        const usersList = await this.usersRepository.findAll();
        const users = usersList.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            type: user.type,
        }));

        return users;
    }

    async findOne(id: string) {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new NotFoundException('User not found.');
        }

        return user;
    }

    async update(
        activeUserId: string,
        updateUserid: string,
        updateUserDto: UpdateUserDto,
    ) {
        const userFound = await this.usersRepository.findById(updateUserid);

        if (!userFound) {
            throw new NotFoundException('User not found.');
        }

        if (
            userFound.id === activeUserId &&
            userFound.type !== updateUserDto.type
        ) {
            throw new BadRequestException(
                'You can not change your own type user.',
            );
        }

        const hashedPassword = updateUserDto.password
            ? await hash(updateUserDto.password, 12)
            : userFound.password;

        const newUser = {
            ...userFound,
            ...updateUserDto,
            password: hashedPassword,
        };

        const updatedUser = await this.usersRepository.update(
            updateUserid,
            newUser,
        );

        return {
            id: updatedUser.id,
            name: updatedUser.name,
            emai: updatedUser.email,
            type: updatedUser.type,
        };
    }

    async meUpdate(id: string, meUpdateUserDto: MeUpdateUserDto) {
        const userFound = await this.usersRepository.findByEmail(
            meUpdateUserDto.email,
        );

        if (!userFound) {
            throw new NotFoundException('User not found.');
        }

        const hashedPassword = meUpdateUserDto.password
            ? await hash(meUpdateUserDto.password, 12)
            : userFound.password;

        const newUser = {
            ...userFound,
            ...meUpdateUserDto,
            password: hashedPassword,
        };

        const updatedUser = await this.usersRepository.update(id, newUser);

        return {
            name: updatedUser.name,
            emai: updatedUser.email,
        };
    }

    async remove(id: string) {
        const userFound = await this.usersRepository.findById(id);

        if (!userFound) {
            throw new NotFoundException('User not found.');
        }

        await this.usersRepository.remove(id);

        return null;
    }
}
