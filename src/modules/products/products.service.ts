import {
    ConflictException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';

import { env } from 'src/shared/config/env';

import { AwsGateway } from 'src/shared/gateways/aws.gateway';
import { ProductsRepository } from 'src/shared/database/repositories/products.repository';

import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { s3Url } from 'src/shared/config/constants';

@Injectable()
export class ProductsService {
    constructor(
        private readonly awsGateway: AwsGateway,
        private readonly productsRepository: ProductsRepository,
    ) {
        /** Do nothing */
    }

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
            throw new ConflictException('O produto já está em uso.');
        }

        let imageId: string = null;

        try {
            const { key } = await this.awsGateway.uploadImage({
                buffer: image.buffer,
                filename: image.originalname,
            });

            imageId = key;

            const product = await this.productsRepository.create({
                name,
                description,
                price,
                imageId: key,
                imageUrl: `${env.amazonImagesBaseUrl}/${key}`,
                categoryId,
                ingredientIds,
            });

            return product;
        } catch (err) {
            console.log(err);

            if (imageId) {
                await this.remove(imageId);
            }

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
            throw new NotFoundException('Produto não encontrado.');
        }

        return product;
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new NotFoundException('Produto não encontrado.');
        }

        const { image, ...rest } = updateProductDto;

        if (updateProductDto?.image?.originalname) {
            const imageId = await this.productsRepository.getImageId(id);

            await this.awsGateway.updateImage({
                fileKey: imageId,
                buffer: image.buffer,
            });
        }

        return this.productsRepository.update(id, rest);
    }

    async remove(id: string) {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new NotFoundException('Produto não encontrado.');
        }

        const imageId = await this.productsRepository.getImageId(id);

        await fetch(`${s3Url}/${imageId}`, {
            method: 'DELETE',
        });

        await this.productsRepository.remove(id);
    }
}
