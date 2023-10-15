import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

import { SignInDto } from './dto/sign-in';
import { IsPublic } from 'src/shared/decorators/is-public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @IsPublic()
    @Post('signin')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }
}
