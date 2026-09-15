import { Character, CharacterClass, CharacterRace, CharacterAlliance } from '../../../domain/entities/Character';
import { ICharacterRepository } from '../../../domain/repositories/ICharacterRepository';

export class InMemoryCharacterRepository implements ICharacterRepository {
  private characters: Character[] = [];

  async findAll(): Promise<Character[]> {
    return this.characters;
  }

  async findByClasse(classe: CharacterClass): Promise<Character[]> {
    return this.characters.filter((c) => c.classes.includes(classe));
  }

  async findByAlianca(alianca: CharacterAlliance): Promise<Character[]> {
    return this.characters.filter((c) => c.aliancas.includes(alianca));
  }

  async findByRaca(raca: CharacterRace): Promise<Character[]> {
    return this.characters.filter((c) => c.raca === raca);
  }

  async findById(id: string): Promise<Character | null> {
    return this.characters.find((c) => c.id === id) ?? null;
  }

  async create(character: Character): Promise<void> {
    this.characters.push(character);
  }

  async update(character: Character): Promise<void> {
    const index = this.characters.findIndex((c) => c.id === character.id);
    if (index >= 0) {
      this.characters[index] = character;
    }
  }

  async delete(id: string): Promise<void> {
    this.characters = this.characters.filter((c) => c.id !== id);
  }
}