import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { ProductsRepository } from 'src/shared/database/repositories/products.repository';
import { imagekit } from 'src/shared/services/imagekit.config';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) {}

    async create({
        name,
        description,
        image,
        categoryIds,
        ingredientIds,
    }: CreateProductDto) {
        const productFound = await this.productsRepository.findByName(name);

        if (productFound) {
            throw new ConflictException('This product already exists.');
        }

        const imagekitResponse = await imagekit.upload({
            fileName: image.originalname,
            file: image.buffer,
        });

        const product = await this.productsRepository.create({
            name,
            description,
            imageUrl: imagekitResponse.url,
            categoryIds,
            ingredientIds,
        });

        return product;
    }

    async findAll() {
        const products = await this.productsRepository.findAll();
        return products;
    }

    async findOne(id: string) {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new NotFoundException('Product not found.');
        }

        return product;
    }

    async remove(id: string) {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new NotFoundException('Product not found.');
        }

        await this.productsRepository.remove(id);

        return null;
    }
}
