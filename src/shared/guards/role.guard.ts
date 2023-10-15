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
    constructor(private readonly reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<UserType[]>(
            ROLES_KEY,
            [context.getClass(), context.getHandler()],
        );

        if (!requiredRoles) {
            return true;
        }

        const { user } = context.switchToHttp().getRequest();
        const filteredRoles = requiredRoles.filter(
            (role) => role === user.type,
        );

        if (filteredRoles.length === 0) {
            throw new UnauthorizedException('You do not have permission.');
        }

        return true;
    }
}
