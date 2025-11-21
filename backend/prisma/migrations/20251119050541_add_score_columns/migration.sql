/*
  Warnings:

  - You are about to drop the column `scoreTime` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "scoreTime",
ADD COLUMN     "beachScore" INTEGER,
ADD COLUMN     "skiingScore" INTEGER,
ADD COLUMN     "spaceScore" INTEGER;
