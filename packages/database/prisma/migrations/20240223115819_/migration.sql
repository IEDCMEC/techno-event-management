-- AlterTable
ALTER TABLE "ParticipantExtrasCheckIn" ADD COLUMN     "extrasId" UUID;

-- AddForeignKey
ALTER TABLE "ParticipantExtrasCheckIn" ADD CONSTRAINT "ParticipantExtrasCheckIn_extrasId_fkey" FOREIGN KEY ("extrasId") REFERENCES "Extras"("id") ON DELETE SET NULL ON UPDATE CASCADE;
