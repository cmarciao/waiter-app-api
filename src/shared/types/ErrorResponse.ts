/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponse {
    @ApiProperty({
        name: 'error',
        description: 'Error name.',
    })
    error: string;

    @ApiProperty({
        name: 'message',
        description: 'Error message.',
    })
    message: string;

    @ApiProperty({
        name: 'statusCode',
        description: 'Error status code.',
    })
    statusCode: number;
}
