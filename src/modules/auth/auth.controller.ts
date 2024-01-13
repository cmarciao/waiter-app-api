import { Body, Controller, Post, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

import { SignInDto } from './dto/sign-in';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @IsPublic()
    @Post('signin')
    signIn(@Headers() headers, @Body() signInDto: SignInDto) {
        const userAgent = headers['user-agent'];

        const isMobile =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                userAgent,
            );

        return this.authService.signIn(signInDto, isMobile);
    }
}
