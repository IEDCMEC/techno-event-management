/*
  Warnings:

  - A unique constraint covering the columns `[email,eventId]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.
  - Made the column `email` on table `Participant` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Participant" ALTER COLUMN "email" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Participant_email_eventId_key" ON "Participant"("email", "eventId");
