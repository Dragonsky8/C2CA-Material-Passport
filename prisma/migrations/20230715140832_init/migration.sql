-- CreateTable
CREATE TABLE "Material" (
    "id" SERIAL NOT NULL,
    "dateOfProduction" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Material_pkey" PRIMARY KEY ("id")
);
