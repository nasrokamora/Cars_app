/*
  Warnings:

  - You are about to drop the column `revolkedAt` on the `RefreshToken` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."RefreshToken" DROP COLUMN "revolkedAt",
ADD COLUMN     "revokedAt" TIMESTAMP(3);
