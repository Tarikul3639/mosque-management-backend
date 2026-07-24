/*
  Warnings:

  - You are about to drop the column `photo` on the `committee_members` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `development_projects` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `donorName` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `donations` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `families` table. All the data in the column will be lost.
  - You are about to drop the column `familyCode` on the `families` table. All the data in the column will be lost.
  - You are about to drop the column `joiningDate` on the `families` table. All the data in the column will be lost.
  - You are about to drop the column `memberCount` on the `families` table. All the data in the column will be lost.
  - You are about to drop the column `monthlyFee` on the `families` table. All the data in the column will be lost.
  - You are about to drop the column `remarks` on the `families` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `families` table. All the data in the column will be lost.
  - You are about to drop the column `imageUrl` on the `galleries` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `collections` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[avatarId]` on the table `committee_members` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[familyNo]` on the table `families` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[avatarId]` on the table `families` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[avatarId]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `donorId` to the `donations` table without a default value. This is not possible if the table is not empty.
  - Made the column `receiptNo` on table `donations` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `familyNo` to the `families` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('CASH', 'BKASH', 'NAGAD', 'BANK_TRANSFER', 'CARD', 'QR', 'OTHER');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('DUE', 'PAID', 'PARTIAL');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ExpenseCategory" ADD VALUE 'INTERNET';
ALTER TYPE "ExpenseCategory" ADD VALUE 'GAS';
ALTER TYPE "ExpenseCategory" ADD VALUE 'OFFICE';
ALTER TYPE "ExpenseCategory" ADD VALUE 'EVENT';

-- DropForeignKey
ALTER TABLE "collections" DROP CONSTRAINT "collections_collectedById_fkey";

-- DropForeignKey
ALTER TABLE "collections" DROP CONSTRAINT "collections_familyId_fkey";

-- DropForeignKey
ALTER TABLE "collections" DROP CONSTRAINT "collections_updatedById_fkey";

-- DropIndex
DROP INDEX "donations_donorName_idx";

-- DropIndex
DROP INDEX "donations_phone_idx";

-- DropIndex
DROP INDEX "donations_receiptNo_idx";

-- DropIndex
DROP INDEX "families_familyCode_idx";

-- DropIndex
DROP INDEX "families_familyCode_key";

-- DropIndex
DROP INDEX "families_headName_idx";

-- DropIndex
DROP INDEX "families_status_idx";

-- AlterTable
ALTER TABLE "committee_members" DROP COLUMN "photo",
ADD COLUMN     "avatarId" TEXT;

-- AlterTable
ALTER TABLE "development_projects" DROP COLUMN "image",
ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "updatedById" TEXT;

-- AlterTable
ALTER TABLE "donations" DROP COLUMN "address",
DROP COLUMN "donorName",
DROP COLUMN "phone",
ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "donorId" TEXT NOT NULL,
ADD COLUMN     "paymentMethod" "PaymentMethod" NOT NULL DEFAULT 'CASH',
ADD COLUMN     "transactionReference" TEXT,
ADD COLUMN     "updatedById" TEXT,
ALTER COLUMN "receiptNo" SET NOT NULL;

-- AlterTable
ALTER TABLE "families" DROP COLUMN "avatar",
DROP COLUMN "familyCode",
DROP COLUMN "joiningDate",
DROP COLUMN "memberCount",
DROP COLUMN "monthlyFee",
DROP COLUMN "remarks",
DROP COLUMN "status",
ADD COLUMN     "avatarId" TEXT,
ADD COLUMN     "familyNo" TEXT NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "address" DROP NOT NULL;

-- AlterTable
ALTER TABLE "galleries" DROP COLUMN "imageUrl",
ADD COLUMN     "createdById" TEXT,
ADD COLUMN     "updatedById" TEXT;

-- AlterTable
ALTER TABLE "prayer_times" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "avatar",
ADD COLUMN     "avatarId" TEXT;

-- DropTable
DROP TABLE "collections";

-- DropEnum
DROP TYPE "CollectionStatus";

-- DropEnum
DROP TYPE "FamilyStatus";

-- CreateTable
CREATE TABLE "FamilyFee" (
    "id" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "monthlyFee" DECIMAL(10,2) NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FamilyFee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "monthlyChargeId" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "paidAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "method" "PaymentMethod" NOT NULL DEFAULT 'CASH',
    "reference" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MonthlyCharge" (
    "id" TEXT NOT NULL,
    "familyId" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "paidAmount" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "status" "PaymentStatus" NOT NULL DEFAULT 'DUE',
    "dueDate" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MonthlyCharge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "donors" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT,
    "address" TEXT,
    "avatarId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "donors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "files" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "publicId" TEXT NOT NULL,
    "originalName" TEXT,
    "mimeType" TEXT,
    "extension" TEXT,
    "size" INTEGER NOT NULL,
    "width" INTEGER,
    "height" INTEGER,
    "uploadedById" TEXT,
    "updatedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "files_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DevelopmentProjectToFile" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DevelopmentProjectToFile_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FileToGallery" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FileToGallery_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "Payment_familyId_idx" ON "Payment"("familyId");

-- CreateIndex
CREATE INDEX "Payment_monthlyChargeId_idx" ON "Payment"("monthlyChargeId");

-- CreateIndex
CREATE INDEX "MonthlyCharge_familyId_idx" ON "MonthlyCharge"("familyId");

-- CreateIndex
CREATE INDEX "MonthlyCharge_year_month_idx" ON "MonthlyCharge"("year", "month");

-- CreateIndex
CREATE UNIQUE INDEX "MonthlyCharge_familyId_year_month_key" ON "MonthlyCharge"("familyId", "year", "month");

-- CreateIndex
CREATE UNIQUE INDEX "donors_avatarId_key" ON "donors"("avatarId");

-- CreateIndex
CREATE INDEX "donors_fullName_idx" ON "donors"("fullName");

-- CreateIndex
CREATE INDEX "donors_phone_idx" ON "donors"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "donors_fullName_phone_key" ON "donors"("fullName", "phone");

-- CreateIndex
CREATE UNIQUE INDEX "files_publicId_key" ON "files"("publicId");

-- CreateIndex
CREATE INDEX "files_uploadedById_idx" ON "files"("uploadedById");

-- CreateIndex
CREATE INDEX "files_updatedById_idx" ON "files"("updatedById");

-- CreateIndex
CREATE INDEX "_DevelopmentProjectToFile_B_index" ON "_DevelopmentProjectToFile"("B");

-- CreateIndex
CREATE INDEX "_FileToGallery_B_index" ON "_FileToGallery"("B");

-- CreateIndex
CREATE UNIQUE INDEX "committee_members_avatarId_key" ON "committee_members"("avatarId");

-- CreateIndex
CREATE INDEX "committee_members_isActive_idx" ON "committee_members"("isActive");

-- CreateIndex
CREATE INDEX "development_projects_createdById_idx" ON "development_projects"("createdById");

-- CreateIndex
CREATE INDEX "development_projects_updatedById_idx" ON "development_projects"("updatedById");

-- CreateIndex
CREATE INDEX "donations_donorId_idx" ON "donations"("donorId");

-- CreateIndex
CREATE INDEX "donations_paymentMethod_idx" ON "donations"("paymentMethod");

-- CreateIndex
CREATE INDEX "donations_createdById_idx" ON "donations"("createdById");

-- CreateIndex
CREATE INDEX "donations_updatedById_idx" ON "donations"("updatedById");

-- CreateIndex
CREATE UNIQUE INDEX "families_familyNo_key" ON "families"("familyNo");

-- CreateIndex
CREATE UNIQUE INDEX "families_avatarId_key" ON "families"("avatarId");

-- CreateIndex
CREATE INDEX "families_isActive_idx" ON "families"("isActive");

-- CreateIndex
CREATE INDEX "galleries_createdById_idx" ON "galleries"("createdById");

-- CreateIndex
CREATE INDEX "galleries_updatedById_idx" ON "galleries"("updatedById");

-- CreateIndex
CREATE UNIQUE INDEX "users_avatarId_key" ON "users"("avatarId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "committee_members" ADD CONSTRAINT "committee_members_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "families" ADD CONSTRAINT "families_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FamilyFee" ADD CONSTRAINT "FamilyFee_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "families"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "families"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_monthlyChargeId_fkey" FOREIGN KEY ("monthlyChargeId") REFERENCES "MonthlyCharge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MonthlyCharge" ADD CONSTRAINT "MonthlyCharge_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "families"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donors" ADD CONSTRAINT "donors_avatarId_fkey" FOREIGN KEY ("avatarId") REFERENCES "files"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_donorId_fkey" FOREIGN KEY ("donorId") REFERENCES "donors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "donations" ADD CONSTRAINT "donations_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "development_projects" ADD CONSTRAINT "development_projects_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "development_projects" ADD CONSTRAINT "development_projects_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "galleries" ADD CONSTRAINT "galleries_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DevelopmentProjectToFile" ADD CONSTRAINT "_DevelopmentProjectToFile_A_fkey" FOREIGN KEY ("A") REFERENCES "development_projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DevelopmentProjectToFile" ADD CONSTRAINT "_DevelopmentProjectToFile_B_fkey" FOREIGN KEY ("B") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToGallery" ADD CONSTRAINT "_FileToGallery_A_fkey" FOREIGN KEY ("A") REFERENCES "files"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToGallery" ADD CONSTRAINT "_FileToGallery_B_fkey" FOREIGN KEY ("B") REFERENCES "galleries"("id") ON DELETE CASCADE ON UPDATE CASCADE;
