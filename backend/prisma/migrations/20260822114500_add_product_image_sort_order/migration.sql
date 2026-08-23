ALTER TABLE "ProductImage"
ADD COLUMN IF NOT EXISTS "sortOrder" INTEGER NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS "ProductImage_productId_sortOrder_idx"
ON "ProductImage"("productId", "sortOrder");
