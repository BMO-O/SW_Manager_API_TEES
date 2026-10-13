import 'dotenv/config';
import express from 'express';
import { characterRoutes } from '../infrastructure/http/routes/character-routes';
import { errorHandler } from '../infrastructure/http/middlewares/errorHandler';
import { setupSwagger } from './config/swagger';

const app = express();

app.use(express.json());

setupSwagger(app);
app.use('/api/v1/characters', characterRoutes);
app.use(errorHandler);

const PORT = 3333;

app.listen(PORT, () => {
  console.log(`[server]: Servidor rodando em http://localhost:${PORT}`);
  console.log(
    `[docs]: Documentação disponível em http://localhost:${PORT}/api/docs`,
  );
});