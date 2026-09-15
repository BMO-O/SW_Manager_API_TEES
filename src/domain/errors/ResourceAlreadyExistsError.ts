import { AppError } from './AppError';

export class ResourceAlreadyExistsError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}