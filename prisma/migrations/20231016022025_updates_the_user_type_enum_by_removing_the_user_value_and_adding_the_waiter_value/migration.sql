/*
  Warnings:

  - The values [USER] on the enum `user_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "user_type_new" AS ENUM ('WAITER', 'ADMIN');
ALTER TABLE "users" ALTER COLUMN "type" TYPE "user_type_new" USING ("type"::text::"user_type_new");
ALTER TYPE "user_type" RENAME TO "user_type_old";
ALTER TYPE "user_type_new" RENAME TO "user_type";
DROP TYPE "user_type_old";
COMMIT;
