import { Router } from 'express';
import { makeCharacterController } from '../../../main/factories/makeCharacterController';
import { validateRequest } from '../middlewares/validateRequest';
import {
  createCharacterSchema,
  updateCharacterSchema,
  characterIdParamSchema,
  evolveCharacterClassSchema,
  listCharactersQuerySchema,
  searchExternalCharacterQuerySchema,
} from '../schemas/character-schemas';

const characterRoutes = Router();
const characterController = makeCharacterController();

characterRoutes.get('/stats', /*
  #swagger.tags = ['Characters']
  #swagger.summary = 'CONSULTA ESTATÍSTICAS DO CATÁLOGO'
  #swagger.description = 'RETORNA A QUANTIDADE TOTAL DE PERSONAGENS E A DISTRIBUIÇÃO POR RAÇA, CLASSE E ALIANÇA.'
  #swagger.responses[200] = { description: 'ESTATÍSTICAS RETORNADAS COM SUCESSO.', schema: { $ref: '#/definitions/CharacterStats' } }
  #swagger.responses[500] = { description: 'ERRO INTERNO DO SERVIDOR.', schema: { $ref: '#/definitions/ErrorResponse' } }
*/ characterController.getStats);

characterRoutes.get(
  '/swapi/search',
  validateRequest({ query: searchExternalCharacterQuerySchema }),
  /*
    #swagger.tags = ['Characters']
    #swagger.summary = 'CONSULTA UM PERSONAGEM NA SWAPI OFICIAL'
    #swagger.description = 'CONSOME O GATEWAY EXTERNO (BOUNDARY LAYER) PARA BUSCAR DADOS OFICIAIS DE UM PERSONAGEM DIRETAMENTE NA SWAPI (STAR WARS API). NÃO CONSULTA O BANCO DE DADOS LOCAL.'
    #swagger.parameters['nome'] = { in: 'query', description: 'NOME (OU PARTE DO NOME) DO PERSONAGEM A SER BUSCADO NA SWAPI.', required: true, type: 'string', example: 'LUKE' }
    #swagger.responses[200] = { description: 'PERSONAGEM ENCONTRADO NA SWAPI.', schema: { $ref: '#/definitions/ExternalCharacterDetails' } }
    #swagger.responses[400] = { description: 'PARÂMETRO NOME INVÁLIDO OU AUSENTE.', schema: { $ref: '#/definitions/ValidationErrorResponse' } }
    #swagger.responses[404] = { description: 'NENHUM PERSONAGEM ENCONTRADO NA SWAPI COM O NOME INFORMADO.', schema: { $ref: '#/definitions/ErrorResponse' } }
    #swagger.responses[503] = { description: 'SERVIÇO EXTERNO DA SWAPI INDISPONÍVEL OU TIMEOUT.', schema: { $ref: '#/definitions/ErrorResponse' } }
  */ characterController.searchExternal,
);

characterRoutes.get(
  '/',
  validateRequest({ query: listCharactersQuerySchema }),
  /*
    #swagger.tags = ['Characters']
    #swagger.summary = 'LISTA OS PERSONAGENS'
    #swagger.description = 'RETORNA OS PERSONAGENS CADASTRADOS, DE FORMA PAGINADA. PODE RECEBER NOME, CLASSE, RAÇA E ALIANÇA COMO FILTROS, ALÉM DE PAGE E LIMIT.'
    #swagger.parameters['nome'] = { in: 'query', description: 'FILTRA PELO NOME (BUSCA PARCIAL).', type: 'string', example: 'LUKE' }
    #swagger.parameters['raca'] = { in: 'query', description: 'FILTRA PELA RAÇA.', type: 'string', example: 'HUMANO' }
    #swagger.parameters['classe'] = { in: 'query', description: 'FILTRA PELA CLASSE.', type: 'string', example: 'JEDI' }
    #swagger.parameters['alianca'] = { in: 'query', description: 'FILTRA PELA ALIANÇA.', type: 'string', example: 'REBELDE' }
    #swagger.parameters['page'] = { in: 'query', description: 'NÚMERO DA PÁGINA (PADRÃO: 1).', type: 'integer', example: 1 }
    #swagger.parameters['limit'] = { in: 'query', description: 'ITENS POR PÁGINA (PADRÃO: 10, MÁXIMO: 50).', type: 'integer', example: 10 }
    #swagger.responses[200] = { description: 'LISTA PAGINADA DE PERSONAGENS.', schema: { $ref: '#/definitions/PaginatedCharacters' } }
    #swagger.responses[400] = { description: 'PARÂMETROS DE BUSCA INVÁLIDOS.', schema: { $ref: '#/definitions/ValidationErrorResponse' } }
    #swagger.responses[500] = { description: 'ERRO INTERNO DO SERVIDOR.', schema: { $ref: '#/definitions/ErrorResponse' } }
  */ characterController.list,
);

characterRoutes.get(
  '/:id',
  validateRequest({ params: characterIdParamSchema }),
  /*
    #swagger.tags = ['Characters']
    #swagger.summary = 'BUSCA UM PERSONAGEM POR ID'
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'string', example: '1' }
    #swagger.responses[200] = { description: 'PERSONAGEM ENCONTRADO.', schema: { $ref: '#/definitions/Character' } }
    #swagger.responses[404] = { description: 'PERSONAGEM NÃO ENCONTRADO.', schema: { $ref: '#/definitions/ErrorResponse' } }
  */ characterController.getById,
);

characterRoutes.post(
  '/',
  validateRequest({ body: createCharacterSchema }),
  /*
    #swagger.tags = ['Characters']
    #swagger.summary = 'CADASTRA UM PERSONAGEM'
    #swagger.requestBody = { required: true, content: { 'application/json': { schema: { $ref: '#/definitions/CreateCharacterDTO' } } } }
    #swagger.responses[201] = { description: 'PERSONAGEM CADASTRADO COM SUCESSO.' }
    #swagger.responses[400] = { description: 'DADOS INVÁLIDOS.', schema: { $ref: '#/definitions/ValidationErrorResponse' } }
    #swagger.responses[409] = { description: 'PERSONAGEM COM ESTE ID JÁ EXISTE.', schema: { $ref: '#/definitions/ErrorResponse' } }
  */ characterController.create,
);

characterRoutes.put(
  '/:id',
  validateRequest({ params: characterIdParamSchema, body: updateCharacterSchema }),
  /*
    #swagger.tags = ['Characters']
    #swagger.summary = 'ATUALIZA UM PERSONAGEM'
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'string', example: '1' }
    #swagger.requestBody = { required: true, content: { 'application/json': { schema: { $ref: '#/definitions/UpdateCharacterDTO' } } } }
    #swagger.responses[200] = { description: 'PERSONAGEM ATUALIZADO COM SUCESSO.' }
    #swagger.responses[404] = { description: 'PERSONAGEM NÃO ENCONTRADO.', schema: { $ref: '#/definitions/ErrorResponse' } }
  */ characterController.update,
);

characterRoutes.patch(
  '/:id/evolve',
  validateRequest({ params: characterIdParamSchema, body: evolveCharacterClassSchema }),
  /*
    #swagger.tags = ['Characters']
    #swagger.summary = 'EVOLUI A CLASSE DE UM PERSONAGEM'
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'string', example: '1' }
    #swagger.requestBody = { required: true, content: { 'application/json': { schema: { $ref: '#/definitions/EvolveCharacterClassDTO' } } } }
    #swagger.responses[200] = { description: 'CLASSE EVOLUÍDA COM SUCESSO.' }
    #swagger.responses[400] = { description: 'TRANSIÇÃO DE CLASSE INVÁLIDA.', schema: { $ref: '#/definitions/ErrorResponse' } }
    #swagger.responses[404] = { description: 'PERSONAGEM NÃO ENCONTRADO.', schema: { $ref: '#/definitions/ErrorResponse' } }
  */ characterController.evolveClass,
);

characterRoutes.delete(
  '/:id',
  validateRequest({ params: characterIdParamSchema }),
  /*
    #swagger.tags = ['Characters']
    #swagger.summary = 'EXCLUI UM PERSONAGEM'
    #swagger.parameters['id'] = { in: 'path', required: true, type: 'string', example: '1' }
    #swagger.responses[204] = { description: 'PERSONAGEM EXCLUÍDO COM SUCESSO.' }
    #swagger.responses[404] = { description: 'PERSONAGEM NÃO ENCONTRADO.', schema: { $ref: '#/definitions/ErrorResponse' } }
  */ characterController.delete,
);

export { characterRoutes };