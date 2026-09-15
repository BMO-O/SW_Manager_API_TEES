import { ICharacterRepository } from '../../domain/repositories/ICharacterRepository';
import { Character } from '../../domain/entities/Character';
import { ResourceAlreadyExistsError } from '../../domain/errors/ResourceAlreadyExistsError';
import { CreateCharacterDTO } from '../dtos/CreateCharacterDTO';

export class CreateCharacterUseCase {
  constructor(private characterRepository: ICharacterRepository) {}

  async execute(data: CreateCharacterDTO): Promise<Character> {
    const existing = await this.characterRepository.findById(data.id);

    if (existing) {
      throw new ResourceAlreadyExistsError('Personagem com este ID já está cadastrado.');
    }

    const character = new Character(data);
    await this.characterRepository.create(character);

    return character;
  }
}