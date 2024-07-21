/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';

export class MeUpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({
        name: 'Name',
        description: 'The updated name to update your account.',
        example: 'Mocked name.',
    })
    name?: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({
        name: 'email',
        description: 'The updated email to update your account.',
        example: 'Mocked name.',
    })
    email?: string;

    @IsString()
    @MinLength(8)
    @IsOptional()
    @ApiProperty({
        name: 'password',
        description:
            'The updated password to update your account, must be equal to or longer than 8 characters.',
        example: '12345678',
    })
    password?: string;
}
