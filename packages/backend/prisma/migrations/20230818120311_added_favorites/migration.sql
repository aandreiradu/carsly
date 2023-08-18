/*
  Warnings:

  - The values [petrol,electric,hybrid,diesel,hydrogen] on the enum `FuelType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Ad` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CarModel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `cars_transmision` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AdStatus" AS ENUM ('PENDING', 'ACCEPTED', 'DELETED', 'EXPIRED');

-- CreateEnum
CREATE TYPE "GearboxTypes" AS ENUM ('Manual', 'Automatic', 'SemiAutomatic');

-- CreateEnum
CREATE TYPE "TransmissionTypes" AS ENUM ('fourByFourAutomatic', 'fourByFourManual', 'rear', 'front');

-- CreateEnum
CREATE TYPE "PolluationNormTypes" AS ENUM ('ParticleFilter', 'Euro_1', 'Euro_2', 'Euro_3', 'Euro_4', 'Euro_5', 'Euro_5a', 'Euro_5b', 'Euro_6', 'Euro_6b', 'Euro_6c', 'Euro_6d', 'Euro_6d_temp', 'Non_euro');

-- CreateEnum
CREATE TYPE "CarsColors" AS ENUM ('White', 'Blue', 'Silver', 'Beige', 'Yellow', 'Gray', 'Brown', 'Black', 'Orange', 'Red', 'Green', 'Others');

-- CreateEnum
CREATE TYPE "ColorTypes" AS ENUM ('Matte', 'Metallic', 'Pearl');

-- CreateEnum
CREATE TYPE "CountriesTypes" AS ENUM ('AFGHANISTAN', 'ALBANIA', 'ALGERIA', 'ANDORRA', 'ANGOLA', 'ANTIGUA_AND_BARBUDA', 'ARGENTINA', 'ARMENIA', 'AUSTRALIA', 'AUSTRIA', 'AZERBAIJAN', 'BAHAMAS', 'BAHRAIN', 'BANGLADESH', 'BARBADOS', 'BELARUS', 'BELGIUM', 'BELIZE', 'BENIN', 'BHUTAN', 'BOLIVIA', 'BOSNIA_AND_HERZEGOVINA', 'BOTSWANA', 'BRAZIL', 'BRUNEI', 'BULGARIA', 'BURKINA_FASO', 'BURUNDI', 'COTE_DIVOIRE', 'CABO_VERDE', 'CAMBODIA', 'CAMEROON', 'CANADA', 'CENTRAL_AFRICAN_REPUBLIC', 'CHAD', 'CHILE', 'CHINA', 'COLOMBIA', 'COMOROS', 'CONGO', 'COSTA_RICA', 'CROATIA', 'CUBA', 'CYPRUS', 'CZECH_REPUBLIC', 'DEMOCRATIC_REPUBLIC_OF_THE_CONGO', 'DENMARK', 'DJIBOUTI', 'DOMINICA', 'DOMINICAN_REPUBLIC', 'ECUADOR', 'EGYPT', 'EL_SALVADOR', 'EQUATORIAL_GUINEA', 'ERITREA', 'ESTONIA', 'ESWATINI', 'ETHIOPIA', 'FIJI', 'FINLAND', 'FRANCE', 'GABON', 'GAMBIA', 'GEORGIA', 'GERMANY', 'GHANA', 'GREECE', 'GRENADA', 'GUATEMALA', 'GUINEA', 'GUINEA_BISSAU', 'GUYANA', 'HAITI', 'HOLY_SEE', 'HONDURAS', 'HUNGARY', 'ICELAND', 'INDIA', 'INDONESIA', 'IRAN', 'IRAQ', 'IRELAND', 'ISRAEL', 'ITALY', 'JAMAICA', 'JAPAN', 'JORDAN', 'KAZAKHSTAN', 'KENYA', 'KIRIBATI', 'KUWAIT', 'KYRGYZSTAN', 'LAOS', 'LATVIA', 'LEBANON', 'LESOTHO', 'LIBERIA', 'LIBYA', 'LIECHTENSTEIN', 'LITHUANIA', 'LUXEMBOURG', 'MADAGASCAR', 'MALAWI', 'MALAYSIA', 'MALDIVES', 'MALI', 'MALTA', 'MARSHALL_ISLANDS', 'MAURITANIA', 'MAURITIUS', 'MEXICO', 'MICRONESIA', 'MOLDOVA', 'MONACO', 'MONGOLIA', 'MONTENEGRO', 'MOROCCO', 'MOZAMBIQUE', 'MYANMAR', 'NAMIBIA', 'NAURU', 'NEPAL', 'NETHERLANDS', 'NEW_ZEALAND', 'NICARAGUA', 'NIGER', 'NIGERIA', 'NORTH_KOREA', 'NORTH_MACEDONIA', 'NORWAY', 'OMAN', 'PAKISTAN', 'PALAU', 'PALESTINE_STATE', 'PANAMA', 'PAPUA_NEW_GUINEA', 'PARAGUAY', 'PERU', 'PHILIPPINES', 'POLAND', 'PORTUGAL', 'QATAR', 'ROMANIA', 'RUSSIA', 'RWANDA', 'SAINT_KITTS_AND_NEVIS', 'SAINT_LUCIA', 'SAINT_VINCENT_AND_THE_GRENADINES', 'SAMOA');

-- CreateEnum
CREATE TYPE "CurrencyTypes" AS ENUM ('EUR', 'RON', 'USD');

-- AlterEnum
BEGIN;
CREATE TYPE "FuelType_new" AS ENUM ('Petrol', 'Electric', 'LPG', 'CNG', 'Hybrid', 'Diesel', 'Hydrogen');
ALTER TABLE "ad" ALTER COLUMN "fuelType" TYPE "FuelType_new" USING ("fuelType"::text::"FuelType_new");
ALTER TYPE "FuelType" RENAME TO "FuelType_old";
ALTER TYPE "FuelType_new" RENAME TO "FuelType";
DROP TYPE "FuelType_old";
COMMIT;

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "VehicleBodyType" ADD VALUE 'sedan';
ALTER TYPE "VehicleBodyType" ADD VALUE 'muscle_car';
ALTER TYPE "VehicleBodyType" ADD VALUE 'convertible';
ALTER TYPE "VehicleBodyType" ADD VALUE 'hatchback';
ALTER TYPE "VehicleBodyType" ADD VALUE 'Cabriolet';
ALTER TYPE "VehicleBodyType" ADD VALUE 'Roadster';
ALTER TYPE "VehicleBodyType" ADD VALUE 'Estate';
ALTER TYPE "VehicleBodyType" ADD VALUE 'Saloon';
ALTER TYPE "VehicleBodyType" ADD VALUE 'Small';
ALTER TYPE "VehicleBodyType" ADD VALUE 'Sport';
ALTER TYPE "VehicleBodyType" ADD VALUE 'Coupe';
ALTER TYPE "VehicleBodyType" ADD VALUE 'SUV';
ALTER TYPE "VehicleBodyType" ADD VALUE 'Off_road';
ALTER TYPE "VehicleBodyType" ADD VALUE 'Pickup_truck';
ALTER TYPE "VehicleBodyType" ADD VALUE 'Van';
ALTER TYPE "VehicleBodyType" ADD VALUE 'Minibus';
ALTER TYPE "VehicleBodyType" ADD VALUE 'Sedan';

-- DropForeignKey
ALTER TABLE "Ad" DROP CONSTRAINT "Ad_carModelId_fkey";

-- DropForeignKey
ALTER TABLE "Ad" DROP CONSTRAINT "Ad_userId_fkey";

-- DropForeignKey
ALTER TABLE "CarModel" DROP CONSTRAINT "CarModel_brandId_fkey";

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "adId" TEXT;

-- DropTable
DROP TABLE "Ad";

-- DropTable
DROP TABLE "CarModel";

-- DropTable
DROP TABLE "cars_transmision";

-- CreateTable
CREATE TABLE "cars_model" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "bodyType" "VehicleBodyType" NOT NULL,

    CONSTRAINT "cars_model_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "image" (
    "id" TEXT NOT NULL,
    "path" TEXT NOT NULL,
    "adId" TEXT NOT NULL,

    CONSTRAINT "image_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ad" (
    "id" TEXT NOT NULL,
    "isDamaged" BOOLEAN DEFAULT false,
    "isRightHandDrive" BOOLEAN DEFAULT false,
    "isImported" BOOLEAN DEFAULT false,
    "VIN" TEXT NOT NULL,
    "KM" DOUBLE PRECISION NOT NULL,
    "dayOfRegistration" INTEGER NOT NULL,
    "monthOfRegistration" INTEGER NOT NULL,
    "yearOfRegistration" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "fuelType" "FuelType" NOT NULL,
    "power" DOUBLE PRECISION NOT NULL,
    "engineSize" DOUBLE PRECISION NOT NULL,
    "noOfDoors" INTEGER NOT NULL,
    "gearbox" "GearboxTypes" NOT NULL,
    "transmission" "TransmissionTypes" NOT NULL,
    "polluationNorm" "PolluationNormTypes" NOT NULL,
    "co2emissions" DOUBLE PRECISION,
    "bodyType" "VehicleBodyType" NOT NULL,
    "color" "CarsColors" NOT NULL,
    "colorType" "ColorTypes" NOT NULL,
    "seats" INTEGER NOT NULL,
    "youtubeVideo" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "vehicleOrigin" "CountriesTypes" NOT NULL,
    "isFirstOwner" BOOLEAN DEFAULT false,
    "isWithoutAccident" BOOLEAN DEFAULT false,
    "isRegistered" BOOLEAN DEFAULT false,
    "isServiceCardAvailable" BOOLEAN DEFAULT false,
    "isVintageCar" BOOLEAN DEFAULT false,
    "hasTuning" BOOLEAN DEFAULT false,
    "price" DOUBLE PRECISION NOT NULL,
    "currency" "CurrencyTypes" NOT NULL,
    "isNegotiable" BOOLEAN DEFAULT false,
    "isLeasing" BOOLEAN DEFAULT false,
    "sellerFullName" TEXT NOT NULL,
    "sellerCity" TEXT NOT NULL,
    "sellerPhoneNumber" TEXT NOT NULL,
    "status" "AdStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,
    "carBrandId" TEXT NOT NULL,
    "carModelId" TEXT NOT NULL,

    CONSTRAINT "ad_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adFavorites" (
    "id" TEXT NOT NULL,
    "adId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isOfferOfTheDay" BOOLEAN DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "adFavorites_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "cars_model" ADD CONSTRAINT "cars_model_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "cars_brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_adId_fkey" FOREIGN KEY ("adId") REFERENCES "ad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ad" ADD CONSTRAINT "ad_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ad" ADD CONSTRAINT "ad_carBrandId_fkey" FOREIGN KEY ("carBrandId") REFERENCES "cars_brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ad" ADD CONSTRAINT "ad_carModelId_fkey" FOREIGN KEY ("carModelId") REFERENCES "cars_model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adFavorites" ADD CONSTRAINT "adFavorites_adId_fkey" FOREIGN KEY ("adId") REFERENCES "ad"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adFavorites" ADD CONSTRAINT "adFavorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
