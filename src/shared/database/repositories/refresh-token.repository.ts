import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

type CreateRefreshTokenDTO = {
    userId: string;
    expiresAt: Date;
};

@Injectable()
export class RefreshTokenRepository {
    constructor(private readonly prismaService: PrismaService) {}

    create({ userId, expiresAt }: CreateRefreshTokenDTO) {
        return this.prismaService.refreshToken.create({
            data: {
                userId,
                expiresAt,
            },
        });
    }

    find(id: string) {
        return this.prismaService.refreshToken.findUnique({
            where: {
                id,
            },
        });
    }

    remove(id: string) {
        return this.prismaService.refreshToken.delete({
            where: {
                id,
            },
        });
    }
}
