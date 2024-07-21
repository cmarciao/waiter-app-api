/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class MeUpdateUserDto {
    @ApiProperty({
        name: 'name',
        description: 'Your account name.',
        example: 'Mocked name',
    })
    name: string;

    @ApiProperty({
        name: 'email',
        description: 'Your account email.',
        example: 'mocked.user@email.com',
    })
    email: string;
}
