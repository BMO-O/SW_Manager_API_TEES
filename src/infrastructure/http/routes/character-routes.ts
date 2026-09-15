import { Router } from 'express';
import { makeCharacterController } from '../../../main/factories/makeCharacterController';

const characterRoutes = Router();
const characterController = makeCharacterController();

characterRoutes.get('/stats', /*
  #swagger.tags = ['Characters']
  #swagger.summary = 'Consulta estatísticas do catálogo'
  #swagger.description = 'Retorna a quantidade total de personagens e a distribuição por raça, classe e aliança.'
  #swagger.responses[200] = {
    description: 'Estatísticas retornadas com sucesso.',
    schema: { $ref: '#/definitions/CharacterStats' }
  }
  #swagger.responses[500] = {
    description: 'Erro interno do servidor.',
    schema: { $ref: '#/definitions/ErrorResponse' }
  }
*/ characterController.getStats);

characterRoutes.get('/', /*
  #swagger.tags = ['Characters']
  #swagger.summary = 'Lista os personagens'
  #swagger.description = 'Retorna todos os personagens cadastrados. Pode receber classe, raça e aliança como filtros pela query string.'
  #swagger.parameters['raca'] = {
    in: 'query',
    description: 'Filtra personagens pela raça.',
    type: 'string',
    example: 'Humano'
  }
  #swagger.parameters['classe'] = {
    in: 'query',
    description: 'Filtra personagens pela classe.',
    type: 'string',
    example: 'Jedi'
  }
  #swagger.parameters['alianca'] = {
    in: 'query',
    description: 'Filtra personagens pela aliança.',
    type: 'string',
    example: 'Rebelde'
  }
  #swagger.responses[200] = {
    description: 'Lista de personagens retornada com sucesso.',
    schema: { type: 'array', items: { $ref: '#/definitions/Character' } }
  }
  #swagger.responses[500] = {
    description: 'Erro interno do servidor.',
    schema: { $ref: '#/definitions/ErrorResponse' }
  }
*/ characterController.list);

characterRoutes.get('/:id', /*
  #swagger.tags = ['Characters']
  #swagger.summary = 'Busca um personagem por ID'
  #swagger.description = 'Retorna o personagem correspondente ao identificador informado.'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Identificador do personagem.',
    required: true,
    type: 'string',
    example: '1'
  }
  #swagger.responses[200] = {
    description: 'Personagem encontrado.',
    schema: { $ref: '#/definitions/Character' }
  }
  #swagger.responses[404] = {
    description: 'Personagem não encontrado.',
    schema: { $ref: '#/definitions/ErrorResponse' }
  }
  #swagger.responses[500] = {
    description: 'Erro interno do servidor.',
    schema: { $ref: '#/definitions/ErrorResponse' }
  }
*/ characterController.getById);

characterRoutes.post('/', /*
  #swagger.tags = ['Characters']
  #swagger.summary = 'Cadastra um personagem'
  #swagger.description = 'Cria um novo personagem no catálogo.'
  #swagger.requestBody = {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/definitions/CreateCharacterDTO' }
      }
    }
  }
  #swagger.responses[201] = {
    description: 'Personagem cadastrado com sucesso.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Personagem cadastrado com sucesso!' },
        data: { $ref: '#/definitions/Character' }
      }
    }
  }
  #swagger.responses[400] = {
    description: 'Dados inválidos ou personagem já cadastrado.',
    schema: { $ref: '#/definitions/ErrorResponse' }
  }
  #swagger.responses[500] = {
    description: 'Erro interno do servidor.',
    schema: { $ref: '#/definitions/ErrorResponse' }
  }
*/ characterController.create);

characterRoutes.put('/:id', /*
  #swagger.tags = ['Characters']
  #swagger.summary = 'Atualiza um personagem'
  #swagger.description = 'Atualiza os dados do personagem identificado pelo ID informado.'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Identificador do personagem.',
    required: true,
    type: 'string',
    example: '1'
  }
  #swagger.requestBody = {
    required: true,
    content: {
      'application/json': {
        schema: { $ref: '#/definitions/UpdateCharacterDTO' }
      }
    }
  }
  #swagger.responses[200] = {
    description: 'Personagem atualizado com sucesso.',
    schema: {
      type: 'object',
      properties: {
        message: { type: 'string', example: 'Personagem atualizado com sucesso!' },
        data: { $ref: '#/definitions/Character' }
      }
    }
  }
  #swagger.responses[404] = {
    description: 'Personagem não encontrado.',
    schema: { $ref: '#/definitions/ErrorResponse' }
  }
  #swagger.responses[500] = {
    description: 'Erro interno do servidor.',
    schema: { $ref: '#/definitions/ErrorResponse' }
  }
*/ characterController.update);

characterRoutes.delete('/:id', /*
  #swagger.tags = ['Characters']
  #swagger.summary = 'Exclui um personagem'
  #swagger.description = 'Remove do catálogo o personagem identificado pelo ID informado.'
  #swagger.parameters['id'] = {
    in: 'path',
    description: 'Identificador do personagem.',
    required: true,
    type: 'string',
    example: '1'
  }
  #swagger.responses[204] = {
    description: 'Personagem excluído com sucesso.'
  }
  #swagger.responses[404] = {
    description: 'Personagem não encontrado.',
    schema: { $ref: '#/definitions/ErrorResponse' }
  }
  #swagger.responses[500] = {
    description: 'Erro interno do servidor.',
    schema: { $ref: '#/definitions/ErrorResponse' }
  }
*/ characterController.delete);

export { characterRoutes };