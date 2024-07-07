import { env } from './env';

export const s3Url = `${env.amazonApiGatewayUrl}${env.amazonApiImagesPath}`;
