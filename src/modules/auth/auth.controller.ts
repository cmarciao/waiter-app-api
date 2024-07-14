import {
    Body,
    Controller,
    Post,
    Headers,
    Get,
    BadRequestException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

import { SignInDto } from './dto/sign-in';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';
import { RefreshTokenDTO } from './dto/refresh-token';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
        /** Do nothing */
    }

    @IsPublic()
    @Post('signin')
    signIn(@Headers() headers, @Body() signInDto: SignInDto) {
        const userAgent = headers['user-agent'];

        if (userAgent !== 'web' && userAgent !== 'mobile') {
            throw new BadRequestException('The user agent is missing.');
        }

        const isLoginFromWeb = userAgent === 'web';

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
