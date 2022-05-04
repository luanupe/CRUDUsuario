# CRUD de Usuários

API CRUD completo de usuários utilizando tecnologias: NodeJS, Typescript, Express, TypeORM

## Atenção

- Caso a variável de ambiente `SERVER_PORT` seja modificada, também deverá ser atualizado no `Dockerfile`, `docker-compose.yml` e na `URL` ao acessar a aplicação;
- A aplicação ficará disponível pelo endereço [http://localhost:SERVER_PORT](http://localhost:8080);
- O `SERVER_PORT` padrão está configurado para porta `8080`.

## Documentação

Após executar a aplicação, o **Swagger** estará disponível a partir da URL [http://localhost:SERVER_PORT](http://localhost:8080).



## Instruções: Docker

Os passos a seguir devem ser utilizados para subir a aplicação a partir de containers Docker.

### Requerimentos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Make](https://www.gnu.org/software/make/) *opcional*

### Executando: Make

- `make start`: Liga a aplicação
- `make stop`: Desliga a aplicação

### Executando: Docker Compose

- `docker-compose -f ./Docker/docker-compose.yml up -d`: Liga a aplicação
- `docker-compose -f ./Docker/docker-compose.yml down`: Desliga a aplicação



## Instruções: Manualmente

Os passos a seguir devem ser utilizados para subir a aplicação na máquina local.

### Requerimentos

- [MySQL 5.7](https://dev.mysql.com/downloads/mysql/5.7.html)
- [NodeJS 16](https://nodejs.org/en/download/)

### Instalando

- Configure o MySQL em sua máquina;
- Faça a cópia do arquivo `.env.example` para `.env`;
- Configure os dados de conexão com o banco de dados no arquivo `.env`;
- Abra um terminal na pasta `app` deste projeto;
- Instale as dependências utilizando `npm i`.

### Executando

- Abra um terminal na pasta `app` deste projeto;
- Execute a aplicação utilizando `npm run dev`.
