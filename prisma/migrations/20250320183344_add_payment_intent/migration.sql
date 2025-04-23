/*
  Warnings:

  - A unique constraint covering the columns `[paymentIntentId]` on the table `Purchase` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "paymentIntentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Purchase_paymentIntentId_key" ON "Purchase"("paymentIntentId");
