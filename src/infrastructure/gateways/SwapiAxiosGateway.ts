import axios from 'axios';
import { AppError } from '../../domain/errors/AppError';
import {
  ICharacterExternalGateway,
  ExternalCharacterDetails,
} from '../../domain/gateways/ICharacterExternalGateway';

interface SwapiPersonRaw {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  films: string[];
}

interface SwapiSearchResponse {
  count: number;
  results: SwapiPersonRaw[];
}

export class SwapiAxiosGateway implements ICharacterExternalGateway {
  private readonly baseUrl = 'https://swapi.dev/api/people';

  async findByName(name: string): Promise<ExternalCharacterDetails | null> {
    try {
      const response = await axios.get<SwapiSearchResponse>(this.baseUrl, {
        params: { search: name },
        timeout: 3000,
      });

      const results = response.data?.results;

      if (!Array.isArray(results) || results.length === 0) {
        return null;
      }

      const [raw] = results;

      return {
        name: raw.name,
        heightCm: raw.height && raw.height !== 'unknown' ? Number(raw.height) : null,
        massKg: raw.mass && raw.mass !== 'unknown' ? Number(raw.mass) : null,
        hairColor: raw.hair_color ?? null,
        eyeColor: raw.eye_color ?? null,
        birthYear: raw.birth_year ?? null,
        gender: raw.gender ?? null,
        filmsCount: Array.isArray(raw.films) ? raw.films.length : 0,
      };
    } catch (error) {
      console.error('💥 [SwapiAxiosGateway] Falha ao consultar a SWAPI:', error);

      throw new AppError(
        'O serviço externo da SWAPI está temporariamente indisponível. Tente novamente mais tarde.',
        503,
      );
    }
  }
}