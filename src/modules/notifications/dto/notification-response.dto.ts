/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { OrderState } from '@prisma/client';

export class NotificationResponseDto {
    @ApiProperty({
        name: 'id',
        description: 'Notification id.',
        example: '0c270ae9-f93a-4c28-ac0e-ae132f1d44df',
    })
    id: string;

    @ApiProperty({
        name: 'name',
        description: 'Update order tale.',
        example: 'Mocked Name',
    })
    table: string;

    @ApiProperty({
        name: 'orderState',
        description: 'Updated order state',
        default: 'WAITING',
        enum: OrderState,
        example: 'WAITING',
    })
    orderState: OrderState;

    @ApiProperty({
        name: 'createdAt',
        description: 'Notification creation date.',
        example: '2024-07-19 01:22:10.353',
    })
    createdAt: Date;

    @ApiProperty({
        name: 'show',
        description: 'If the notification should be shown.',
        example: true,
    })
    show: boolean;

    @ApiProperty({
        name: 'read',
        description: 'If the notification has already been read.',
        example: true,
    })
    read: boolean;
}
