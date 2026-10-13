import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { AppError } from '../../../domain/errors/AppError';

export function errorHandler(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    const payload: Record<string, unknown> = {
      status: 'error',
      message: error.message,
    };

    if (error.details !== undefined) {
      payload.details = error.details;
    }

    return response.status(error.statusCode).json(payload);
  }

  if (error instanceof ZodError) {
    const details = error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));

    return response.status(400).json({
      status: 'error',
      message: 'Dados de entrada inválidos.',
      details,
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return response.status(409).json({
        status: 'error',
        message: 'Já existe um registro cadastrado com esses dados.',
      });
    }

    if (error.code === 'P2025') {
      return response.status(404).json({
        status: 'error',
        message: 'Registro não encontrado no banco de dados.',
      });
    }

    return response.status(500).json({
      status: 'error',
      message: 'Erro ao processar operação no banco de dados.',
    });
  }

  console.error(error);
  return response.status(500).json({
    status: 'error',
    message: 'Erro interno do servidor.',
  });
}