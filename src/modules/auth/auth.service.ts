import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { SignInDto } from './dto/sign-in';
import { UsersRepository } from 'src/shared/database/repositories/users.repositories';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersRepository: UsersRepository,
    ) {}

    async signIn({ email, password }: SignInDto) {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        const isValidPassword = await compare(password, user.password);

        if (!isValidPassword) {
            throw new UnauthorizedException('Invalid credentials.');
        }

        const accessToken = await this.jwtService.signAsync({ sub: user.id });

        return { accessToken };
    }
}
