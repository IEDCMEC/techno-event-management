/*
  Warnings:

  - You are about to drop the column `eventId` on the `ParticipantExtrasCheckIn` table. All the data in the column will be lost.
  - You are about to drop the column `organizationId` on the `ParticipantExtrasCheckIn` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ParticipantExtrasCheckIn" DROP CONSTRAINT "ParticipantExtrasCheckIn_eventId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantExtrasCheckIn" DROP CONSTRAINT "ParticipantExtrasCheckIn_organizationId_fkey";

-- AlterTable
ALTER TABLE "ParticipantExtrasCheckIn" DROP COLUMN "eventId",
DROP COLUMN "organizationId";
