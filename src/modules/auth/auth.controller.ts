import { Body, Controller, Post, Headers, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

import { SignInDto } from './dto/sign-in';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';
import { RefreshTokenDTO } from './dto/refresh-token';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @IsPublic()
    @Post('signin')
    signIn(@Headers() headers, @Body() signInDto: SignInDto) {
        const userAgent = headers['user-agent'];

        const isLoginFromWeb =
            !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                userAgent,
            );

        return this.authService.signIn(signInDto, isLoginFromWeb);
    }

    @IsPublic()
    @Post('refresh-token')
    refreshToken(@Body() refreshToken: RefreshTokenDTO) {
        return this.authService.refreshToken(refreshToken);
    }

    @Get('is-access-token-valid')
    isAccessTokenValid() {
        return {
            ok: true,
        };
    }
}
