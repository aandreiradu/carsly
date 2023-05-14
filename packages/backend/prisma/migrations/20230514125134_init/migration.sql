-- CreateEnum
CREATE TYPE "ProductCategory" AS ENUM ('car', 'motorbike', 'motorhome', 'truck');

-- CreateEnum
CREATE TYPE "PowerCategory" AS ENUM ('hp', 'kw');

-- CreateEnum
CREATE TYPE "FuelType" AS ENUM ('petrol', 'electric', 'LPG', 'CNG', 'hybrid', 'diesel', 'hydrogen');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars_transmision" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "cars_transmision_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cars_brand" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "cars_brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarBodyType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CarBodyType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CarModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "productCategory" "ProductCategory" NOT NULL,
    "carBrandId" TEXT NOT NULL,
    "carBodyTypeId" TEXT NOT NULL,

    CONSTRAINT "CarModel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ad" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "year" TIMESTAMP(3) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "mileage" DOUBLE PRECISION NOT NULL,
    "fuelType" "FuelType" NOT NULL,
    "powerCategory" "PowerCategory" NOT NULL,
    "power" DOUBLE PRECISION NOT NULL,
    "engineSize" DOUBLE PRECISION NOT NULL,
    "color" TEXT NOT NULL,
    "carModelId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ad_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "cars_transmision_name_key" ON "cars_transmision"("name");

-- AddForeignKey
ALTER TABLE "CarModel" ADD CONSTRAINT "CarModel_carBrandId_fkey" FOREIGN KEY ("carBrandId") REFERENCES "cars_brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CarModel" ADD CONSTRAINT "CarModel_carBodyTypeId_fkey" FOREIGN KEY ("carBodyTypeId") REFERENCES "CarBodyType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ad" ADD CONSTRAINT "Ad_carModelId_fkey" FOREIGN KEY ("carModelId") REFERENCES "CarModel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
