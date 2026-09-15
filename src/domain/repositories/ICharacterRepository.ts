import { Character, CharacterClass, CharacterRace, CharacterAlliance } from '../entities/Character';

export interface ICharacterRepository {
  findAll(): Promise<Character[]>;
  findByClasse(classe: CharacterClass): Promise<Character[]>;
  findByAlianca(alianca: CharacterAlliance): Promise<Character[]>;
  findByRaca(raca: CharacterRace): Promise<Character[]>;
  findById(id: string): Promise<Character | null>;
  create(character: Character): Promise<void>;
  update(character: Character): Promise<void>;
  delete(id: string): Promise<void>;
}