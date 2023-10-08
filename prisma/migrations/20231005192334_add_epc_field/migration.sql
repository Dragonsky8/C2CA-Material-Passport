/*
  Warnings:

  - Added the required column `epcId` to the `MaterialProductLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."MaterialProductLink" ADD COLUMN     "epcId" TEXT NOT NULL;
