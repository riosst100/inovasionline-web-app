/*
  Warnings:

  - A unique constraint covering the columns `[orderItemId,vendorId]` on the table `VendorAssignment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `sellerType` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderSellerType" AS ENUM ('VENDOR', 'PARTNER');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "sellerType" "OrderSellerType" NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "eventDate" TIMESTAMP(3);

-- CreateIndex
CREATE INDEX "Order_partnerId_idx" ON "Order"("partnerId");

-- CreateIndex
CREATE INDEX "Order_vendorId_idx" ON "Order"("vendorId");

-- CreateIndex
CREATE INDEX "Order_status_idx" ON "Order"("status");

-- CreateIndex
CREATE INDEX "VendorAssignment_vendorId_idx" ON "VendorAssignment"("vendorId");

-- CreateIndex
CREATE INDEX "VendorAssignment_status_idx" ON "VendorAssignment"("status");

-- CreateIndex
CREATE UNIQUE INDEX "VendorAssignment_orderItemId_vendorId_key" ON "VendorAssignment"("orderItemId", "vendorId");
