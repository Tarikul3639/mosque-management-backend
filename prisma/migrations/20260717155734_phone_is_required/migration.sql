/*
  Warnings:

  - Made the column `phone` on table `committee_members` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `donations` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `families` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "committee_members" ALTER COLUMN "phone" SET NOT NULL;

-- AlterTable
ALTER TABLE "donations" ALTER COLUMN "phone" SET NOT NULL;

-- AlterTable
ALTER TABLE "families" ALTER COLUMN "phone" SET NOT NULL;
