import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma.service';
import { UpdateCategoryDto } from 'src/modules/categories/dto/update-category.dto';

@Injectable()
export class UsersRepository {
    constructor(private readonly prismaService: PrismaService) {}

    create(createUserDto: Prisma.UserCreateArgs) {
        return this.prismaService.user.create(createUserDto);
    }

    findById(id: string) {
        return this.prismaService.user.findUnique({
            where: {
                id,
            },
        });
    }

    findByEmail(email: string) {
        return this.prismaService.user.findUnique({
            where: {
                email,
            },
        });
    }

    update(id: string, updateUserDto: UpdateCategoryDto) {
        return this.prismaService.user.update({
            data: updateUserDto,
            where: {
                id,
            },
        });
    }

    remove(id: string) {
        return this.prismaService.user.delete({
            where: {
                id,
            },
        });
    }
}
