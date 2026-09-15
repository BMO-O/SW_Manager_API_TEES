import { CharacterClass, CharacterRace, CharacterAlliance } from '../../domain/entities/Character';

export interface UpdateCharacterDTO {
  nome?: string;
  raca?: CharacterRace;
  classes?: CharacterClass[];
  aliancas?: CharacterAlliance[];
  planetaNatal?: string;
}