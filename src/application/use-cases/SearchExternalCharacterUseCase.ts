import {
  ICharacterExternalGateway,
  ExternalCharacterDetails,
} from '../../domain/gateways/ICharacterExternalGateway';
import { ResourceNotFoundError } from '../../domain/errors/ResourceNotFoundError';

export class SearchExternalCharacterUseCase {
  constructor(private characterExternalGateway: ICharacterExternalGateway) {}

  async execute(name: string): Promise<ExternalCharacterDetails> {
    const result = await this.characterExternalGateway.findByName(name);

    if (!result) {
      throw new ResourceNotFoundError(
        `Nenhum personagem encontrado na SWAPI com o nome "${name}".`,
      );
    }

    return result;
  }
}