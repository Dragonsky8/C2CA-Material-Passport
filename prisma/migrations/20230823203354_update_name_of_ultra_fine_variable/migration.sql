/*
  Warnings:

  - You are about to drop the column `vormvastheid` on the `RawMaterial` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."RawMaterial" DROP COLUMN "vormvastheid",
ADD COLUMN     "vormVastheid" TEXT;
