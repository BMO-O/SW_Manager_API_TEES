import {
  Character,
  CharacterClass,
  CharacterRace,
  CharacterAlliance,
} from '../../../domain/entities/Character';
import { ResourceAlreadyExistsError } from '../../../domain/errors/ResourceAlreadyExistsError';
import { ICharacterRepository } from '../../../domain/repositories/ICharacterRepository';
import { postgresPool } from './connection';

export class PgCharacterRepository implements ICharacterRepository {
    async create(character: Character): Promise<void> {
      const query = `
        INSERT INTO characters (id, nome, raca, classes, aliancas, planeta_natal)
        VALUES ($1, $2, $3, $4, $5, $6)
      `;
      try {
    await postgresPool.query(query, [
      character.id,
      character.nome,
      character.raca,
      character.classes,
      character.aliancas,
      character.planetaNatal,
    ]);
  }catch (error: any) {
    if (error.code === '23505') {
      throw new ResourceAlreadyExistsError(
        `Já existe um personagem cadastrado com o ID "${character.id}".`,
      );
    }
    throw error;
  }
}

  async findById(id: string): Promise<Character | null> {
    const query = `SELECT * FROM characters WHERE id = $1`;
    const result = await postgresPool.query(query, [id]);

    if (result.rows.length === 0) {
      return null;
    }

    return this.mapRowToCharacter(result.rows[0]);
  }

  async findAll(): Promise<Character[]> {
    const query = `SELECT * FROM characters`;
    const result = await postgresPool.query(query);
    return result.rows.map((row) => this.mapRowToCharacter(row));
  }

  async findByClasse(classe: CharacterClass): Promise<Character[]> {
    const query = `SELECT * FROM characters WHERE $1 = ANY(classes)`;
    const result = await postgresPool.query(query, [classe]);
    return result.rows.map((row) => this.mapRowToCharacter(row));
  }

  async findByAlianca(alianca: CharacterAlliance): Promise<Character[]> {
    const query = `SELECT * FROM characters WHERE $1 = ANY(aliancas)`;
    const result = await postgresPool.query(query, [alianca]);
    return result.rows.map((row) => this.mapRowToCharacter(row));
  }

  async findByRaca(raca: CharacterRace): Promise<Character[]> {
    const query = `SELECT * FROM characters WHERE raca = $1`;
    const result = await postgresPool.query(query, [raca]);
    return result.rows.map((row) => this.mapRowToCharacter(row));
  }

  async update(character: Character): Promise<void> {
    const query = `
      UPDATE characters
      SET nome = $1, raca = $2, classes = $3, aliancas = $4, planeta_natal = $5
      WHERE id = $6
    `;
    await postgresPool.query(query, [
      character.nome,
      character.raca,
      character.classes,
      character.aliancas,
      character.planetaNatal,
      character.id,
    ]);
  }

  async delete(id: string): Promise<void> {
    await postgresPool.query(`DELETE FROM characters WHERE id = $1`, [id]);
  }

  private mapRowToCharacter(row: {
    id: string;
    nome: string;
    raca: CharacterRace;
    classes: CharacterClass[];
    aliancas: CharacterAlliance[];
    planeta_natal: string;
  }): Character {
    return new Character({
      id: row.id,
      nome: row.nome,
      raca: row.raca,
      classes: row.classes,
      aliancas: row.aliancas,
      planetaNatal: row.planeta_natal,
    });
  }
}