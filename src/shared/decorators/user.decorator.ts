import {
    ExecutionContext,
    UnauthorizedException,
    createParamDecorator,
} from '@nestjs/common';

export const User = createParamDecorator<string>(
    (data, context: ExecutionContext) => {
        const { user } = context.switchToHttp().getRequest();

        if (!user) {
            throw new UnauthorizedException();
        }

        return user[data];
    },
);
