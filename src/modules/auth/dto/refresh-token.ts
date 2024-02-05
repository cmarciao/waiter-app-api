/* eslint-disable indent */
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDTO {
    @IsString()
    @IsNotEmpty()
    id: string;
}
