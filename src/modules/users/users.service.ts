import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository) {}

    async create({ name, email, type, password }: CreateUserDto) {
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
}
