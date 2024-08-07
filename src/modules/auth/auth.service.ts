import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { SignInDto } from './dto/sign-in';
import { RefreshTokenDTO } from './dto/refresh-token';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';
import { RefreshTokenRepository } from 'src/shared/database/repositories/refresh-token.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersRepository: UsersRepository,
        private readonly refreshTokenRepository: RefreshTokenRepository,
    ) {
        /** Do nothing */
    }

    async signIn({ email, password }: SignInDto) {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Email ou senha inválido.');
        }

        const isValidPassword = await compare(password, user.password);

        if (!isValidPassword) {
            throw new UnauthorizedException('Email ou senha inválido.');
        }

        const accessToken = await this.generateAccessToken({
            sub: user.id,
            type: user.type,
        });

        const refreshToken = await this.generateRefreshToken(user.id);

        return {
            accessToken,
            refreshToken,
        };
    }

    async refreshToken({ id }: RefreshTokenDTO) {
        const refreshToken = await this.refreshTokenRepository.find(id);

        if (!refreshToken) {
            throw new UnauthorizedException('Token de atualização expirado.');
        }

        if (Date.now() > refreshToken.expiresAt.getTime()) {
            await this.refreshTokenRepository.remove(id);

            throw new UnauthorizedException('Token de atualização expirado.');
        }

        const user = await this.usersRepository.findById(refreshToken.userId);

        await this.refreshTokenRepository.remove(refreshToken.id);

        const refreshTokenId = await this.generateRefreshToken(
            refreshToken.userId,
        );

        const accessToken = await this.generateAccessToken({
            sub: user.id,
            type: user.type,
        });

        return {
            accessToken,
            refreshToken: refreshTokenId,
        };
    }

    private generateAccessToken(payload: object | Buffer) {
        return this.jwtService.signAsync(payload, {
            expiresIn: '7d',
        });
    }

    private async generateRefreshToken(userId: string) {
        const EXP_TIME_IN_DAYS = 10;

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + EXP_TIME_IN_DAYS);

        const { id } = await this.refreshTokenRepository.create({
            userId,
            expiresAt,
        });

        return id;
    }
}
