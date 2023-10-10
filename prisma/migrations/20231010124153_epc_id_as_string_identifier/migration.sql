/*
  Warnings:

  - The primary key for the `MaterialProductLink` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[epcId]` on the table `MaterialProductLink` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."MaterialProductLink_id_key";

-- AlterTable
ALTER TABLE "public"."MaterialProductLink" DROP CONSTRAINT "MaterialProductLink_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ADD CONSTRAINT "MaterialProductLink_pkey" PRIMARY KEY ("epcId");
DROP SEQUENCE "MaterialProductLink_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "MaterialProductLink_epcId_key" ON "public"."MaterialProductLink"("epcId");
