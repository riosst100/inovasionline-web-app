-- DropIndex
DROP INDEX "Category_parentId_idx";

-- CreateIndex
CREATE INDEX "Category_slug_parentId_idx" ON "Category"("slug", "parentId");

-- CreateIndex
CREATE INDEX "Category_parentId_isActive_idx" ON "Category"("parentId", "isActive");

-- CreateIndex
CREATE INDEX "Category_showOnHomepage_isActive_homepageOrder_idx" ON "Category"("showOnHomepage", "isActive", "homepageOrder");

-- CreateIndex
CREATE INDEX "Product_vendorId_isActive_idx" ON "Product"("vendorId", "isActive");
