-- CreateTable
CREATE TABLE "Attrubute" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organizationId" TEXT NOT NULL,
    "eventId" UUID NOT NULL,

    CONSTRAINT "Attrubute_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantAttrubute" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "participantId" UUID NOT NULL,
    "attrubuteId" UUID NOT NULL,

    CONSTRAINT "ParticipantAttrubute_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attrubute" ADD CONSTRAINT "Attrubute_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attrubute" ADD CONSTRAINT "Attrubute_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantAttrubute" ADD CONSTRAINT "ParticipantAttrubute_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantAttrubute" ADD CONSTRAINT "ParticipantAttrubute_attrubuteId_fkey" FOREIGN KEY ("attrubuteId") REFERENCES "Attrubute"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
