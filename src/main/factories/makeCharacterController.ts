import { PrismaCharacterRepository } from '../../infrastructure/database/prisma/prisma-character-repository';
import { ListCharactersUseCase } from '../../application/use-cases/ListCharactersUseCase';
import { GetCharacterByIdUseCase } from '../../application/use-cases/GetCharacterByIdUseCase';
import { GetCharacterStatsUseCase } from '../../application/use-cases/GetCharacterStatsUseCase';
import { CreateCharacterUseCase } from '../../application/use-cases/CreateCharacterUseCase';
import { UpdateCharacterUseCase } from '../../application/use-cases/UpdateCharacterUseCase';
import { DeleteCharacterUseCase } from '../../application/use-cases/DeleteCharacterUseCase';
import { EvolveCharacterClassUseCase } from '../../application/use-cases/EvolveCharacterClassUseCase';
import { SearchExternalCharacterUseCase } from '../../application/use-cases/SearchExternalCharacterUseCase';
import { SwapiAxiosGateway } from '../../infrastructure/gateways/SwapiAxiosGateway';
import { InMemoryCharacterExternalGateway } from '../../infrastructure/gateways/InMemoryCharacterExternalGateway';
import { CharacterController } from '../../infrastructure/http/controllers/CharacterController';

const characterRepository = new PrismaCharacterRepository();

const characterExternalGateway =
  process.env.USE_EXTERNAL_API === 'false'
    ? new InMemoryCharacterExternalGateway()
    : new SwapiAxiosGateway();

export function makeCharacterController(): CharacterController {
  const createCharacterUseCase = new CreateCharacterUseCase(characterRepository);
  const listCharactersUseCase = new ListCharactersUseCase(characterRepository);
  const getCharacterByIdUseCase = new GetCharacterByIdUseCase(characterRepository);
  const updateCharacterUseCase = new UpdateCharacterUseCase(characterRepository);
  const deleteCharacterUseCase = new DeleteCharacterUseCase(characterRepository);
  const getCharacterStatsUseCase = new GetCharacterStatsUseCase(characterRepository);
  const evolveCharacterClassUseCase = new EvolveCharacterClassUseCase(characterRepository);
  const searchExternalCharacterUseCase = new SearchExternalCharacterUseCase(characterExternalGateway);

  return new CharacterController(
    createCharacterUseCase,
    listCharactersUseCase,
    getCharacterByIdUseCase,
    updateCharacterUseCase,
    deleteCharacterUseCase,
    getCharacterStatsUseCase,
    evolveCharacterClassUseCase,
    searchExternalCharacterUseCase,
  );
}