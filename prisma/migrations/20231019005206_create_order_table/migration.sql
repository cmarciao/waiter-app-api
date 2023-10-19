-- CreateEnum
CREATE TYPE "order_state" AS ENUM ('WAITING', 'PREPARING', 'FINISHED');

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL,
    "table" INTEGER NOT NULL,
    "orderState" "order_state" NOT NULL DEFAULT 'WAITING',
    "total" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_products" (
    "orderId" UUID NOT NULL,
    "productId" UUID NOT NULL,

    CONSTRAINT "order_products_pkey" PRIMARY KEY ("orderId","productId")
);

-- AddForeignKey
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_products" ADD CONSTRAINT "order_products_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
