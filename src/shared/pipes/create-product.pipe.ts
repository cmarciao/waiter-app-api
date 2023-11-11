import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class CreateProductPipe implements PipeTransform {
    transform(value: any) {
        if (!value) return;

        if (value?.mimetype) {
            if (!value?.mimetype.includes('image')) {
                throw new BadRequestException(
                    'File type is invalid, a image is required.',
                );
            }

            return value;
        }

        const obj = Object.assign({}, value);

        const body = {
            ...obj,
            price: Number(obj?.price),
            ingredientIds: JSON.parse(obj?.ingredientIds),
        };

        return body;
    }
}
