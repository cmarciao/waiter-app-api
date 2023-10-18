/*
  Warnings:

  - A unique constraint covering the columns `[imageId]` on the table `products` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageId` to the `products` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "imageId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "products_imageId_key" ON "products"("imageId");
