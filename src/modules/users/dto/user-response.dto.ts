/* eslint-disable indent */
import { $Enums } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty({
        name: 'id',
        description: 'User id.',
        example: '0c270ae9-f93a-4c28-ac0e-ae132f1d44df',
    })
    id: string;

    @ApiProperty({
        name: 'name',
        description: 'User name.',
        example: 'Mocked Name',
    })
    name: string;

    @ApiProperty({
        name: 'email',
        description: 'User email.',
        example: 'mocked.user@email.com',
    })
    email: string;

    @ApiProperty({
        name: 'type',
        description: 'User type.',
        default: 'WAITER',
        enum: $Enums.UserType,
        example: 'WAITER',
    })
    type: $Enums.UserType;
}
