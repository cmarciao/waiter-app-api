/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDTO {
    @ApiProperty({
        name: 'id',
        description: 'Token id to update the session.',
        example: '25c67d64-0804-471e-b104-ccac3258a2f3',
    })
    @IsString()
    @IsNotEmpty()
    id: string;
}
