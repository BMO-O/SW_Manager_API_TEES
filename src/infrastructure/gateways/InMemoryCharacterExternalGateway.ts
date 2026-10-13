import {
  ICharacterExternalGateway,
  ExternalCharacterDetails,
} from '../../domain/gateways/ICharacterExternalGateway';

export class InMemoryCharacterExternalGateway implements ICharacterExternalGateway {
  private readonly characters: ExternalCharacterDetails[] = [
    {
      name: 'Luke Skywalker',
      heightCm: 172,
      massKg: 77,
      hairColor: 'blond',
      eyeColor: 'blue',
      birthYear: '19BBY',
      gender: 'male',
      filmsCount: 4,
    },
    {
      name: 'Leia Organa',
      heightCm: 150,
      massKg: 49,
      hairColor: 'brown',
      eyeColor: 'brown',
      birthYear: '19BBY',
      gender: 'female',
      filmsCount: 4,
    },
    {
      name: 'Darth Vader',
      heightCm: 202,
      massKg: 136,
      hairColor: 'none',
      eyeColor: 'yellow',
      birthYear: '41.9BBY',
      gender: 'male',
      filmsCount: 4,
    },
  ];

  async findByName(name: string): Promise<ExternalCharacterDetails | null> {
    const normalized = name.trim().toLowerCase();
    const found = this.characters.find((character) =>
      character.name.toLowerCase().includes(normalized),
    );

    return found ?? null;
  }
}