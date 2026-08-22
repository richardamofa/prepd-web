/*
  Warnings:

  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `alt` on the `ProductImage` table. All the data in the column will be lost.
  - Made the column `description` on table `Product` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longDescription` on table `Product` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image",
ALTER COLUMN "currency" DROP DEFAULT,
ALTER COLUMN "description" SET NOT NULL,
ALTER COLUMN "longDescription" SET NOT NULL;

-- AlterTable
ALTER TABLE "ProductImage" DROP COLUMN "alt",
ADD COLUMN     "altText" TEXT;
