import { ICharacterRepository } from '../../domain/repositories/ICharacterRepository';
import { Character } from '../../domain/entities/Character';
import { CharacterClass, CharacterRace, CharacterAlliance } from '../../domain/entities/Character';

interface ListCharactersFilters {
  classe?: string;
  raca?: string;
  alianca?: string;
}

export class ListCharactersUseCase {
  constructor(private characterRepository: ICharacterRepository) {}

  async execute(filters: ListCharactersFilters): Promise<Character[]> {
    const characters = await this.characterRepository.findAll();

    return characters.filter((character) => {
      const matchClasse =
        !filters.classe || character.classes.includes(filters.classe as CharacterClass);

      const matchRaca =
        !filters.raca || character.raca === (filters.raca as CharacterRace);

      const matchAlianca =
        !filters.alianca || character.aliancas.includes(filters.alianca as CharacterAlliance);

      return matchClasse && matchRaca && matchAlianca;
    });
  }
}