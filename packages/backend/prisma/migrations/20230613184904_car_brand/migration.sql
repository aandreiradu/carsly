/*
  Warnings:

  - You are about to drop the column `vehicleCategory` on the `CarModel` table. All the data in the column will be lost.
  - Added the required column `fuel` to the `CarModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CarModel" DROP COLUMN "vehicleCategory",
ADD COLUMN     "fuel" "FuelType" NOT NULL;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "refreshToken" DROP NOT NULL;
