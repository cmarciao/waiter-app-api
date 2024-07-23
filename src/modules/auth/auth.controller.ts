import { Body, Controller, Post, Headers, Get } from '@nestjs/common';
import {
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';
import { ErrorResponse } from 'src/shared/types/ErrorResponse';

import { SignInDto } from './dto/sign-in';
import { RefreshTokenDTO } from './dto/refresh-token';
import { SignResponseDto } from './dto/sign-response.dto';
import { IsAccessTokenValidDto } from './dto/is-access-token-valid.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
        /** Do nothing */
    }

    @ApiOkResponse({
        description: 'O token de acesso e de atualização.',
        type: SignResponseDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Email ou senha inválido.',
        type: ErrorResponse,
    })
    @IsPublic()
    @Post('signin')
    signIn(@Headers() headers, @Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }

    @ApiOkResponse({
        description: 'O token de acesso e de atualização.',
        type: SignResponseDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Token de atualização expirado.',
        type: ErrorResponse,
    })
    @IsPublic()
    @Post('refresh-token')
    refreshToken(@Body() refreshToken: RefreshTokenDTO) {
        return this.authService.refreshToken(refreshToken);
    }

    @ApiOkResponse({
        description: 'True se o token é válido.',
        type: IsAccessTokenValidDto,
    })
    @ApiUnauthorizedResponse({
        description: 'Erro na verificação de autorização.',
        type: ErrorResponse,
    })
    @Get('is-access-token-valid')
    isAccessTokenValid() {
        return {
            ok: true,
        };
    }
}
