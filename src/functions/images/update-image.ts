import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';

import { responseError } from '../utils/response';
import { verifyRequestBody } from '../utils/request';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export async function handler(event: APIGatewayProxyEventV2) {
    const { fileKey } = JSON.parse(event.body);

    const errorMessage = verifyRequestBody({ fileKey });

    if (errorMessage.length) {
        return responseError(400, {
            message: errorMessage,
            error: 'Bad request',
            statusCode: 400,
        });
    }

    const s3Client = new S3Client();
    const command = new PutObjectCommand({
        Bucket: 'waiterapp-dev-uploadimages-tvdslzrah1vy',
        Key: fileKey as string,
    });

    const signedUrl = await getSignedUrl(s3Client, command);

    return {
        signedUrl,
    };
}
