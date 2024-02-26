import { Injectable } from '@nestjs/common';
import { s3Url } from '../config/constants';

type IUploadImage = {
    filename: string;
    buffer: Buffer;
};

type IUpdateImage = {
    fileKey: string;
    buffer: Buffer;
};

type IFetchSignedUrlParams = {
    method: 'POST' | 'PUT';
    body: Record<string, unknown>;
};

@Injectable()
export class AwsGateway {
    private async generateSignedUrl({ method, body }: IFetchSignedUrlParams) {
        const response = await fetch(s3Url, {
            method,
            body: JSON.stringify(body),
        });

        return response.json();
    }

    private async generateSignedUrlToUpdateFile(fileKey: string) {
        return this.generateSignedUrl({
            method: 'PUT',
            body: {
                fileKey,
            },
        });
    }

    private async generateSignedUrlToCreateFile(filename: string) {
        return this.generateSignedUrl({
            method: 'POST',
            body: {
                filename,
            },
        });
    }

    private async fetchSignedUrl(signedUrl: string, buffer: Buffer) {
        return fetch(signedUrl, {
            method: 'PUT',
            body: buffer,
            headers: {
                'Content-Type': 'image/jpeg',
                'Content-Length': `${buffer.length}`,
            },
        });
    }

    async uploadImage({ filename, buffer }: IUploadImage) {
        const { signedUrl, key } =
            await this.generateSignedUrlToCreateFile(filename);

        await this.fetchSignedUrl(signedUrl, buffer);

        return { key };
    }

    async updateImage({ fileKey, buffer }: IUpdateImage) {
        const { signedUrl } = await this.generateSignedUrlToUpdateFile(fileKey);

        return this.fetchSignedUrl(signedUrl, buffer);
    }
}
