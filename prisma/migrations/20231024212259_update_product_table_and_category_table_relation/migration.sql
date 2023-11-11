/*
  Warnings:

  - You are about to drop the `product_categories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "product_categories" DROP CONSTRAINT "product_categories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "product_categories" DROP CONSTRAINT "product_categories_productId_fkey";

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "categoryId" UUID NOT NULL;

-- DropTable
DROP TABLE "product_categories";

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
