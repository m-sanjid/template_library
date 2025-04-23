/*
  Warnings:

  - Added the required column `userId` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "currency" TEXT,
ADD COLUMN     "issueDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "paymentIntentId" DROP NOT NULL,
ALTER COLUMN "filePath" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'paid';

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
