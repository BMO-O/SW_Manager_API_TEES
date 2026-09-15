import path from 'path';
import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    version: '1.0.0',
    title: 'Star Wars Characters API',
    description:
      'API para gerenciamento de personagens do universo Star Wars, desenvolvida como projeto para TEES (UFF-2026/2)',
  },
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Characters',
      description: 'Endpoints de gerenciamento de personagens do universo Star Wars',
    },
  ],
  servers: [
    {
      url: 'http://localhost:3333/api/v1/characters', 
      description: 'Servidor Local',
    },
  ],
  definitions: {
    CharacterRace: {
      type: 'string',
      enum: [
        'Humano', "Twi'lek", 'Togruta', 'Wookiee', 'Zabrak', 'Rodiano',
        'Mon Calamari', 'Dathomiriano', 'Droide',
      ],
    },
    CharacterClass: {
      type: 'string',
      enum: [
        'Jedi', 'Sith', 'Usuario da Forca', 'Soldado', 'Senador', 'Diplomata',
        'Chanceler', 'Rei', 'Cavaleiro de Ren', 'Contrabandista', 'Piloto', 'Civil',
      ],
    },
    CharacterAlliance: {
      type: 'string',
      enum: [
        'Republica', 'Separatista', 'Imperio', 'Rebelde', 'Ordem Jedi',
        'Ordem Sith', 'Primeira Ordem', 'Resistencia', 'Cavaleiros de Ren',
      ],
    },

    Character: {
      id: '1',
      nome: 'Luke Skywalker',
      raca: 'Humano',
      classes: ['Jedi'], 
      aliancas: ['Rebelde', 'Ordem Jedi'], 
      planetaNatal: 'Tatooine',
    },

    CreateCharacterDTO: {
      $id: '1', 
      $nome: 'Luke Skywalker',
      $raca: 'Humano',
      $classes: ['Jedi'],
      $aliancas: ['Rebelde', 'Ordem Jedi'],
      $planetaNatal: 'Tatooine',
    },

    UpdateCharacterDTO: {
      nome: 'Luke Skywalker (Mestre Jedi)',
      raca: 'Humano',
      classes: ['Jedi', 'Mestre Jedi'],
      aliancas: ['Rebelde', 'Ordem Jedi'],
      planetaNatal: 'Dagobah',
    },

    ErrorResponse: {
      message: 'Personagem não encontrado.', 
    },

    CharacterStats: {
      totalCharacters: 3,
      racesCount: {
        Humano: 2,
        Togruta: 1,
      },
      classesCount: {
        Jedi: 2,
        Sith: 1,
        Piloto: 1,
        'Usuario da Forca': 2,
      },
      alliancesCount: {
        Rebelde: 2,
        Imperio: 1,
        'Ordem Jedi': 1,
        'Ordem Sith': 1,
        Republica: 1,
      },
    },
  },
};

const outputFile = path.resolve(__dirname, 'swagger-output.json');
const endpointsFiles = [path.resolve(__dirname, '../../infrastructure/http/routes/character-routes.ts')];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);