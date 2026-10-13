import { ICharacterRepository } from '../../domain/repositories/ICharacterRepository';
import { CharacterClass } from '../../domain/entities/Character';
import { ResourceNotFoundError } from '../../domain/errors/ResourceNotFoundError';

interface EvolveCharacterClassRequest {
  id: string;
  fromClass: CharacterClass;
  toClass: CharacterClass;
}

export class EvolveCharacterClassUseCase {
  constructor(private readonly characterRepository: ICharacterRepository) {}

  async execute({ id, fromClass, toClass }: EvolveCharacterClassRequest) {
    const character = await this.characterRepository.findById(id);

    if (!character) {
      throw new ResourceNotFoundError(`Personagem com ID "${id}" não encontrado.`);
    }

    character.evolveClass(fromClass, toClass);
    await this.characterRepository.update(character);

    return character;
  }
}