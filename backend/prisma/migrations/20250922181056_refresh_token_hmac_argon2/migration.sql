/*
  Warnings:

  - A unique constraint covering the columns `[jwtId]` on the table `RefreshToken` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."RefreshToken" ADD COLUMN     "jwtId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_jwtId_key" ON "public"."RefreshToken"("jwtId");

-- CreateIndex
CREATE INDEX "RefreshToken_userId_idx" ON "public"."RefreshToken"("userId");

-- CreateIndex
CREATE INDEX "RefreshToken_jti_idx" ON "public"."RefreshToken"("jti");

-- CreateIndex
CREATE INDEX "RefreshToken_jwtId_idx" ON "public"."RefreshToken"("jwtId");
