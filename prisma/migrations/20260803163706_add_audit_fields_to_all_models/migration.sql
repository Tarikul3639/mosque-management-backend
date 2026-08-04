/*
  Warnings:

  - You are about to drop the `FamilyFee` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MonthlyCharge` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Payment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "FamilyFee" DROP CONSTRAINT "FamilyFee_familyId_fkey";

-- DropForeignKey
ALTER TABLE "MonthlyCharge" DROP CONSTRAINT "MonthlyCharge_familyId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_familyId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_monthlyChargeId_fkey";

-- AlterTable
ALTER TABLE "committee_members" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "updatedById" TEXT;

-- AlterTable
ALTER TABLE "donors" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "updatedById" TEXT;

-- AlterTable
ALTER TABLE "families" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "updatedById" TEXT;

-- AlterTable
ALTER TABLE "files" ADD COLUMN     "createdById" TEXT;

-- AlterTable
ALTER TABLE "prayer_times" ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "updatedById" TEXT;

-- DropTable
DROP TABLE "FamilyFee";

-- DropTable
DROP TABLE "MonthlyCharge";

-- DropTable
DROP TABLE "Payment";

-- CreateTable
CREATE TABLE "family_fees" (
    "id" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "monthlyFee" DECIMAL(10,2) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "family_fees_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payments" (
    "id" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "monthlyChargeId" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "method" "PaymentMethod" NOT NULL DEFAULT 'CASH',
    "reference" TEXT,
    "note" TEXT,
    "createdById" TEXT NOT NULL,
    "updatedById" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "monthly_charges" (
    "id" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "paidAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "dueDate" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "createdById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "monthly_charges_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "family_fees_familyId_idx" ON "family_fees"("familyId");

-- CreateIndex
CREATE INDEX "family_fees_createdById_idx" ON "family_fees"("createdById");

-- CreateIndex
CREATE INDEX "family_fees_updatedById_idx" ON "family_fees"("updatedById");

-- CreateIndex
CREATE INDEX "payments_familyId_idx" ON "payments"("familyId");

-- CreateIndex
CREATE INDEX "payments_monthlyChargeId_idx" ON "payments"("monthlyChargeId");

-- CreateIndex
CREATE INDEX "payments_createdById_idx" ON "payments"("createdById");

-- CreateIndex
CREATE INDEX "payments_updatedById_idx" ON "payments"("updatedById");

-- CreateIndex
CREATE INDEX "monthly_charges_familyId_idx" ON "monthly_charges"("familyId");

-- CreateIndex
CREATE INDEX "monthly_charges_year_month_idx" ON "monthly_charges"("year", "month");

-- CreateIndex
CREATE INDEX "monthly_charges_createdById_idx" ON "monthly_charges"("createdById");

-- CreateIndex
CREATE INDEX "monthly_charges_updatedById_idx" ON "monthly_charges"("updatedById");

-- CreateIndex
CREATE UNIQUE INDEX "monthly_charges_familyId_year_month_key" ON "monthly_charges"("familyId", "year", "month");

-- CreateIndex
CREATE INDEX "committee_members_createdById_idx" ON "committee_members"("createdById");

-- CreateIndex
CREATE INDEX "committee_members_updatedById_idx" ON "committee_members"("updatedById");

-- CreateIndex
CREATE INDEX "donors_createdById_idx" ON "donors"("createdById");

-- CreateIndex
CREATE INDEX "donors_updatedById_idx" ON "donors"("updatedById");

-- CreateIndex
CREATE INDEX "families_createdById_idx" ON "families"("createdById");

-- CreateIndex
CREATE INDEX "families_updatedById_idx" ON "families"("updatedById");

-- CreateIndex
CREATE INDEX "files_createdById_idx" ON "files"("createdById");

-- CreateIndex
CREATE INDEX "prayer_times_createdById_idx" ON "prayer_times"("createdById");

-- CreateIndex
CREATE INDEX "prayer_times_updatedById_idx" ON "prayer_times"("updatedById");

-- AddForeignKey
ALTER TABLE "committee_members" ADD CONSTRAINT "committee_members_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "committee_members" ADD CONSTRAINT "committee_members_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "families" ADD CONSTRAINT "families_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "families" ADD CONSTRAINT "families_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "family_fees" ADD CONSTRAINT "family_fees_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "families"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "family_fees" ADD CONSTRAINT "family_fees_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "family_fees" ADD CONSTRAINT "family_fees_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "families"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_monthlyChargeId_fkey" FOREIGN KEY ("monthlyChargeId") REFERENCES "monthly_charges"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monthly_charges" ADD CONSTRAINT "monthly_charges_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "families"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monthly_charges" ADD CONSTRAINT "monthly_charges_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "monthly_charges" ADD CONSTRAINT "monthly_charges_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donors" ADD CONSTRAINT "donors_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donors" ADD CONSTRAINT "donors_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prayer_times" ADD CONSTRAINT "prayer_times_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "prayer_times" ADD CONSTRAINT "prayer_times_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
