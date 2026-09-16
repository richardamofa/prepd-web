CREATE TYPE "AdminActivityType" AS ENUM ('ORDER_CREATED', 'CUSTOMIZATION_REQUEST_CREATED', 'CONTACT_MESSAGE_CREATED', 'ADMIN_LOGIN', 'ORDER_DELETED', 'CUSTOMIZATION_REQUEST_DELETED', 'CONTACT_MESSAGE_DELETED');

CREATE TABLE "AdminActivity" (
    "id" TEXT NOT NULL,
    "type" "AdminActivityType" NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "entityType" TEXT,
    "entityId" TEXT,
    "adminId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminActivity_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "AdminActivity_createdAt_idx" ON "AdminActivity"("createdAt");
CREATE INDEX "AdminActivity_type_idx" ON "AdminActivity"("type");
CREATE INDEX "AdminActivity_adminId_idx" ON "AdminActivity"("adminId");

ALTER TABLE "AdminActivity" ADD CONSTRAINT "AdminActivity_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "AdminUser"("id") ON DELETE SET NULL ON UPDATE CASCADE;