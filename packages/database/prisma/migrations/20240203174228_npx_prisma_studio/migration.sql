/*
  Warnings:

  - You are about to drop the `Attrubute` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ParticipantAttrubute` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Attrubute" DROP CONSTRAINT "Attrubute_eventId_fkey";

-- DropForeignKey
ALTER TABLE "Attrubute" DROP CONSTRAINT "Attrubute_organizationId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantAttrubute" DROP CONSTRAINT "ParticipantAttrubute_attrubuteId_fkey";

-- DropForeignKey
ALTER TABLE "ParticipantAttrubute" DROP CONSTRAINT "ParticipantAttrubute_participantId_fkey";

-- DropTable
DROP TABLE "Attrubute";

-- DropTable
DROP TABLE "ParticipantAttrubute";

-- CreateTable
CREATE TABLE "Attributes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "organizationId" TEXT NOT NULL,
    "eventId" UUID NOT NULL,

    CONSTRAINT "Attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ParticipantAttributes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "participantId" UUID NOT NULL,
    "attributeId" UUID NOT NULL,

    CONSTRAINT "ParticipantAttributes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Attributes" ADD CONSTRAINT "Attributes_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attributes" ADD CONSTRAINT "Attributes_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantAttributes" ADD CONSTRAINT "ParticipantAttributes_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ParticipantAttributes" ADD CONSTRAINT "ParticipantAttributes_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
