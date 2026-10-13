-- CreateEnum
CREATE TYPE "CharacterClass" AS ENUM ('JEDI', 'MESTRE_JEDI', 'SITH', 'LORDE_SITH', 'USUARIO_DA_FORCA', 'SOLDADO', 'OFICIAL', 'COMANDANTE', 'SENADOR', 'DIPLOMATA', 'CHANCELER', 'REI', 'CAVALEIRO_DE_REN', 'CONTRABANDISTA', 'PILOTO', 'CIVIL');

-- CreateEnum
CREATE TYPE "CharacterRace" AS ENUM ('HUMANO', 'TWILEK', 'TOGRUTA', 'WOOKIEE', 'ZABRAK', 'RODIANO', 'MON_CALAMARI', 'DATHOMIRIANO', 'DROIDE');

-- CreateEnum
CREATE TYPE "CharacterAlliance" AS ENUM ('REPUBLICA', 'SEPARATISTA', 'IMPERIO', 'REBELDE', 'ORDEM_JEDI', 'ORDEM_SITH', 'PRIMEIRA_ORDEM', 'RESISTENCIA', 'CAVALEIROS_DE_REN');

-- CreateTable
CREATE TABLE "characters" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "raca" "CharacterRace" NOT NULL,
    "classes" "CharacterClass"[],
    "aliancas" "CharacterAlliance"[],
    "planeta_natal" TEXT NOT NULL,

    CONSTRAINT "characters_pkey" PRIMARY KEY ("id")
);
