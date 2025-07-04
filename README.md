# RepoWeb2 - Sistema Fullstack de Gestão Médica

## Passo a Passo para Instalação e Execução

### 1. Pré-requisitos
- Node.js (v18+ recomendado)
- npm ou yarn
- Docker (para facilitar o setup do banco)
- Git

### 2. Clonando o Projeto
```bash
git clone <URL_DO_REPOSITORIO>
cd web2/repoweb
```

### 3. Subindo o Banco de Dados (PostgreSQL via Docker)
```bash
docker run -d \
  --name repoweb2-postgres \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=1234 \
  -e POSTGRES_DB=web2_db \
  -p 5433:5432 \
  -v repoweb2-db-data:/var/lib/postgresql/data \
  postgres:13
```

> O banco ficará disponível em `localhost:5433`.

### 4. Instalando as Dependências (Backend)
```bash
cd repoweb
npm install
```

### 5. Rodando o Script SQL para Popular o Banco

- Use um cliente como DBeaver, TablePlus ou psql:

```bash
psql -h localhost -p 5433 -U postgres -d web2_db -f script.sql
```

> Usuários criados:
> - admin@admin.com / admin123
> - doctor@med.com / admin123
> - patient@pac.com / admin123

### 6. Subindo o MongoDB (Prontuários)
Você pode rodar via Docker:
```bash
docker run -d --name repoweb2-mongo -p 27017:27017 mongo:5
```

### 7. Configurando Variáveis de Ambiente
Crie um arquivo `.env` na raiz do backend com:
```
DB_NAME=web2_db
DB_USER=postgres
DB_PASS=1234
DB_HOST=127.0.0.1
DB_PORT=5433
JWT_SECRET=super_secreta_123
MONGO_URI=mongodb://localhost:27017/repoweb2
```

### 8. Rodando o Backend
```bash
npm start
```
- A API estará em: `http://localhost:3000`
- Documentação Swagger: `http://localhost:3000/api/docs/`

### 9. Instalando e Rodando o Frontend
```bash
cd ../frontend
npm install
npm run dev
```
- O frontend estará em: `http://localhost:5173`

### 10. Testando o Sistema
- Acesse o frontend e faça login com os usuários criados.
- Teste todas as funcionalidades conforme checklist.
- Consulte a documentação da API em `/api/docs`.

---

## Solução de Problemas (Troubleshooting)
Se ocorrer `ECONNREFUSED` ao iniciar o backend:
1. Verifique se o container PostgreSQL está rodando (`docker ps`).
2. Crie o banco caso o container tenha sido recriado:
   ```bash
   psql -h 127.0.0.1 -p 5433 -U postgres -d postgres -c "CREATE DATABASE web2_db;"
   ```
3. Confirme seu `.env` e se necessário use `DB_HOST=127.0.0.1`.
4. Teste a conexão com o script auxiliar:
   ```bash
   node test_pg.js
   ```
   Se conectar, reinicie `npm start`.

## Observações
- Para inserir dados em `prontuarios` (MongoDB), utilize a aplicação ou scripts JS.
- O sistema segue padrão MVC, JWT, controle de acesso por role e está pronto para testes e apresentação.

---

Dúvidas? Consulte o código, a documentação Swagger ou entre em contato com o desenvolvedor.
