import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';

import { SignInDto } from './dto/sign-in';
import { UsersRepository } from 'src/shared/database/repositories/users.repository';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly usersRepository: UsersRepository,
    ) {}

    async signIn({ email, password }: SignInDto, isLoginFromMobile: boolean) {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException('Invalid e-mail or password.');
        }

        const isValidPassword = await compare(password, user.password);

        if (!isValidPassword) {
            throw new UnauthorizedException('Invalid e-mail or password.');
        }

        if (!isLoginFromMobile) {
            if (user.type !== 'ADMIN') {
                throw new UnauthorizedException(
                    'You do not have permission to log in dashboard.',
                );
            }
        }

        const accessToken = await this.jwtService.signAsync({
            sub: user.id,
            type: user.type,
        });

        return { accessToken };
    }
}
