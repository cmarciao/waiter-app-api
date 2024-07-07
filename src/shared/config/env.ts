/* eslint-disable indent */
import { IsNotEmpty, IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

class Env {
    @IsString()
    @IsNotEmpty()
    jwtSecret: string;

    @IsString()
    @IsNotEmpty()
    amazonApiGatewayUrl: string;

    @IsString()
    @IsNotEmpty()
    amazonApiImagesPath: string;

    @IsString()
    @IsNotEmpty()
    amazonImagesBaseUrl: string;
}

export const env: Env = plainToInstance(Env, {
    jwtSecret: process.env.JWT_SECRET_KEY,
    amazonApiGatewayUrl: process.env.AMAZON_API_GATEWAY_URL,
    amazonApiImagesPath: process.env.AMAZON_API_IMAGES_PATH,
    amazonImagesBaseUrl: process.env.AMAZON_IMAGES_BASE_URL,
});

const errors = validateSync(env);

if (errors.length > 0) {
    throw new Error(JSON.stringify(errors, null, 2));
}
