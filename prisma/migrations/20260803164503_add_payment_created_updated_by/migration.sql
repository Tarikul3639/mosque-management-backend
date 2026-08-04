-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_createdById_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_updatedById_fkey";

-- AlterTable
ALTER TABLE "payments" ALTER COLUMN "createdById" DROP NOT NULL,
ALTER COLUMN "updatedById" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
