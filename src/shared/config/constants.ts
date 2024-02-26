import { env } from './env';

export const s3Url = `${env.amazonS3Url}${env.amazonS3Path}`;
