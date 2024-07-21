/* eslint-disable indent */
import { $Enums } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty({
        name: 'id',
        description: 'Created user id.',
        example: '0c270ae9-f93a-4c28-ac0e-ae132f1d44df',
    })
    id: string;

    @ApiProperty({
        name: 'name',
        description: 'Created user name.',
        example: 'Mocked Name',
    })
    name: string;

    @ApiProperty({
        name: 'email',
        description: 'Created user email.',
        example: 'mocked.user@email.com',
    })
    email: string;

    @ApiProperty({
        name: 'type',
        description: 'Created user type.',
        default: 'WAITER',
        enum: $Enums.UserType,
        example: 'WAITER',
    })
    type: $Enums.UserType;
}
