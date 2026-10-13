import { ICharacterRepository } from '../../domain/repositories/ICharacterRepository';
import { Character, CharacterClass, CharacterRace, CharacterAlliance } from '../../domain/entities/Character';

interface ListCharactersFilters {
  classe?: string;
  raca?: string;
  alianca?: string;
  nome?: string;
  page?: number;
  limit?: number;
}

interface ListCharactersResult {
  data: Character[];
  meta: {
    page: number;
    limit: number;
    total: number;
  };
}

export class ListCharactersUseCase {
  constructor(private characterRepository: ICharacterRepository) {}

  async execute(filters: ListCharactersFilters): Promise<ListCharactersResult> {
    const allCharacters = await this.characterRepository.findAll();

    const filtered = allCharacters.filter((character) => {
      const matchClasse =
        !filters.classe || character.classes.includes(filters.classe as CharacterClass);

      const matchRaca =
        !filters.raca || character.raca === (filters.raca as CharacterRace);

      const matchAlianca =
        !filters.alianca || character.aliancas.includes(filters.alianca as CharacterAlliance);

      const matchNome =
        !filters.nome || character.nome.toLowerCase().includes(filters.nome.toLowerCase());

      return matchClasse && matchRaca && matchAlianca && matchNome;
    });

    const page = filters.page ?? 1;
    const limit = filters.limit ?? 10;
    const start = (page - 1) * limit;
    const end = start + limit;

    return {
      data: filtered.slice(start, end),
      meta: {
        page,
        limit,
        total: filtered.length,
      },
    };
  }
}