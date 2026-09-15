import { Request, Response, NextFunction } from 'express';
import { CreateCharacterDTO } from '../../../application/dtos/CreateCharacterDTO';
import { UpdateCharacterDTO } from '../../../application/dtos/UpdateCharacterDTO';
import { CreateCharacterUseCase } from '../../../application/use-cases/CreateCharacterUseCase';
import { ListCharactersUseCase } from '../../../application/use-cases/ListCharactersUseCase';
import { GetCharacterByIdUseCase } from '../../../application/use-cases/GetCharacterByIdUseCase';
import { UpdateCharacterUseCase } from '../../../application/use-cases/UpdateCharacterUseCase';
import { DeleteCharacterUseCase } from '../../../application/use-cases/DeleteCharacterUseCase';
import { GetCharacterStatsUseCase } from '../../../application/use-cases/GetCharacterStatsUseCase';

export class CharacterController {
  constructor(
    private createCharacterUseCase: CreateCharacterUseCase,
    private listCharactersUseCase: ListCharactersUseCase,
    private getCharacterByIdUseCase: GetCharacterByIdUseCase,
    private updateCharacterUseCase: UpdateCharacterUseCase,
    private deleteCharacterUseCase: DeleteCharacterUseCase,
    private getCharacterStatsUseCase: GetCharacterStatsUseCase
  ) {}

  list = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
      const { classe, raca, alianca } = req.query;

      const characters = await this.listCharactersUseCase.execute({
        classe: typeof classe === 'string' ? classe : undefined,
        raca: typeof raca === 'string' ? raca : undefined,
        alianca: typeof alianca === 'string' ? alianca : undefined,
      });

      return res.status(200).json(characters);
    } catch (error) {
      next(error);
    }
  };

  getById = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {

    try {
      const { id } = req.params;
      const character = await this.getCharacterByIdUseCase.execute(id);
      return res.status(200).json(character);
    } catch (error) {
      next(error);
    }
  };

  getStats = async (req: Request, res: Response, next: NextFunction) => {

    try {
      const stats = await this.getCharacterStatsUseCase.execute();
      return res.status(200).json(stats);
    } catch (error) {
      next(error);
    }
  };

  create = async (
    req: Request<Record<string, never>, unknown, CreateCharacterDTO>,
    res: Response,
    next: NextFunction
  ) => {

    try {
      const character = await this.createCharacterUseCase.execute(req.body);
      return res.status(201).json({
        message: 'Personagem cadastrado com sucesso!',
        data: character,
      });
    } catch (error) {
      next(error);
    }
  };

  update = async (
    req: Request<{ id: string }, unknown, UpdateCharacterDTO>,
    res: Response,
    next: NextFunction
  ) => {
    
    try {
      const { id } = req.params;
      const character = await this.updateCharacterUseCase.execute(id, req.body);
      return res.status(200).json({
        message: 'Personagem atualizado com sucesso!',
        data: character,
      });
    } catch (error) {
      next(error);
    }
  };

  delete = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
    
    try {
      const { id } = req.params;
      await this.deleteCharacterUseCase.execute(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}