-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "audit";

-- CreateEnum
CREATE TYPE "audit"."AuditOperation" AS ENUM ('INSERT', 'UPDATE', 'DELETE');

-- CreateTable
CREATE TABLE "public"."Material" (
    "id" SERIAL NOT NULL,
    "dateOfProduction" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "producer" TEXT NOT NULL,
    "mixture" TEXT NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Users" (
    "id" SERIAL NOT NULL,
    "userName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit"."MaterialVersion" (
    "versionId" SERIAL NOT NULL,
    "versionOperation" "audit"."AuditOperation" NOT NULL,
    "versionMaterialId" INTEGER,
    "versionUserId" INTEGER,
    "versionTimestamp" TIMESTAMP(3) NOT NULL,
    "id" INTEGER NOT NULL,
    "dateOfProduction" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "producer" TEXT NOT NULL,
    "mixture" TEXT NOT NULL,

    CONSTRAINT "MaterialVersion_pkey" PRIMARY KEY ("versionId")
);

-- AddForeignKey
ALTER TABLE "audit"."MaterialVersion" ADD CONSTRAINT "MaterialVersion_versionMaterialId_fkey" FOREIGN KEY ("versionMaterialId") REFERENCES "public"."Material"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit"."MaterialVersion" ADD CONSTRAINT "MaterialVersion_versionUserId_fkey" FOREIGN KEY ("versionUserId") REFERENCES "public"."Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
