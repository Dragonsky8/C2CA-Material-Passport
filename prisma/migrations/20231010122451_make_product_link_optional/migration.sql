-- DropForeignKey
ALTER TABLE "public"."MaterialProductLink" DROP CONSTRAINT "MaterialProductLink_productId_fkey";

-- AlterTable
ALTER TABLE "public"."MaterialProductLink" ALTER COLUMN "productId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."MaterialProductLink" ADD CONSTRAINT "MaterialProductLink_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;
