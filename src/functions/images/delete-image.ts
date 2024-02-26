import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { response, responseError } from '../utils/response';
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';

export async function handler(event: APIGatewayProxyEventV2) {
    const { id } = event.pathParameters;

    if (!id) {
        return responseError(400, {
            error: 'Bad request',
            message: 'Invalid image id.',
            statusCode: 400,
        });
    }

    const s3Client = new S3Client();
    const command = new DeleteObjectCommand({
        Key: id,
        Bucket: 'waiterapp-dev-uploadimages-tvdslzrah1vy',
    });

    try {
        await s3Client.send(command);

        return response(200, {
            message: 'Ok',
        });
    } catch (err) {
        console.error(err);
    }
}
