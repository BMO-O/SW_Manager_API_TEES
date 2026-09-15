# 🌌  Star Wars Characters API — Módulo 1

![Node.js](https://img.shields.io/badge/Node.js-v20-green?logo=nodedotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.0-blue?logo=typescript)
![Express](https://img.shields.io/badge/Express-v4.0-lightgrey?logo=express)
![Clean Architecture](https://img.shields.io/badge/Architecture-Clean--Arch-orange)
![Swagger](https://img.shields.io/badge/Documentation-Swagger-brightgreen?logo=swagger)

API RESTful para gerenciamento de personagens do universo Star Wars, desenvolvida na disciplina de **Tópicos Especiais em Engenharia de Software (TEES)**.

Este repositório contempla a **Entrega 1 (Módulo 1)**, focada no desacoplamento de código via **Clean Architecture**, repositório em memória (*In-Memory*), documentação interativa com **Swagger** e tratamento global de erros.

---

## 🏛️ Arquitetura do Projeto

O projeto segue os princípios da **Clean Architecture (Arquitetura Limpa)**, garantindo independência de frameworks, testabilidade e separação clara de responsabilidades, com a seguinte organização de camadas:

```text
src/
├── application/             # [Camada 1] Casos de Uso (Lógica de Aplicação)
│   ├── dtos/                # Objetos de Transferência de Dados (DTOs)
│   └── use-cases/           # CreateCharacter, ListCharacters, GetCharacterById, etc.
│
├── domain/                  # [Camada 2] Entidades de negócio e contratos (Interfaces)
│   ├── entities/            # Regras de negócio puras (ex: Character)
│   ├── errors/              # Exceção de domínio (AppError)
│   └── repositories/        # Contrato ICharacterRepository
│
├── infrastructure/          # [Camada 3] Frameworks, Banco de Dados e HTTP
│   ├── database/            # Repositório em memória (InMemoryCharacterRepository)
│   └── http/                # Controllers, Routers e Middlewares do Express
│
└── main/                    # [Camada 4] Ponto de Composição (Setup da Aplicação)
    ├── config/              # Configurações gerais e especificação Swagger/OpenAPI
    ├── factories/           # Instanciação e Injeção de Dependências
    └── server.ts            # Inicialização do Servidor HTTP
```

---

## 🛠️ Tecnologias Utilizadas

- Runtime: Node.js (v20+)
- Linguagem: TypeScript
- Framework Web: Express
- Execução em Dev: ts-node-dev (ou ts-node)
- Documentação: Swagger UI Express + swagger-autogen
- Qualidade/Padrões: ESLint & Prettier

---

## 🚀 Como Executar o Projeto Localmente

### Pré-requisitos

- Node.js (v18 ou superior)
- npm ou pnpm instalado

### Passo a Passo

```bash
# 1. Clonar o repositório
$ git clone https://github.com/BMO-O/sw_manager_api_tees.git

# 2. Acessar a pasta do projeto
$ cd sw_manager_api_tees

# 3. Instalar as dependências
$ npm install

# 4. Executar o projeto em modo de desenvolvimento
$ npm run start
```

O servidor iniciará na porta 3333:

- 🚀 API Base URL: `http://localhost:3333/api/v1/characters`
- 📖 Documentação Swagger: `http://localhost:3333/api/docs`

---

## 📖 Documentação dos Endpoints (RESTful)

A documentação interativa completa está acessível via Swagger no navegador em `/api/docs`.

| Método | Endpoint                     | Descrição                                                                 | Status de Sucesso |
|--------|------------------------------|---------------------------------------------------------------------------|-------------------|
| POST   | `/api/v1/characters`         | Cadastra um novo personagem no catálogo                                   | 201 Created       |
| GET    | `/api/v1/characters`         | Lista personagens (com suporte a filtros por raça, classe e aliança)      | 200 OK            |
| GET    | `/api/v1/characters/:id`     | Busca um personagem pelo ID                                               | 200 OK            |
| PUT    | `/api/v1/characters/:id`     | Atualiza os dados de um personagem                                        | 200 OK            |
| DELETE | `/api/v1/characters/:id`     | Remove um personagem do catálogo                                          | 204 No Content    |
| GET    | `/api/v1/characters/stats`   | Retorna estatísticas gerais do catálogo de personagens                    | 200 OK            |

---

## 🧪 Exemplos de Requisições (cURL)

### Cadastrar Personagem

```bash
curl --request POST \
  --url http://localhost:3333/api/v1/characters \
  --header 'Content-Type: application/json' \
  --data '{
    "id": "1",
    "nome": "Luke Skywalker",
    "raca": "Humano",
    "classes": ["Jedi"],
    "aliancas": ["Rebelde", "Ordem Jedi"],
    "planetaNatal": "Tatooine"
  }'
```

### Listar Personagens com Filtro de Raça

```bash
curl --request GET \
  --url 'http://localhost:3333/api/v1/characters?raca=Humano'
```

### Atualizar Personagem

```bash
curl --request PUT \
  --url http://localhost:3333/api/v1/characters/1 \
  --header 'Content-Type: application/json' \
  --data '{
    "nome": "Luke Skywalker (Corrompido)",
    "classes": ["Sith"],
    "planetaNatal": "Ahch-To"
  }'
```

### Buscar Estatísticas

```bash
curl --request GET \
  --url http://localhost:3333/api/v1/characters/stats
```

---

## 🛡️ Padronização de Erros

A API utiliza a classe `AppError` e um Middleware Global de Erros, garantindo respostas estruturadas:

```json
{
  "status": "error",
  "statusCode": 404,
  "message": "Personagem não encontrado no catálogo."
}
```

---

## 📝 Notas e Observações

Durante o desenvolvimento e a configuração da documentação interativa com Swagger, foi observada uma particularidade no exemplo de resposta para o endpoint de **Atualização de Personagem (PUT /api/v1/characters/:id)**.

Embora o corpo da requisição (`request body`) para o PUT reflita corretamente os dados a serem atualizados (ex: nome para "Luke Skywalker (Mestre Jedi)", planeta para "Ahch-To"), o **exemplo de valor da resposta (HTTP 200 OK)** continua exibindo os dados originais do personagem (ex: nome "Luke Skywalker", planeta "Tatooine"). 

---

## 👤 Autor

Desenvolvido por [Breno Machado]

Estudante de Ciência da Computação.