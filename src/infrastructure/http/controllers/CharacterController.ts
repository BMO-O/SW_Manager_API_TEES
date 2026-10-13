import { Request, Response, NextFunction } from 'express';
import { CreateCharacterDTO } from '../../../application/dtos/CreateCharacterDTO';
import { UpdateCharacterDTO } from '../../../application/dtos/UpdateCharacterDTO';
import { CreateCharacterUseCase } from '../../../application/use-cases/CreateCharacterUseCase';
import { ListCharactersUseCase } from '../../../application/use-cases/ListCharactersUseCase';
import { GetCharacterByIdUseCase } from '../../../application/use-cases/GetCharacterByIdUseCase';
import { UpdateCharacterUseCase } from '../../../application/use-cases/UpdateCharacterUseCase';
import { DeleteCharacterUseCase } from '../../../application/use-cases/DeleteCharacterUseCase';
import { GetCharacterStatsUseCase } from '../../../application/use-cases/GetCharacterStatsUseCase';
import { EvolveCharacterClassUseCase } from '../../../application/use-cases/EvolveCharacterClassUseCase';
import { SearchExternalCharacterUseCase } from '../../../application/use-cases/SearchExternalCharacterUseCase';
import { CharacterClass } from '../../../domain/entities/Character';

export class CharacterController {
  constructor(
    private createCharacterUseCase: CreateCharacterUseCase,
    private listCharactersUseCase: ListCharactersUseCase,
    private getCharacterByIdUseCase: GetCharacterByIdUseCase,
    private updateCharacterUseCase: UpdateCharacterUseCase,
    private deleteCharacterUseCase: DeleteCharacterUseCase,
    private getCharacterStatsUseCase: GetCharacterStatsUseCase,
    private evolveCharacterClassUseCase: EvolveCharacterClassUseCase,
    private searchExternalCharacterUseCase: SearchExternalCharacterUseCase,
  ) {}

  list = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { classe, raca, alianca, nome, page, limit } = req.query as unknown as {
        classe?: string;
        raca?: string;
        alianca?: string;
        nome?: string;
        page?: number;
        limit?: number;
      };

      const result = await this.listCharactersUseCase.execute({
        classe,
        raca,
        alianca,
        nome,
        page,
        limit,
      });

      return res.status(200).json(result);
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
    next: NextFunction,
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
    next: NextFunction,
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

  evolveClass = async (
    req: Request<{ id: string }, unknown, { fromClass: CharacterClass; toClass: CharacterClass }>,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const { fromClass, toClass } = req.body;
      const character = await this.evolveCharacterClassUseCase.execute({ id, fromClass, toClass });
      return res.status(200).json({
        message: 'Classe evoluída com sucesso!',
        data: character,
      });
    } catch (error) {
      next(error);
    }
  };

  searchExternal = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { nome } = res.locals.validatedQuery as { nome: string };
      const result = await this.searchExternalCharacterUseCase.execute(nome);

      return res.status(200).json(result);
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