-- DropForeignKey
ALTER TABLE "public"."Build" DROP CONSTRAINT "Build_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Production" DROP CONSTRAINT "Production_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Recycle" DROP CONSTRAINT "Recycle_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."Use" DROP CONSTRAINT "Use_id_fkey";

-- CreateTable
CREATE TABLE "public"."Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_id_key" ON "public"."Product"("id");

-- AddForeignKey
ALTER TABLE "public"."Product" ADD CONSTRAINT "Product_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Production" ADD CONSTRAINT "Production_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Build" ADD CONSTRAINT "Build_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Use" ADD CONSTRAINT "Use_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Recycle" ADD CONSTRAINT "Recycle_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
