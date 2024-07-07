import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserType } from '@prisma/client';

import { ROLES_KEY } from '../decorators/roles.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) {
        /** Do nothing */
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const { token } = context.switchToHttp().getRequest();
        // const userAgent = headers['user-agent'];

        // const isMobile =
        //     /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        //         userAgent,
        //     );

        // if (!isMobile) {
        //     if (token.type !== 'ADMIN') {
        //         throw new UnauthorizedException('You do not have permission.');
        //     }
        // }

        const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
            ROLES_KEY,
            [context.getClass(), context.getHandler()],
        );

        if (!requiredRoles) {
            return true;
        }

        const filteredRoles = requiredRoles.filter(
            (role) => role === token.type,
        );

        if (filteredRoles.length === 0) {
            throw new UnauthorizedException('You do not have permission.');
        }

        return true;
    }
}
