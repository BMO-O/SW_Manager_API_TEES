import { Prisma, Character as PrismaCharacterModel } from '@prisma/client';
import {
  Character,
  CharacterClass,
  CharacterRace,
  CharacterAlliance,
} from '../../../domain/entities/Character';
import { ICharacterRepository } from '../../../domain/repositories/ICharacterRepository';
import { ResourceAlreadyExistsError } from '../../../domain/errors/ResourceAlreadyExistsError';
import { ResourceNotFoundError } from '../../../domain/errors/ResourceNotFoundError';
import { prisma } from './client';

export class PrismaCharacterRepository implements ICharacterRepository {
  async findAll(): Promise<Character[]> {
    const rows = await prisma.character.findMany();
    return rows.map((row) => this.mapToDomain(row));
  }

  async findByClasse(classe: CharacterClass): Promise<Character[]> {
    const rows = await prisma.character.findMany({
      where: { classes: { has: classe as any } },
    });
    return rows.map((row) => this.mapToDomain(row));
  }

  async findByAlianca(alianca: CharacterAlliance): Promise<Character[]> {
    const rows = await prisma.character.findMany({
      where: { aliancas: { has: alianca as any } },
    });
    return rows.map((row) => this.mapToDomain(row));
  }

  async findByRaca(raca: CharacterRace): Promise<Character[]> {
    const rows = await prisma.character.findMany({
      where: { raca: raca as any },
    });
    return rows.map((row) => this.mapToDomain(row));
  }

  async findById(id: string): Promise<Character | null> {
    const row = await prisma.character.findUnique({ where: { id } });
    return row ? this.mapToDomain(row) : null;
  }

  async create(character: Character): Promise<void> {
    try {
      await prisma.character.create({
        data: {
          id: character.id,
          nome: character.nome,
          raca: character.raca as any,
          classes: character.classes as any,
          aliancas: character.aliancas as any,
          planetaNatal: character.planetaNatal,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ResourceAlreadyExistsError(
          `Já existe um personagem cadastrado com o ID "${character.id}".`,
        );
      }
      throw error;
    }
  }

  async update(character: Character): Promise<void> {
    try {
      await prisma.character.update({
        where: { id: character.id },
        data: {
          nome: character.nome,
          raca: character.raca as any,
          classes: character.classes as any,
          aliancas: character.aliancas as any,
          planetaNatal: character.planetaNatal,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new ResourceNotFoundError(`Personagem com ID "${character.id}" não encontrado.`);
      }
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.character.delete({ where: { id } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2025') {
        throw new ResourceNotFoundError(`Personagem com ID "${id}" não encontrado.`);
      }
      throw error;
    }
  }

  private mapToDomain(row: PrismaCharacterModel): Character {
    return new Character({
      id: row.id,
      nome: row.nome,
      raca: row.raca as unknown as CharacterRace,
      classes: row.classes as unknown as CharacterClass[],
      aliancas: row.aliancas as unknown as CharacterAlliance[],
      planetaNatal: row.planetaNatal,
    });
  }
}