import { ICharacterRepository } from '../../domain/repositories/ICharacterRepository';
import { ResourceNotFoundError } from '../../domain/errors/ResourceNotFoundError';

export class DeleteCharacterUseCase {
  constructor(private characterRepository: ICharacterRepository) {}

  async execute(id: string) {
    const character = await this.characterRepository.findById(id);
    if (!character) {
      throw new ResourceNotFoundError('Personagem não encontrado.');
    }
    await this.characterRepository.delete(id);
  }
}