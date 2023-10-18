import { Injectable } from '@nestjs/common';
import { Category, Ingredient, Product } from '@prisma/client';

import { PrismaService } from '../prisma.service';
import { CreateProductDto } from 'src/modules/products/dto/create-product.dto';

@Injectable()
export class ProductsRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createProductDto: CreateProductDto) {
        const { categoryIds, ingredientIds } = createProductDto;
        const data = {
            name: createProductDto.name,
            description: createProductDto.description,
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

        const product = this.productMapper(
            response,
            response.ingredients,
            response.categories,
        );

        return product;
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

        const product = this.productMapper(
            productFound,
            productFound.ingredients,
            productFound.categories,
        );

        return product;
    }

    findByName(name: string) {
        return this.prismaService.product.findUnique({
            where: {
                name,
            },
        });
    }

    private productMapper(
        product: Product,
        ingredients: { ingredient: Ingredient }[],
        categories: { category: Category }[],
    ) {
        const mappedProduct = {
            ...product,
            ingredients: ingredients.map((ingredient) => ({
                ...ingredient.ingredient,
            })),
            categories: categories.map((category) => ({
                ...category.category,
            })),
        };

        return mappedProduct;
    }
}
