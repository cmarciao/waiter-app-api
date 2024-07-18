/*
  Warnings:

  - You are about to drop the column `read` on the `notifications` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notifications" DROP COLUMN "read";

-- CreateTable
CREATE TABLE "notification_users" (
    "userId" UUID NOT NULL,
    "notificationId" UUID NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "show" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "notification_users_pkey" PRIMARY KEY ("userId","notificationId")
);
