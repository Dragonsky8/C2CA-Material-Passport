/*
  Warnings:

  - The primary key for the `MaterialProductLink` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `linkId` on the `MaterialProductLink` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rfidId]` on the table `MaterialProductLink` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."MaterialProductLink_linkId_key";

-- AlterTable
ALTER TABLE "public"."MaterialProductLink" DROP CONSTRAINT "MaterialProductLink_pkey",
DROP COLUMN "linkId",
ADD COLUMN     "rfidId" SERIAL NOT NULL,
ADD CONSTRAINT "MaterialProductLink_pkey" PRIMARY KEY ("rfidId");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialProductLink_rfidId_key" ON "public"."MaterialProductLink"("rfidId");
