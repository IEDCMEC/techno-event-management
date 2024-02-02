/*
  Warnings:

  - You are about to drop the column `firstnName` on the `Participant` table. All the data in the column will be lost.
  - Added the required column `firstName` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "firstnName",
ADD COLUMN     "firstName" TEXT NOT NULL;
