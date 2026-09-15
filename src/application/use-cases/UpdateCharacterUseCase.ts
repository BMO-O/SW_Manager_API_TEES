import { ICharacterRepository } from '../../domain/repositories/ICharacterRepository';
import { ResourceNotFoundError } from '../../domain/errors/ResourceNotFoundError';
import { UpdateCharacterDTO } from '../dtos/UpdateCharacterDTO';

export class UpdateCharacterUseCase {
  constructor(private characterRepository: ICharacterRepository) {}

  async execute(id: string, data: UpdateCharacterDTO) {
    const character = await this.characterRepository.findById(id);
    if (!character) {
      throw new ResourceNotFoundError('Personagem não encontrado.');
    }
    character.update(data);
    await this.characterRepository.update(character);
    return character;
  }
}