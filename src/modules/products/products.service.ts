import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
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
        price,
        image,
        categoryId,
        ingredientIds,
    }: CreateProductDto) {
        const productFound = await this.productsRepository.findByName(name);

        if (productFound) {
            throw new ConflictException('This product already exists.');
        }

        let imageId: string;

        try {
            const imagekitResponse = await imagekit.upload({
                fileName: image.originalname,
                file: image.buffer,
            });

            imageId = imagekitResponse.fileId;

            const product = await this.productsRepository.create({
                name,
                description,
                price,
                imageId,
                imageUrl: imagekitResponse.url,
                categoryId,
                ingredientIds,
            });

            return product;
        } catch (err) {
            console.log(err);

            await imagekit.deleteFile(imageId);

            throw new InternalServerErrorException();
        }
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
            const imageId = await this.productsRepository.getImageId(id);
            return await this.updateWithImageKit(id, imageId, updateProductDto);
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

        const imageId = await this.productsRepository.getImageId(id);

        await imagekit.deleteFile(imageId);
        await this.productsRepository.remove(id);

        return null;
    }
}
