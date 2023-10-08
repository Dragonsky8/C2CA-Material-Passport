/*
  Warnings:

  - The primary key for the `MaterialProductLink` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `rfidId` on the `MaterialProductLink` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `MaterialProductLink` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."MaterialProductLink_rfidId_key";

-- AlterTable
ALTER TABLE "public"."MaterialProductLink" DROP CONSTRAINT "MaterialProductLink_pkey",
DROP COLUMN "rfidId",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "MaterialProductLink_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "MaterialProductLink_id_key" ON "public"."MaterialProductLink"("id");
