/* eslint-disable indent */
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInDto {
    @ApiProperty({
        name: 'email',
        description: 'User account email.',
        example: 'mocked.user@email.com',
    })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        name: 'password',
        description:
            'User account password, must be equal to or longer than 8 characters.',
        example: '12345678',
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}
