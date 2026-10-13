export interface ExternalCharacterDetails {
  name: string;
  heightCm: number | null;
  massKg: number | null;
  hairColor: string | null;
  eyeColor: string | null;
  birthYear: string | null;
  gender: string | null;
  filmsCount: number;
}

export interface ICharacterExternalGateway {
  findByName(name: string): Promise<ExternalCharacterDetails | null>;
}