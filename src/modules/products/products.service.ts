import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { CreateProductDto } from './dto/create-product.dto';
import { ProductsRepository } from 'src/shared/database/repositories/products.repository';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) {}

    async create({
        name,
        description,
        imageUrl,
        categorieIds,
        ingredientIds,
    }: CreateProductDto) {
        const productFound = await this.productsRepository.findByName(name);

        if (productFound) {
            throw new ConflictException('This product already exists.');
        }

        const product = await this.productsRepository.create({
            name,
            description,
            imageUrl,
            categorieIds,
            ingredientIds,
        });

        return product;
    }

    async findOne(id: string) {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new NotFoundException('Product not found.');
        }

        return product;
    }
}
