/* eslint-disable indent */
import { IsNotEmpty, IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

class Env {
    @IsString()
    @IsNotEmpty()
    jwtSecret: string;

    @IsString()
    @IsNotEmpty()
    amazonS3Url: string;

    @IsString()
    @IsNotEmpty()
    amazonS3Path: string;

    @IsString()
    @IsNotEmpty()
    amazonImagesBaseUrl: string;
}

export const env: Env = plainToInstance(Env, {
    jwtSecret: process.env.JWT_SECRET_KEY,
    amazonS3Url: process.env.AMAZON_S3_URL,
    amazonS3Path: process.env.AMAZON_S3_PATH,
    amazonImagesBaseUrl: process.env.AMAZON_IMAGES_BASE_URL,
});

const errors = validateSync(env);

if (errors.length > 0) {
    throw new Error(JSON.stringify(errors, null, 2));
}
