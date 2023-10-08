-- AlterTable
CREATE SEQUENCE "public".rawmaterial_id_seq;
ALTER TABLE "public"."RawMaterial" ALTER COLUMN "id" SET DEFAULT nextval('"public".rawmaterial_id_seq');
ALTER SEQUENCE "public".rawmaterial_id_seq OWNED BY "public"."RawMaterial"."id";
