-- DropForeignKey
ALTER TABLE "public"."Product" DROP CONSTRAINT "Product_id_fkey";

-- CreateTable
CREATE TABLE "public"."MaterialProductLink" (
    "linkId" SERIAL NOT NULL,
    "materialId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,

    CONSTRAINT "MaterialProductLink_pkey" PRIMARY KEY ("linkId")
);

-- CreateIndex
CREATE UNIQUE INDEX "MaterialProductLink_linkId_key" ON "public"."MaterialProductLink"("linkId");

-- AddForeignKey
ALTER TABLE "public"."MaterialProductLink" ADD CONSTRAINT "MaterialProductLink_materialId_fkey" FOREIGN KEY ("materialId") REFERENCES "public"."Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."MaterialProductLink" ADD CONSTRAINT "MaterialProductLink_productId_fkey" FOREIGN KEY ("productId") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
