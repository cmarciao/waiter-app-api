/* eslint-disable indent */
import {
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MinLength,
} from 'class-validator';
import { UserType } from '../entities/enums/UserType';

export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name?: string;

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email: string;

    @IsString()
    @MinLength(8)
    @IsOptional()
    password: string;

    @IsEnum(UserType)
    @IsNotEmpty()
    @IsOptional()
    type: UserType;
}
