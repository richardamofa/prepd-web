CREATE TYPE "AdminRole" AS ENUM ('ADMIN', 'SUPER_ADMIN');
CREATE TYPE "CustomizationRequestStatus" AS ENUM ('PENDING', 'REVIEWING', 'QUOTED', 'APPROVED', 'IN_PROGRESS', 'COMPLETED', 'REJECTED', 'CANCELLED');
CREATE TYPE "ContactMessageStatus" AS ENUM ('UNREAD', 'READ', 'REPLIED', 'ARCHIVED');

ALTER TABLE "AdminUser"
ADD COLUMN "role" "AdminRole" NOT NULL DEFAULT 'ADMIN',
ADD COLUMN "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN "lastLogin" TIMESTAMP(3);

ALTER TABLE "Order" ADD COLUMN "notes" TEXT;

CREATE TABLE "CustomizationRequest" (
  "id" TEXT NOT NULL,
  "reference" TEXT NOT NULL,
  "customerName" TEXT NOT NULL,
  "customerEmail" TEXT NOT NULL,
  "customerPhone" TEXT,
  "productId" TEXT,
  "request" TEXT NOT NULL,
  "budget" DECIMAL(10,2),
  "status" "CustomizationRequestStatus" NOT NULL DEFAULT 'PENDING',
  "adminNotes" TEXT,
  "assignedToId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "CustomizationRequest_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "ContactMessage" (
  "id" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "email" TEXT NOT NULL,
  "phone" TEXT,
  "subject" TEXT,
  "message" TEXT NOT NULL,
  "status" "ContactMessageStatus" NOT NULL DEFAULT 'UNREAD',
  "adminNotes" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ContactMessage_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "CustomizationRequest_reference_key" ON "CustomizationRequest"("reference");
CREATE INDEX "CustomizationRequest_status_idx" ON "CustomizationRequest"("status");
CREATE INDEX "CustomizationRequest_createdAt_idx" ON "CustomizationRequest"("createdAt");
CREATE INDEX "CustomizationRequest_customerEmail_idx" ON "CustomizationRequest"("customerEmail");
CREATE INDEX "CustomizationRequest_productId_idx" ON "CustomizationRequest"("productId");
CREATE INDEX "CustomizationRequest_assignedToId_idx" ON "CustomizationRequest"("assignedToId");
CREATE INDEX "ContactMessage_status_idx" ON "ContactMessage"("status");
CREATE INDEX "ContactMessage_createdAt_idx" ON "ContactMessage"("createdAt");
CREATE INDEX "ContactMessage_email_idx" ON "ContactMessage"("email");

ALTER TABLE "CustomizationRequest" ADD CONSTRAINT "CustomizationRequest_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "CustomizationRequest" ADD CONSTRAINT "CustomizationRequest_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;
