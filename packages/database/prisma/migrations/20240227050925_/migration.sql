/*
  Warnings:

  - Added the required column `checkInKey` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participant" ADD COLUMN     "checkInKey" TEXT NOT NULL;
