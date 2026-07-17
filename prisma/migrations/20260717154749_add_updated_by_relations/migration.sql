-- AlterTable
ALTER TABLE "collections" ADD COLUMN     "updatedById" TEXT;

-- AlterTable
ALTER TABLE "expenses" ADD COLUMN     "updatedById" TEXT;

-- AlterTable
ALTER TABLE "families" ADD COLUMN     "avatar" TEXT;

-- CreateIndex
CREATE INDEX "collections_receiptNo_idx" ON "collections"("receiptNo");

-- CreateIndex
CREATE INDEX "collections_updatedById_idx" ON "collections"("updatedById");

-- CreateIndex
CREATE INDEX "development_projects_startDate_idx" ON "development_projects"("startDate");

-- CreateIndex
CREATE INDEX "donations_phone_idx" ON "donations"("phone");

-- CreateIndex
CREATE INDEX "donations_donorName_idx" ON "donations"("donorName");

-- CreateIndex
CREATE INDEX "donations_receiptNo_idx" ON "donations"("receiptNo");

-- CreateIndex
CREATE INDEX "expenses_updatedById_idx" ON "expenses"("updatedById");

-- CreateIndex
CREATE INDEX "galleries_order_idx" ON "galleries"("order");

-- CreateIndex
CREATE INDEX "users_status_idx" ON "users"("status");

-- AddForeignKey
ALTER TABLE "collections" ADD CONSTRAINT "collections_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "expenses" ADD CONSTRAINT "expenses_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
