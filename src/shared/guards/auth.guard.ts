import {
    CanActivate,
    ExecutionContext,
    Injectable,
    // NotFoundException,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

import { env } from 'src/shared/config/env';
import { IS_PUBLIC_KEY } from 'src/shared/decorators/is-public.decorator';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private readonly reflactor: Reflector,
        private readonly jwtService: JwtService,
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

            request['token'] = payload;
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
