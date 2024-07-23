/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class IsAccessTokenValidDto {
    @ApiProperty({
        name: 'ok',
        description: 'True if the token is valid.',
    })
    ok: boolean;
}
