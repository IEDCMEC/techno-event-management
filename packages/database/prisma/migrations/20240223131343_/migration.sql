/*
  Warnings:

  - You are about to drop the column `extrasId` on the `ParticipantExtrasCheckIn` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ParticipantExtrasCheckIn" DROP CONSTRAINT "ParticipantExtrasCheckIn_extrasId_fkey";

-- AlterTable
ALTER TABLE "ParticipantExtrasCheckIn" DROP COLUMN "extrasId",
ADD COLUMN     "extraId" UUID;

-- AddForeignKey
ALTER TABLE "ParticipantExtrasCheckIn" ADD CONSTRAINT "ParticipantExtrasCheckIn_extraId_fkey" FOREIGN KEY ("extraId") REFERENCES "Extras"("id") ON DELETE SET NULL ON UPDATE CASCADE;
