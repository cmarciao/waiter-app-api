/* eslint-disable indent */
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsString,
    MinLength,
} from 'class-validator';
import { UserType } from '../entities/enums/user-type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        name: 'name',
        description: 'Name of the user to create account.',
        example: 'Mocked Name'
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        name: 'email',
        description: 'Email of the user to create account.',
        example: 'mocked.user@email.com'
    })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        name: 'password',
        description: 'Password of the user to create account, must be equal to or longer than 8 characters.',
        example: '123456789'
    })
    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        name: 'type',
        description: 'Type of the user to create account, the user can be a USER or an ADMIN.',
        default: 'USER',
        enum: ['USER', 'ADMIN'],
        example: 'USER'
    })
    @IsNotEmpty()
    @IsEnum(UserType)
    type: UserType;
}
