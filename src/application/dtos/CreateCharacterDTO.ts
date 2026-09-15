import { CharacterClass, CharacterRace, CharacterAlliance } from '../../domain/entities/Character';

export interface CreateCharacterDTO {
  id: string;
  nome: string;
  raca: CharacterRace;
  classes: CharacterClass[];
  aliancas: CharacterAlliance[];
  planetaNatal: string;
}