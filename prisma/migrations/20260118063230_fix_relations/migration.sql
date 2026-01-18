/*
  Warnings:

  - You are about to drop the column `eventDate` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `vendorId` on the `OrderItem` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Vendor` table. All the data in the column will be lost.
  - Added the required column `type` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Vendor` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('EVENT_SERVICE', 'EVENT_TICKET', 'SOUND', 'STAGE', 'LIGHTING', 'ARTIST', 'OTHER');

-- CreateEnum
CREATE TYPE "VendorAssignmentSource" AS ENUM ('DIRECT', 'PARTNER');

-- CreateEnum
CREATE TYPE "VendorAssignmentStatus" AS ENUM ('PENDING', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "OrderItem" DROP CONSTRAINT "OrderItem_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_vendorId_fkey";

-- DropForeignKey
ALTER TABLE "Vendor" DROP CONSTRAINT "Vendor_userId_fkey";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "eventDate",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "vendorId" TEXT;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "vendorId";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "partnerId" TEXT,
ADD COLUMN     "type" "ProductType" NOT NULL,
ALTER COLUMN "vendorId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Vendor" DROP COLUMN "category",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "company" DROP NOT NULL;

-- CreateTable
CREATE TABLE "VendorAssignment" (
    "id" TEXT NOT NULL,
    "orderItemId" TEXT NOT NULL,
    "vendorId" TEXT NOT NULL,
    "source" "VendorAssignmentSource" NOT NULL,
    "status" "VendorAssignmentStatus" NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "VendorAssignment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Vendor" ADD CONSTRAINT "Vendor_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorAssignment" ADD CONSTRAINT "VendorAssignment_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "OrderItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VendorAssignment" ADD CONSTRAINT "VendorAssignment_vendorId_fkey" FOREIGN KEY ("vendorId") REFERENCES "Vendor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
