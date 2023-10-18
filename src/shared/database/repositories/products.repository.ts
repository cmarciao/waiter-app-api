import { Injectable } from '@nestjs/common';
import { Product } from '@prisma/client';

import { PrismaService } from '../prisma.service';
import { CreateProductDto } from 'src/modules/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/modules/products/dto/update-product.dto';

@Injectable()
export class ProductsRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createProductDto: CreateProductDto) {
        const { categoryIds, ingredientIds } = createProductDto;
        const data = {
            name: createProductDto.name,
            description: createProductDto.description,
            imageId: createProductDto.imageId,
            imageUrl: createProductDto.imageUrl,
        };

        const categories = categoryIds.map((category) => ({
            categoryId: category,
        }));
        const ingredients = ingredientIds.map((ingredient) => ({
            ingredientId: ingredient,
        }));

        const response = await this.prismaService.product.create({
            data: {
                ...data,
                categories: {
                    create: categories,
                },
                ingredients: {
                    create: ingredients,
                },
            },
            include: {
                ingredients: {
                    select: {
                        ingredient: true,
                    },
                },
                categories: {
                    select: {
                        category: true,
                    },
                },
            },
        });

        const product = this.productMapper(response);

        return product;
    }

    async findAll() {
        const response = await this.prismaService.product.findMany({
            include: {
                ingredients: {
                    select: {
                        ingredient: true,
                    },
                },
                categories: {
                    select: {
                        category: true,
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
                categories: {
                    some: {
                        categoryId: id,
                    },
                },
            },
            include: {
                ingredients: {
                    include: {
                        ingredient: true,
                    },
                },
                categories: {
                    include: {
                        category: true,
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
            include: {
                ingredients: {
                    select: {
                        ingredient: true,
                    },
                },
                categories: {
                    select: {
                        category: true,
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
        { ingredientIds, categoryIds, ...productToUpdate }: UpdateProductDto,
    ) {
        const categories = categoryIds?.map((category) => ({
            categoryId: category,
        }));
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

        if (categories) {
            const deleteAllCategories =
                this.prismaService.productToCategories.deleteMany({
                    where: {
                        productId: id,
                    },
                });

            queriesList.push(deleteAllCategories);

            for (const categoryId of categoryIds) {
                const query = this.prismaService.productToCategories.create({
                    data: {
                        productId: id,
                        categoryId,
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
                categories: {
                    select: {
                        category: true,
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

    async remove(id: string) {
        const deleteIngredientsQuery =
            this.prismaService.productToIngredients.deleteMany({
                where: {
                    productId: id,
                },
            });

        const deleteCategoriesQuery =
            this.prismaService.productToCategories.deleteMany({
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
            deleteCategoriesQuery,
            deleteProductQuery,
        ]);
    }

    private productMapper(product: Product) {
        const mappedProduct = {
            ...product,
            ingredients: product['ingredients'].map((ingredient) => ({
                ...ingredient.ingredient,
            })),
            categories: product['categories'].map((category) => ({
                ...category.category,
            })),
        };

        return mappedProduct;
    }
}
