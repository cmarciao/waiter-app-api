import { randomUUID } from 'node:crypto';

import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { response } from '../utils/response';

export async function handler() {
    const s3Client = new S3Client();

    const key = randomUUID();
    const command = new PutObjectCommand({
        Key: key,
        Bucket: 'waiterapp-dev-uploadimages-tvdslzrah1vy',
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 30 });

    return response(200, {
        key,
        signedUrl,
    });
}
