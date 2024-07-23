/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class SignResponseDto {
    @ApiProperty({
        name: 'accessToken',
        description: 'The access token to access the application.',
        example:
            'eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSGVsbG8ifQ.4HqSjn0J4NGYIaJ4026YqQHY01-SgKI3xOCAL5CF6mM',
    })
    accessToken: string;

    @ApiProperty({
        name: 'refreshToken',
        description: 'The refresh token to update the access token.',
        example:
            'eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiSGVsbG8ifQ.4HqSjn0J4NGYIaJ4026YqQHY01-SgKI3xOCAL5CF6mM',
    })
    refreshToken: string;
}
