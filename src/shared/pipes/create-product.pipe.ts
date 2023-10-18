import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CreateProductPipe implements PipeTransform {
    transform(value: any) {
        if (value?.mimetype) {
            if (!value?.mimetype.includes('image')) {
                throw new BadRequestException(
                    'File type is invalid, a image is required.',
                );
            }

            return value;
        }

        const body = {
            ...value,
            ingredientIds: JSON.parse(value.ingredientIds),
            categoryIds: JSON.parse(value.categoryIds),
        };

        return body;
    }
}
