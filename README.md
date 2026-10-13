# 🌌  Star Wars Characters API — Módulo 1

![Node.js](https://img.shields.io/badge/Node.js-v20-green?logo=nodedotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.0-blue?logo=typescript)
![Express](https://img.shields.io/badge/Express-v4.0-lightgrey?logo=express)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql)
![Clean Architecture](https://img.shields.io/badge/Architecture-Clean--Arch-orange)
![Swagger](https://img.shields.io/badge/Documentation-Swagger-brightgreen?logo=swagger)

API RESTful para gerenciamento de personagens do universo Star Wars, desenvolvida na disciplina de **Tópicos Especiais em Engenharia de Software (TEES)**.

Este repositório contempla a **Entrega 1 (Módulo 1)**, focada no desacoplamento de código via **Clean Architecture**, repositório em memória (*In-Memory*), documentação interativa com **Swagger** e tratamento global de erros.

---

## 🏛️ Arquitetura do Projeto

O projeto segue os princípios da **Clean Architecture (Arquitetura Limpa)**, garantindo independência de frameworks, testabilidade e separação clara de responsabilidades, com a seguinte organização de camadas:

```text
src/
├── application/                  # Casos de uso e DTOs
│   ├── dtos/
│   └── use-cases/
│
├── domain/                       # Entidades, erros e contratos
│   ├── entities/
│   ├── errors/
│   ├── gateways/
│   └── repositories/
│
├── infrastructure/               # Banco de dados, gateways e HTTP
│   ├── database/
│   │   └── prisma/
│   ├── gateways/
│   └── http/
│       ├── controllers/
│       ├── middlewares/
│       ├── routes/
│       └── schemas/
│
└── main/                         # Configuração e composição
    ├── config/
    ├── factories/
    └── server.ts
```

---

## 🛠️ Tecnologias Utilizadas

- Runtime: Node.js
- Linguagem: TypeScript
- Framework Web: Express
- Banco de dados: PostgreSQL
- ORM: Prisma
- Validação: Zod
- Cliente HTTP: Axios
- API externa: SWAPI
- Documentação: Swagger UI e swagger-autogen
- Conteinerização: Docker e Docker Compose
---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos

- Node.js e npm instalados
- PostgreSQL disponível localmente ou executado pelo Docker
- Docker Desktop, caso queira iniciar os serviços com Docker Compose

### Configuração do ambiente

Crie um arquivo `.env` na raiz do projeto. Use os valores correspondentes ao seu ambiente:

```env
PORT=3333
NODE_ENV=development

POSTGRES_USER=sw_manager
POSTGRES_PASSWORD=sw_manager_pass
POSTGRES_DB=sw_manager_db
POSTGRES_PORT=5432

DATABASE_URL="postgresql://sw_manager:sw_manager_pass@localhost:5432/sw_manager_db?schema=public"

USE_EXTERNAL_API=true

Com `USE_EXTERNAL_API=true`, a busca de personagens utiliza a SWAPI. Com `USE_EXTERNAL_API=false`, utiliza o gateway em memória. Reinicie o servidor depois de alterar essa variável.

```

### Passo a Passo

```bash
# 1. Clonar o repositório
$ git clone https://github.com/BMO-O/SW_Manager_API_TEES

# 2. Acessar a pasta do projeto
$ cd SW_Manager_API_TEES

# 3. Instalar as dependências
$ npm install

# 4. Gerar o Prisma Client
npx prisma generate

# 5. Aplicar as migrations do banco
npx prisma migrate dev

# 6. Iniciar a aplicação
npm run start
```

## 🐳 Como Executar com Docker Compose

O arquivo `docker-compose.yml` define os serviços `postgres`, `api` e `pgadmin`.

```bash
# Iniciar os serviços
docker compose up -d

# Verificar o estado dos serviços
docker compose ps

# Consultar os logs da API
docker compose logs --tail=100 api

# Parar os serviços
docker compose down
```

A porta `3333` precisa estar livre para iniciar a API pelo Docker. Se a aplicação já estiver rodando localmente nessa porta, encerre o processo local antes de iniciar o serviço `api` no Compose.

---

O servidor iniciará na porta 3333:

- 🚀 API Base URL: `http://localhost:3333/api/v1/characters`
- 📖 Documentação Swagger: `http://localhost:3333/api/docs`

---

## 📖 Documentação dos Endpoints (RESTful)

A documentação interativa está disponível no Swagger em `http://localhost:3333/api/docs`.

| Método | Endpoint | Descrição | Status de Sucesso |
|---|---|---|---|
| `POST` | `/api/v1/characters` | Cadastra um personagem no catálogo | `201 Created` |
| `GET` | `/api/v1/characters` | Lista personagens; aceita filtros e paginação, conforme validação configurada | `200 OK` |
| `GET` | `/api/v1/characters/stats` | Retorna estatísticas do catálogo | `200 OK` |
| `GET` | `/api/v1/characters/:id` | Busca um personagem pelo ID | `200 OK` |
| `PUT` | `/api/v1/characters/:id` | Atualiza os dados de um personagem | `200 OK` |
| `PATCH` | `/api/v1/characters/:id/evolve` | Evolui uma classe do personagem | `200 OK` |
| `DELETE` | `/api/v1/characters/:id` | Remove um personagem do catálogo | `204 No Content` |
| `GET` | `/api/v1/characters/swapi/search?nome=LUKE` | Busca um personagem na SWAPI ou no gateway em memória | `200 OK` |

---

## 🛡️ Validação e Tratamento de Erros

As entradas são validadas na camada HTTP antes de chegarem aos casos de uso. A resposta de erro utiliza uma estrutura padronizada. Por exemplo, uma falha de validação pode retornar:

```json
{
  "status": "error",
  "message": "Dados de entrada inválidos",
  "details": [
    {
      "field": "nome",
      "message": "O nome deve ter no mínimo 2 caracteres"
    }
  ]
}
```

Erros de domínio e de persistência são tratados pelo middleware global, que evita expor detalhes internos da aplicação ao cliente.

---

## 📝 Notas e Observações

- A busca na SWAPI consulta dados externos e não cadastra automaticamente o personagem no banco local.
- O gateway em memória contém dados de exemplo para testes offline.
- Após alterar `USE_EXTERNAL_API`, reinicie a aplicação para carregar a configuração.
- Os valores enviados para raça, classe e aliança devem corresponder aos enums definidos pela aplicação. Nos exemplos deste README, esses valores estão em letras maiúsculas.
- O endpoint de busca externa é `/api/v1/characters/swapi/search`, com o parâmetro de consulta `nome`.
- Prints relacionadas aos exercícios na pasta docs.
- Em alguns exercícios, não consegui encontrar uma forma de adaptá-los ao meu domínio, especialmente nos que envolviam treinadores Pokémon.

---

## 👤 Autor

Desenvolvido por [Breno Machado]

Estudante de Ciência da Computação.
