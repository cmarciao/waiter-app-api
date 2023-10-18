/* eslint-disable indent */
import { IsNotEmpty, IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

class Env {
    @IsString()
    @IsNotEmpty()
    jwtSecret: string;

    @IsString()
    @IsNotEmpty()
    imagekitId: string;

    @IsString()
    @IsNotEmpty()
    imagekitPublicKey: string;

    @IsString()
    @IsNotEmpty()
    imagekitSecretKey: string;
}

export const env: Env = plainToInstance(Env, {
    jwtSecret: process.env.JWT_SECRET_KEY,
    imagekitId: process.env.IMAGEKIT_ID,
    imagekitPublicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    imagekitSecretKey: process.env.IMAGEKIT_SECRET_KEY,
});

const errors = validateSync(env);

if (errors.length > 0) {
    throw new Error(JSON.stringify(errors, null, 2));
}
