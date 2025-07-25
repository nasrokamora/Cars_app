/*
  Warnings:

  - You are about to drop the column `updetedAt` on the `Image` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "updetedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
