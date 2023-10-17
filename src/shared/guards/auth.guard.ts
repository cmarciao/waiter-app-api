import {
    CanActivate,
    ExecutionContext,
    Injectable,
    NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { env } from 'src/shared/config/env';
import { IS_PUBLIC_KEY } from 'src/shared/decorators/is-public.decorator';
import { UsersRepository } from '../database/repositories/users.repository';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflactor: Reflector,
        private readonly jwtService: JwtService,
        private readonly usersRepository: UsersRepository,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublicRoute = this.reflactor.getAllAndOverride<boolean>(
            IS_PUBLIC_KEY,
            [context.getClass(), context.getHandler()],
        );

        if (isPublicRoute) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException('Missing authorization token.');
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: env.jwtSecret,
            });

            const user = await this.usersRepository.findById(payload.sub);

            if (!user) {
                throw new NotFoundException('User session not found.');
            }

            request['user'] = user;
        } catch {
            throw new UnauthorizedException('Error in authorization checking.');
        }

        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] =
            request.headers['authorization']?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
