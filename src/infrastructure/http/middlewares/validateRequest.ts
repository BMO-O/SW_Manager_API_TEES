import { Request, Response, NextFunction } from 'express';
import { ZodError, ZodType } from 'zod';
import { AppError } from '../../../domain/errors/AppError';

interface RequestValidationSchemas {
  body?: ZodType;
  query?: ZodType;
  params?: ZodType;
}

export const validateRequest = (schemas: RequestValidationSchemas) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body);
      }

      if (schemas.params) {
        res.locals.validatedParams = await schemas.params.parseAsync(req.params);
      }

      if (schemas.query) {
        res.locals.validatedQuery = await schemas.query.parseAsync(req.query);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const details = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));

        next(new AppError('Dados de entrada inválidos.', 400, details));
        return;
      }

      next(error);
    }
  };
};