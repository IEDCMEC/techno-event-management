-- CreateTable
CREATE TABLE "Extras" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organizationId" TEXT NOT NULL,
    "eventId" UUID NOT NULL,

    CONSTRAINT "Extras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantExtras" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "participantId" UUID NOT NULL,
    "extraId" UUID NOT NULL,

    CONSTRAINT "ParticipantExtras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantExtrasCheckIn" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "checkedInAt" TIMESTAMP(3) NOT NULL,
    "checkedInBy" TEXT NOT NULL,
    "participantId" UUID NOT NULL,
    "organizationId" TEXT,
    "eventId" UUID,

    CONSTRAINT "ParticipantExtrasCheckIn_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Extras" ADD CONSTRAINT "Extras_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Extras" ADD CONSTRAINT "Extras_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantExtras" ADD CONSTRAINT "ParticipantExtras_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantExtras" ADD CONSTRAINT "ParticipantExtras_extraId_fkey" FOREIGN KEY ("extraId") REFERENCES "Extras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantExtrasCheckIn" ADD CONSTRAINT "ParticipantExtrasCheckIn_checkedInBy_fkey" FOREIGN KEY ("checkedInBy") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantExtrasCheckIn" ADD CONSTRAINT "ParticipantExtrasCheckIn_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantExtrasCheckIn" ADD CONSTRAINT "ParticipantExtrasCheckIn_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantExtrasCheckIn" ADD CONSTRAINT "ParticipantExtrasCheckIn_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE SET NULL ON UPDATE CASCADE;
