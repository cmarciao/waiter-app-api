/* eslint-disable indent */
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';
import { UserType } from '../entities/enums/user-type';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({
        name: 'name',
        description: 'Name of the user to update account.',
        example: 'Mocked Name',
    })
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @ApiProperty({
        name: 'email',
        description: 'Email of the user to update account.',
        example: 'mocked.user@email.com',
    })
    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email?: string;

    @ApiProperty({
        name: 'password',
        description:
            'Password of the user to update account, must be equal to or longer than 8 characters.',
        example: '123456789',
    })
    @IsString()
    @MinLength(8)
    @IsOptional()
    password?: string;

    @ApiProperty({
        name: 'type',
        description:
            'Type of the user to update account, the user can be a WAITER or an ADMIN.',
        default: 'WAITER',
        enum: UserType,
        example: 'WAITER',
    })
    @IsEnum(UserType)
    @IsNotEmpty()
    @IsOptional()
    type?: UserType;
}
