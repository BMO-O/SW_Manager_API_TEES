import { InMemoryCharacterRepository } from '../../infrastructure/database/in-memory/InMemoryCharacterRepository';
import { ListCharactersUseCase } from '../../application/use-cases/ListCharactersUseCase';
import { GetCharacterByIdUseCase } from '../../application/use-cases/GetCharacterByIdUseCase';
import { GetCharacterStatsUseCase } from '../../application/use-cases/GetCharacterStatsUseCase';
import { CreateCharacterUseCase } from '../../application/use-cases/CreateCharacterUseCase';
import { UpdateCharacterUseCase } from '../../application/use-cases/UpdateCharacterUseCase';
import { DeleteCharacterUseCase } from '../../application/use-cases/DeleteCharacterUseCase';
import { CharacterController } from '../../infrastructure/http/controllers/CharacterController';

const characterRepository = new InMemoryCharacterRepository();

export function makeCharacterController(): CharacterController {
  const createCharacterUseCase = new CreateCharacterUseCase(characterRepository);
  const listCharactersUseCase = new ListCharactersUseCase(characterRepository);
  const getCharacterByIdUseCase = new GetCharacterByIdUseCase(characterRepository);
  const updateCharacterUseCase = new UpdateCharacterUseCase(characterRepository);
  const deleteCharacterUseCase = new DeleteCharacterUseCase(characterRepository);
  const getCharacterStatsUseCase = new GetCharacterStatsUseCase(characterRepository);

  return new CharacterController(
    createCharacterUseCase,
    listCharactersUseCase,
    getCharacterByIdUseCase,
    updateCharacterUseCase,
    deleteCharacterUseCase,
    getCharacterStatsUseCase,
  );
}