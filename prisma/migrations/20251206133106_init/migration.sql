-- CreateTable
CREATE TABLE "Website" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DomainAddress" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DomainAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IPAddress" (
    "id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "websiteId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IPAddress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "DomainAddress_websiteId_idx" ON "DomainAddress"("websiteId");

-- CreateIndex
CREATE INDEX "IPAddress_websiteId_idx" ON "IPAddress"("websiteId");

-- AddForeignKey
ALTER TABLE "DomainAddress" ADD CONSTRAINT "DomainAddress_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IPAddress" ADD CONSTRAINT "IPAddress_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE CASCADE ON UPDATE CASCADE;
