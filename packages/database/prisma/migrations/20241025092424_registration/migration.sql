-- CreateTable
CREATE TABLE "Registrant" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "eventId" UUID NOT NULL,
    "organizationId" TEXT NOT NULL,

    CONSTRAINT "Registrant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistrantAttributes" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "value" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "registrantId" UUID NOT NULL,
    "attributeId" UUID NOT NULL,

    CONSTRAINT "RegistrantAttributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RegistrantExtras" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "registrantId" UUID NOT NULL,
    "extraId" UUID NOT NULL,

    CONSTRAINT "RegistrantExtras_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Registrant" ADD CONSTRAINT "Registrant_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Registrant" ADD CONSTRAINT "Registrant_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistrantAttributes" ADD CONSTRAINT "RegistrantAttributes_registrantId_fkey" FOREIGN KEY ("registrantId") REFERENCES "Registrant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistrantAttributes" ADD CONSTRAINT "RegistrantAttributes_attributeId_fkey" FOREIGN KEY ("attributeId") REFERENCES "Attributes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistrantExtras" ADD CONSTRAINT "RegistrantExtras_registrantId_fkey" FOREIGN KEY ("registrantId") REFERENCES "Registrant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RegistrantExtras" ADD CONSTRAINT "RegistrantExtras_extraId_fkey" FOREIGN KEY ("extraId") REFERENCES "Extras"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
