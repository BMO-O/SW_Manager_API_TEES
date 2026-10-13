import { z } from 'zod';
import { CharacterClass, CharacterRace, CharacterAlliance } from '../../../domain/entities/Character';

export const createCharacterSchema = z.object({
  id: z.string().min(1, 'O ID não pode ser vazio').trim(),
  nome: z.string().min(2, 'O nome deve ter no mínimo 2 caracteres').trim(),
  raca: z.enum(CharacterRace),
  classes: z.array(z.enum(CharacterClass)).min(1, 'Informe pelo menos uma classe'),
  aliancas: z.array(z.enum(CharacterAlliance)).min(1, 'Informe pelo menos uma aliança'),
  planetaNatal: z.string().min(2, 'O planeta natal deve ter no mínimo 2 caracteres').trim(),
});

export const updateCharacterSchema = createCharacterSchema.omit({ id: true }).partial();

export const characterIdParamSchema = z.object({
  id: z.string().min(1, 'O ID do personagem é obrigatório'),
});

export const evolveCharacterClassSchema = z.object({
  fromClass: z.enum(CharacterClass),
  toClass: z.enum(CharacterClass),
});

export const listCharactersQuerySchema = z.object({
  nome: z.string().trim().optional(),
  raca: z.enum(CharacterRace).optional(),
  classe: z.enum(CharacterClass).optional(),
  alianca: z.enum(CharacterAlliance).optional(),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => !Number.isNaN(val) && val >= 1, {
      message: 'O parâmetro page deve ser um número inteiro maior ou igual a 1.',
    }),
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => !Number.isNaN(val) && val >= 1 && val <= 50, {
      message: 'O parâmetro limit deve ser um número inteiro entre 1 e 50.',
    }),
});

export const searchExternalCharacterQuerySchema = z.object({
  nome: z
    .string({ error: 'O parâmetro nome é obrigatório.' })
    .min(2, 'O nome deve ter no mínimo 2 caracteres.')
    .trim(),
});

export type CreateCharacterInput = z.infer<typeof createCharacterSchema>;
export type UpdateCharacterInput = z.infer<typeof updateCharacterSchema>;
export type EvolveCharacterClassInput = z.infer<typeof evolveCharacterClassSchema>;
export type ListCharactersQuery = z.infer<typeof listCharactersQuerySchema>;