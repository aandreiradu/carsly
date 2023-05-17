/*
  Warnings:

  - You are about to drop the column `carBodyTypeId` on the `CarModel` table. All the data in the column will be lost.
  - You are about to drop the column `carBrandId` on the `CarModel` table. All the data in the column will be lost.
  - You are about to drop the column `productCategory` on the `CarModel` table. All the data in the column will be lost.
  - You are about to drop the `CarBodyType` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `cars_brand` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bodyType` to the `CarModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandId` to the `CarModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vehicleCategory` to the `CarModel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `confirmPassword` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VehicleBodyType" AS ENUM ('cabriolet', 'roadster', 'estate', 'saloon', 'small', 'sport', 'coupe', 'suv', 'off_road', 'pickup_truck', 'van', 'minibus');

-- CreateEnum
CREATE TYPE "VehicleCategory" AS ENUM ('car', 'motorbike', 'motorhome', 'truck');

-- DropForeignKey
ALTER TABLE "CarModel" DROP CONSTRAINT "CarModel_carBodyTypeId_fkey";

-- DropForeignKey
ALTER TABLE "CarModel" DROP CONSTRAINT "CarModel_carBrandId_fkey";

-- AlterTable
ALTER TABLE "CarModel" DROP COLUMN "carBodyTypeId",
DROP COLUMN "carBrandId",
DROP COLUMN "productCategory",
ADD COLUMN     "bodyType" "VehicleBodyType" NOT NULL,
ADD COLUMN     "brandId" TEXT NOT NULL,
ADD COLUMN     "vehicleCategory" "VehicleCategory" NOT NULL;

-- AlterTable
ALTER TABLE "cars_brand" ADD COLUMN     "description" TEXT,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "yearOfEst" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "confirmPassword" TEXT NOT NULL;

-- DropTable
DROP TABLE "CarBodyType";

-- DropEnum
DROP TYPE "ProductCategory";

-- CreateIndex
CREATE UNIQUE INDEX "cars_brand_name_key" ON "cars_brand"("name");

-- AddForeignKey
ALTER TABLE "CarModel" ADD CONSTRAINT "CarModel_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "cars_brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
