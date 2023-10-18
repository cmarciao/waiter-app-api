import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { imagekit } from 'src/shared/services/imagekit.config';

import { CreateProductDto } from './dto/create-product.dto';
import { ProductsRepository } from 'src/shared/database/repositories/products.repository';
import { UpdateProductDto } from './dto/update-product.dto';

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
            imageId: imagekitResponse.fileId,
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

    async findByCategory(id: string) {
        const products = await this.productsRepository.findByCategory(id);
        return products;
    }

    async findOne(id: string) {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new NotFoundException('Product not found.');
        }

        return product;
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new NotFoundException('Product not found.');
        }

        if (updateProductDto?.image?.originalname) {
            return await this.updateWithImageKit(
                id,
                product.imageId,
                updateProductDto,
            );
        }

        return this.updateWithoutImageKit(id, updateProductDto);
    }

    private async updateWithImageKit(
        id: string,
        imageId: string,
        updateProductDto: UpdateProductDto,
    ) {
        const { image, ...rest } = updateProductDto;

        await imagekit.deleteFile(imageId);
        const imagekitResponse = await imagekit.upload({
            fileName: image.originalname,
            file: image.buffer,
        });

        return this.productsRepository.update(id, {
            ...rest,
            imageId: imagekitResponse.fileId,
            imageUrl: imagekitResponse.url,
        });
    }

    private updateWithoutImageKit(
        id: string,
        updateProductDto: UpdateProductDto,
    ) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { image: _, ...rest } = updateProductDto;

        return this.productsRepository.update(id, rest);
    }

    async remove(id: string) {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new NotFoundException('Product not found.');
        }

        await imagekit.deleteFile(product.imageId);
        await this.productsRepository.remove(id);

        return null;
    }
}
