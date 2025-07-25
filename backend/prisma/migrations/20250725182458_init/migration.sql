/*
  Warnings:

  - You are about to drop the `_CarToCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CarToCategory" DROP CONSTRAINT "_CarToCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_CarToCategory" DROP CONSTRAINT "_CarToCategory_B_fkey";

-- AlterTable
ALTER TABLE "Car" ADD COLUMN     "categoryId" TEXT;

-- DropTable
DROP TABLE "_CarToCategory";

-- AddForeignKey
ALTER TABLE "Car" ADD CONSTRAINT "Car_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
