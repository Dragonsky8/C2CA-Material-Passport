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
    "materialType" TEXT NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RawMaterial" (
    "id" INTEGER NOT NULL,
    "sand" TEXT,
    "producer" TEXT,
    "dateOfProduction" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RawMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Production" (
    "id" INTEGER NOT NULL,
    "name" TEXT,
    "weight" TEXT,
    "volume" TEXT,
    "density" TEXT,
    "area" TEXT,
    "compressionStrength" TEXT,
    "loadBearing" TEXT,
    "stability" TEXT,
    "resistance" TEXT,

    CONSTRAINT "Production_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Build" (
    "id" INTEGER NOT NULL,
    "name" TEXT,
    "constructor" TEXT,

    CONSTRAINT "Build_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Use" (
    "id" INTEGER NOT NULL,
    "name" TEXT,
    "location" TEXT,
    "buildingDate" TIMESTAMP(3),

    CONSTRAINT "Use_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Recycle" (
    "id" INTEGER NOT NULL,
    "name" TEXT,
    "recyclingCompany" TEXT,

    CONSTRAINT "Recycle_pkey" PRIMARY KEY ("id")
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
    "materialType" TEXT NOT NULL,

    CONSTRAINT "MaterialVersion_pkey" PRIMARY KEY ("versionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Material_id_key" ON "public"."Material"("id");

-- CreateIndex
CREATE UNIQUE INDEX "RawMaterial_id_key" ON "public"."RawMaterial"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Production_id_key" ON "public"."Production"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Build_id_key" ON "public"."Build"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Use_id_key" ON "public"."Use"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Recycle_id_key" ON "public"."Recycle"("id");

-- AddForeignKey
ALTER TABLE "public"."RawMaterial" ADD CONSTRAINT "RawMaterial_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Production" ADD CONSTRAINT "Production_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Build" ADD CONSTRAINT "Build_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Use" ADD CONSTRAINT "Use_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Recycle" ADD CONSTRAINT "Recycle_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."Material"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit"."MaterialVersion" ADD CONSTRAINT "MaterialVersion_versionMaterialId_fkey" FOREIGN KEY ("versionMaterialId") REFERENCES "public"."Material"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit"."MaterialVersion" ADD CONSTRAINT "MaterialVersion_versionUserId_fkey" FOREIGN KEY ("versionUserId") REFERENCES "public"."Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
