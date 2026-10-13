# ==========================================
# Estágio 1: Build (Compilação do TypeScript)
# ==========================================
FROM node:26-alpine AS builder

WORKDIR /usr/src/app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala todas as dependências (incluindo devDependencies para compilar)
RUN npm ci

# Copia o código-fonte e configurações
COPY . .

# Valor fictício, usado apenas para o Prisma Client ser gerado durante o build.
# O valor real (do .env) é usado em runtime, via docker-compose.yml.
ARG DATABASE_URL="postgresql://user:password@localhost:5432/db?schema=public"
ENV DATABASE_URL=${DATABASE_URL}

# Gera o Prisma Client a partir do schema.prisma
RUN npx prisma generate

# Gera os arquivos compilados em JavaScript na pasta /dist
RUN npm run build

# Copia o swagger-output.json para a pasta /dist
COPY src/main/config/swagger-output.json ./dist/main/config/swagger-output.json

# ==========================================
# Estágio 2: Runner (Ambiente de Execução)
# ==========================================
FROM node:26-alpine AS runner

WORKDIR /usr/src/app

ENV NODE_ENV=production

# Copia apenas os arquivos de manifesto de pacotes
COPY package*.json ./

# Instala APENAS as dependências de produção para reduzir o tamanho da imagem
RUN npm ci --only=production

# Copia o Prisma Client gerado no estágio de build
COPY --from=builder /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY --from=builder /usr/src/app/node_modules/@prisma/client ./node_modules/@prisma/client

# Copia a pasta /dist gerada no estágio de build
COPY --from=builder /usr/src/app/dist ./dist

# Expõe a porta onde o Express escuta
EXPOSE 3333

# Comando para subir o servidor em produção
CMD ["node", "dist/main/server.js"]