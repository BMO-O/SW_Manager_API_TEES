import path from 'path';
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',
    title: 'STAR WARS CHARACTERS API',
    description:
      'API PARA GERENCIAMENTO DE PERSONAGENS DO UNIVERSO STAR WARS, DESENVOLVIDA COMO PROJETO PARA TEES (UFF-2026/2)',
  },
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [{ name: 'Characters', description: 'ENDPOINTS DE GERENCIAMENTO DE PERSONAGENS DO UNIVERSO STAR WARS' }],
  servers: [{ url: 'http://localhost:3333/api/v1/characters', description: 'SERVIDOR LOCAL' }],
  definitions: {
    CharacterRace: {
      type: 'string',
      enum: ['HUMANO', 'TWILEK', 'TOGRUTA', 'WOOKIEE', 'ZABRAK', 'RODIANO', 'MON_CALAMARI', 'DATHOMIRIANO', 'DROIDE'],
    },
    CharacterClass: {
      type: 'string',
      enum: [
        'JEDI', 'MESTRE_JEDI', 'SITH', 'LORDE_SITH', 'USUARIO_DA_FORCA', 'SOLDADO',
        'OFICIAL', 'COMANDANTE', 'SENADOR', 'DIPLOMATA', 'CHANCELER', 'REI',
        'CAVALEIRO_DE_REN', 'CONTRABANDISTA', 'PILOTO', 'CIVIL',
      ],
    },
    CharacterAlliance: {
      type: 'string',
      enum: [
        'REPUBLICA', 'SEPARATISTA', 'IMPERIO', 'REBELDE', 'ORDEM_JEDI',
        'ORDEM_SITH', 'PRIMEIRA_ORDEM', 'RESISTENCIA', 'CAVALEIROS_DE_REN',
      ],
    },
    Character: {
      id: '1',
      nome: 'LUKE SKYWALKER',
      raca: 'HUMANO',
      classes: ['JEDI'],
      aliancas: ['REBELDE', 'ORDEM_JEDI'],
      planetaNatal: 'TATOOINE',
    },
    CreateCharacterDTO: {
      $id: '1',
      $nome: 'LUKE SKYWALKER',
      $raca: 'HUMANO',
      $classes: ['JEDI'],
      $aliancas: ['REBELDE', 'ORDEM_JEDI'],
      $planetaNatal: 'TATOOINE',
    },
    UpdateCharacterDTO: {
      nome: 'LUKE SKYWALKER (MESTRE JEDI)',
      raca: 'HUMANO',
      classes: ['JEDI', 'MESTRE_JEDI'],
      aliancas: ['REBELDE', 'ORDEM_JEDI'],
      planetaNatal: 'DAGOBAH',
    },
    EvolveCharacterClassDTO: {
      fromClass: 'USUARIO_DA_FORCA',
      toClass: 'JEDI',
    },
    PaginatedCharacters: {
      data: [
        {
          id: '1',
          nome: 'LUKE SKYWALKER',
          raca: 'HUMANO',
          classes: ['JEDI'],
          aliancas: ['REBELDE', 'ORDEM_JEDI'],
          planetaNatal: 'TATOOINE',
        },
      ],
      meta: { page: 1, limit: 10, total: 1 },
    },
    ExternalCharacterDetails: {
      name: 'Luke Skywalker',
      heightCm: 172,
      massKg: 77,
      hairColor: 'blond',
      eyeColor: 'blue',
      birthYear: '19BBY',
      gender: 'male',
      filmsCount: 4,
    },
    ErrorResponse: {
      status: 'error',
      message: 'PERSONAGEM NÃO ENCONTRADO.',
    },
    ValidationErrorResponse: {
      status: 'error',
      message: 'DADOS DE ENTRADA INVÁLIDOS.',
      details: [{ field: 'nome', message: 'O NOME DEVE TER NO MÍNIMO 2 CARACTERES' }],
    },
    CharacterStats: {
      totalCharacters: 3,
      racesCount: { HUMANO: 2, TOGRUTA: 1 },
      classesCount: { JEDI: 2, SITH: 1, PILOTO: 1, USUARIO_DA_FORCA: 2 },
      alliancesCount: { REBELDE: 2, IMPERIO: 1, ORDEM_JEDI: 1, ORDEM_SITH: 1, REPUBLICA: 1 },
    },
  },
};

const outputFile = path.resolve(__dirname, 'swagger-output.json');
const endpointsFiles = [path.resolve(__dirname, '../../infrastructure/http/routes/character-routes.ts')];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);