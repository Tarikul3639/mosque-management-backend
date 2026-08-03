/*
  Warnings:

  - You are about to drop the column `status` on the `MonthlyCharge` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "MonthlyCharge" DROP COLUMN "status";

-- DropEnum
DROP TYPE "PaymentStatus";
