import { SetMetadata } from '@nestjs/common';
import { UserType } from '@prisma/client';

export const ROLES_KEY = 'ROLES';
export const Roles = (...roles: UserType[]) => SetMetadata(ROLES_KEY, roles);
