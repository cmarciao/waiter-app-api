import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class UpdateProductPipe implements PipeTransform {
    transform(value: any) {
        if (typeof value === 'string') {
            return value;
        }

        if (value?.mimetype) {
            if (!value?.mimetype.includes('image')) {
                throw new BadRequestException(
                    'File type is invalid, a image is required',
                );
            }

            return value;
        }

        const body = { ...value };

        if (value?.ingredientIds) {
            Object.assign(body, {
                ingredientIds: JSON.parse(value.ingredientIds),
            });
        }

        if (value?.categoryIds) {
            Object.assign(body, {
                categoryIds: JSON.parse(value.categoryIds),
            });
        }

        return body;
    }
}
