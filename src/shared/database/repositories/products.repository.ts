import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';

import { PrismaService } from '../prisma.service';
import { CreateProductDto } from 'src/modules/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/modules/products/dto/update-product.dto';

@Injectable()
export class ProductsRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createProductDto: Required<Omit<CreateProductDto, 'image'>>) {
        const { ingredientIds, ...productDto } = createProductDto;

        const ingredients = ingredientIds.map((ingredient) => ({
            ingredientId: ingredient,
        }));

        const response = await this.prismaService.product.create({
            data: {
                ...productDto,
                ingredients: {
                    create: ingredients,
                },
            },
            select: {
                id: true,
                name: true,
                description: true,
                imageId: false,
                imageUrl: true,
                price: true,
                categoryId: false,
                category: true,
                ingredients: {
                    select: {
                        ingredient: true,
                    },
                },
            },
        });

        const product = this.productMapper(response);

        return product;
    }

    async findAll() {
        const response = await this.prismaService.product.findMany({
            select: {
                id: true,
                name: true,
                description: true,
                imageId: false,
                imageUrl: true,
                price: true,
                categoryId: false,
                category: true,
                ingredients: {
                    select: {
                        ingredient: true,
                    },
                },
            },
        });

        const products = response.map((product) => this.productMapper(product));

        return products;
    }

    async findByCategory(id: string) {
        const response = await this.prismaService.product.findMany({
            where: {
                categoryId: id,
            },
            select: {
                id: true,
                name: true,
                description: true,
                imageId: false,
                imageUrl: true,
                price: true,
                categoryId: false,
                category: true,
                ingredients: {
                    select: {
                        ingredient: true,
                    },
                },
            },
        });
        const products = response.map((product) => this.productMapper(product));

        return products;
    }

    async findById(id: string) {
        const productFound = await this.prismaService.product.findUnique({
            where: {
                id,
            },
            select: {
                id: true,
                name: true,
                description: true,
                imageId: false,
                imageUrl: true,
                price: true,
                categoryId: false,
                category: true,
                ingredients: {
                    select: {
                        ingredient: true,
                    },
                },
            },
        });

        if (!productFound) {
            return productFound;
        }

        const product = this.productMapper(productFound);

        return product;
    }

    findByName(name: string) {
        return this.prismaService.product.findUnique({
            where: {
                name,
            },
        });
    }

    async update(
        id: string,
        { ingredientIds, ...productToUpdate }: UpdateProductDto,
    ) {
        const ingredients = ingredientIds?.map((ingredient) => ({
            ingredientId: ingredient,
        }));

        const queriesList = [];

        if (ingredients) {
            const deleteAllIngredients =
                this.prismaService.productToIngredients.deleteMany({
                    where: {
                        productId: id,
                    },
                });

            queriesList.push(deleteAllIngredients);

            for (const ingredientId of ingredientIds) {
                const query = this.prismaService.productToIngredients.create({
                    data: {
                        productId: id,
                        ingredientId,
                    },
                });

                queriesList.push(query);
            }
        }

        const updateProductQuery = this.prismaService.product.update({
            where: {
                id,
            },
            data: {
                ...productToUpdate,
            },
            include: {
                ingredients: {
                    select: {
                        ingredient: true,
                    },
                },
            },
        });

        queriesList.push(updateProductQuery);

        const responses = await this.prismaService.$transaction(queriesList);
        const updateProduct = responses.pop();

        const product = this.productMapper(updateProduct);

        return product;
    }

    async getImageId(id: string) {
        const { imageId } = await this.prismaService.product.findUnique({
            where: {
                id,
            },
            select: {
                imageId: true,
            },
        });

        return imageId;
    }

    async getProductPrice(id: string) {
        const { price } = await this.prismaService.product.findUnique({
            where: {
                id,
            },
            select: {
                price: true,
            },
        });

        return price;
    }

    async remove(id: string) {
        const deleteIngredientsQuery =
            this.prismaService.productToIngredients.deleteMany({
                where: {
                    productId: id,
                },
            });

        const deleteProductQuery = this.prismaService.product.delete({
            where: {
                id,
            },
        });

        return this.prismaService.$transaction([
            deleteIngredientsQuery,
            deleteProductQuery,
        ]);
    }

    private productMapper(product: Omit<Product, 'categoryId' | 'imageId'>) {
        const mappedProduct = {
            ...product,
            ingredients: product['ingredients'].map((ingredient) => ({
                ...ingredient.ingredient,
            })),
        };

        return mappedProduct;
    }
}
