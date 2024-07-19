-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL,
    "table" TEXT NOT NULL,
    "orderState" "order_state" NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);
