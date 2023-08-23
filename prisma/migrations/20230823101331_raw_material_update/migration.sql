/*
  Warnings:

  - You are about to drop the column `dateOfProduction` on the `RawMaterial` table. All the data in the column will be lost.
  - You are about to drop the column `producer` on the `RawMaterial` table. All the data in the column will be lost.
  - You are about to drop the column `sand` on the `RawMaterial` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."RawMaterial" DROP COLUMN "dateOfProduction",
DROP COLUMN "producer",
DROP COLUMN "sand",
ADD COLUMN     "AlkaliSilicaActivity" TEXT,
ADD COLUMN     "Asbestos" TEXT,
ADD COLUMN     "ChimicalComposition" TEXT,
ADD COLUMN     "affectBindingTime" TEXT,
ADD COLUMN     "amountFineParts" TEXT,
ADD COLUMN     "chloride" TEXT,
ADD COLUMN     "classification" TEXT,
ADD COLUMN     "contentOfAcidSolubleSulfate" TEXT,
ADD COLUMN     "contentOfWaterSolubleSulfate" TEXT,
ADD COLUMN     "emissionOfHazardousSubstances" TEXT,
ADD COLUMN     "emissionOfRadioactivity" TEXT,
ADD COLUMN     "fallThrough0063mm" TEXT,
ADD COLUMN     "fallThrough0125mm" TEXT,
ADD COLUMN     "fallThrough2mm" TEXT,
ADD COLUMN     "freezeThawSensitivity" TEXT,
ADD COLUMN     "grading" TEXT,
ADD COLUMN     "grainDensity" TEXT,
ADD COLUMN     "grainShape" TEXT,
ADD COLUMN     "granularShape" TEXT,
ADD COLUMN     "humusOrOrganicMatterContent" TEXT,
ADD COLUMN     "leachingAnions" TEXT,
ADD COLUMN     "leachingOfHeavyMetals" TEXT,
ADD COLUMN     "particleSize" TEXT,
ADD COLUMN     "qualityFineParts" TEXT,
ADD COLUMN     "resistanceToCrushing" TEXT,
ADD COLUMN     "resistanceToWear" TEXT,
ADD COLUMN     "roundAndBrokenPieces" TEXT,
ADD COLUMN     "shellContent" TEXT,
ADD COLUMN     "tolerance" TEXT,
ADD COLUMN     "totalSulfur" TEXT,
ADD COLUMN     "vormvastheid" TEXT,
ADD COLUMN     "waterAbsorption" TEXT;
