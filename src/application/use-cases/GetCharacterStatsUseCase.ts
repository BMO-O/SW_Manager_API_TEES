import { ICharacterRepository } from '../../domain/repositories/ICharacterRepository';

interface CharacterStats {
  totalCharacters: number;
  racesCount: Record<string, number>;
  classesCount: Record<string, number>;
  alliancesCount: Record<string, number>;
}

export class GetCharacterStatsUseCase {
  constructor(private characterRepository: ICharacterRepository) {}

  async execute(): Promise<CharacterStats> {
    const characters = await this.characterRepository.findAll();

    const racesCount: Record<string, number> = {};
    const classesCount: Record<string, number> = {};
    const alliancesCount: Record<string, number> = {};

    for (const character of characters) {
      racesCount[character.raca] = (racesCount[character.raca] ?? 0) + 1;

      for (const classe of character.classes) {
        classesCount[classe] = (classesCount[classe] ?? 0) + 1;
      }

      for (const alianca of character.aliancas) {
        alliancesCount[alianca] = (alliancesCount[alianca] ?? 0) + 1;
      }
    }

    return {
      totalCharacters: characters.length,
      racesCount,
      classesCount,
      alliancesCount,
    };
  }
}