# Guia de Uso Completo — Exemplo Pratico

## Cenario

Vamos criar uma **API de gerenciamento de tarefas (Todo API)** usando o toolkit FDEV do zero. Este exemplo demonstra o fluxo completo: setup → planejar → codificar → revisar → testar → deploy.

---

## Passo 1: Setup do Projeto (5 min)

### 1.1 Criar o projeto

```bash
mkdir todo-api && cd todo-api
git init
```

### 1.2 Copiar guardrails do FDEV

```bash
# Pre-commit + editorconfig + gitignore
cp /caminho/para/fdev/templates/project-setup/.pre-commit-config.yaml .
cp /caminho/para/fdev/templates/project-setup/.editorconfig .
cp /caminho/para/fdev/templates/project-setup/.gitignore .

# Linter Python (descomentar hooks de Python no .pre-commit-config.yaml)
cp /caminho/para/fdev/templates/python/ruff.toml .
cp /caminho/para/fdev/templates/python/pyproject.toml .

# CI
mkdir -p .github/workflows
cp /caminho/para/fdev/templates/project-setup/guardrails.yml .github/workflows/
cp /caminho/para/fdev/templates/project-setup/security.yml .github/workflows/

# Instalar pre-commit
pre-commit install
pre-commit install --hook-type commit-msg
```

### 1.3 Configurar MCPs

```bash
# Claude Code
mkdir -p .claude
cp /caminho/para/fdev/.claude/settings.json .claude/

# Kiro IDE
mkdir -p .kiro/{settings,steering,hooks,specs}
cp /caminho/para/fdev/.kiro/settings/mcp.json .kiro/settings/
cp /caminho/para/fdev/.kiro/hooks/*.kiro.hook .kiro/hooks/
```

### 1.4 Criar steering do Kiro

```bash
# Copiar templates e adaptar
cp /caminho/para/fdev/templates/kiro-steering/product-template.md .kiro/steering/product.md
cp /caminho/para/fdev/templates/kiro-steering/tech-template.md .kiro/steering/tech.md
```

Editar `.kiro/steering/product.md`:
```markdown
---
inclusion: always
---

# Product Vision - Todo API

## Proposito
API REST para gerenciamento de tarefas pessoais.

## Publico-Alvo
- Desenvolvedores frontend que precisam de um backend

## Objetivos
1. CRUD completo de tarefas
2. Autenticacao JWT
3. Filtros por status e prioridade
```

Editar `.kiro/steering/tech.md`:
```markdown
---
inclusion: always
---

# Tech Stack

## Backend
- Python 3.12
- FastAPI
- SQLAlchemy + SQLite (dev) / PostgreSQL (prod)
- Pydantic v2

## Testes
- pytest + httpx

## Qualidade
- Linter: ruff
- Type check: mypy
- Formatter: ruff format
```

### 1.5 Criar CLAUDE.md

```markdown
# CLAUDE.md - Todo API

Sempre responda em portugues brasileiro (pt-BR).

## Sobre
API REST de tarefas com FastAPI + SQLAlchemy.

## Stack
Python 3.12, FastAPI, SQLAlchemy, pytest.

## Comandos
- `/planejar` - Criar spec de feature
- `/codificar` - Implementar
- `/testar` - Criar testes
- `/revisar` - Code review
```

### 1.6 Commit inicial

```bash
git add .
git commit -m "chore: setup inicial com guardrails FDEV"
```

---

## Passo 2: Planejar (/planejar)

No terminal com Claude Code:

```
/planejar criar spec para CRUD de tarefas com:
- Criar, listar, atualizar, deletar tarefas
- Cada tarefa tem: titulo, descricao, status (pending/done), prioridade (low/medium/high)
- Filtrar por status e prioridade
- Autenticacao JWT basica
```

### O que o workflow gera:

O Claude Code analisa o codebase com Serena e cria a spec em `.kiro/specs/todo-crud/`:

**requirements.md** (gerado):
```markdown
# Feature: CRUD de Tarefas

## User Stories

### Story 1: Criar Tarefa
**Como** usuario autenticado
**Quero** criar uma nova tarefa
**Para** organizar minhas atividades

#### Criterios de Aceitacao
- [ ] POST /tasks retorna 201 com tarefa criada
- [ ] Campos obrigatorios: titulo
- [ ] Status default: pending
- [ ] Prioridade default: medium

### Story 2: Listar Tarefas
**Como** usuario autenticado
**Quero** listar minhas tarefas com filtros
**Para** ver o que preciso fazer

#### Criterios de Aceitacao
- [ ] GET /tasks retorna lista paginada
- [ ] Filtro por status: ?status=pending
- [ ] Filtro por prioridade: ?priority=high
- [ ] Apenas tarefas do usuario autenticado

### Story 3: Atualizar Tarefa
...

### Story 4: Deletar Tarefa
...

### Story 5: Autenticacao
**Como** usuario
**Quero** fazer login e receber um token JWT
**Para** acessar a API de forma segura

#### Criterios de Aceitacao
- [ ] POST /auth/register cria usuario
- [ ] POST /auth/login retorna access_token
- [ ] Endpoints protegidos exigem Bearer token
```

**tasks.md** (gerado):
```markdown
# Tasks: CRUD de Tarefas

- [ ] Task 1: Setup FastAPI + SQLAlchemy + estrutura de pastas (P)
- [ ] Task 2: Modelos - User e Task com SQLAlchemy (P)
- [ ] Task 3: Schemas Pydantic - request/response (P)
- [ ] Task 4: Auth - registro, login, JWT (M)
- [ ] Task 5: CRUD endpoints - POST/GET/PUT/DELETE /tasks (M)
- [ ] Task 6: Filtros - status e prioridade com query params (P)
- [ ] Task 7: Testes - unitarios e integracao (M)
```

---

## Passo 3: Codificar (/codificar)

### Task 1: Setup

```
/codificar implementar Task 1 da spec todo-crud:
setup FastAPI + SQLAlchemy com estrutura de pastas padrao
```

O workflow usa **Context7** para consultar docs atualizadas:
```
"use context7 para FastAPI project structure with SQLAlchemy async"
```

E cria:
```
src/
├── app/
│   ├── __init__.py
│   ├── main.py          # FastAPI app
│   ├── config.py         # Settings
│   ├── database.py       # SQLAlchemy setup
│   ├── models/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── task.py
│   ├── schemas/
│   │   ├── __init__.py
│   │   ├── user.py
│   │   └── task.py
│   ├── routes/
│   │   ├── __init__.py
│   │   ├── auth.py
│   │   └── tasks.py
│   └── services/
│       ├── __init__.py
│       ├── auth.py
│       └── tasks.py
└── tests/
    ├── __init__.py
    ├── conftest.py
    └── test_tasks.py
```

```bash
git commit -m "feat: setup FastAPI + SQLAlchemy com estrutura base"
```

### Task 4: Auth

```
/codificar implementar Task 4 da spec todo-crud:
autenticacao com registro, login e JWT
use context7 para ver JWT handling no FastAPI
```

Context7 busca docs atualizadas do FastAPI sobre OAuth2 + JWT.
Serena navega os simbolos existentes antes de modificar.

```bash
git commit -m "feat: adiciona autenticacao JWT com registro e login"
```

### Task 5: CRUD

```
/codificar implementar Task 5 da spec todo-crud:
endpoints CRUD para tarefas (POST/GET/PUT/DELETE /tasks)
```

```bash
git commit -m "feat: implementa CRUD completo de tarefas"
```

---

## Passo 4: Revisar (/revisar)

```
/revisar todo o codigo em src/ com foco em seguranca e qualidade
```

O workflow verifica:
- **BLOCKER:** SQL injection? Input validation? Secrets hardcoded?
- **MAJOR:** Testes existem? Error handling adequado?
- **MINOR:** Naming conventions, imports organizados?

Exemplo de output:
```
## Review: src/

### BLOCKER
- Nenhum encontrado ✅

### MAJOR
- src/app/routes/tasks.py:45 — Falta validacao de ownership
  (usuario pode acessar tarefa de outro usuario)
  Sugestao: adicionar filtro `task.user_id == current_user.id`

### MINOR
- src/app/services/tasks.py:12 — Import nao utilizado: `Optional`
```

---

## Passo 5: Testar (/testar)

```
/testar criar testes para toda a API baseado nos criterios de aceitacao
da spec em .kiro/specs/todo-crud/
```

O workflow gera testes cobrindo cada criterio:

```python
# tests/test_tasks.py

async def test_create_task_returns_201(client, auth_headers):
    response = await client.post("/tasks", json={
        "titulo": "Minha tarefa",
    }, headers=auth_headers)
    assert response.status_code == 201
    assert response.json()["status"] == "pending"
    assert response.json()["prioridade"] == "medium"

async def test_list_tasks_filter_by_status(client, auth_headers):
    # Criar tarefas com status diferentes
    ...
    response = await client.get("/tasks?status=pending", headers=auth_headers)
    assert all(t["status"] == "pending" for t in response.json()["items"])

async def test_user_cannot_access_other_user_tasks(client, user_a_headers, user_b_headers):
    # User A cria tarefa
    ...
    # User B tenta acessar — deve retornar 404
    response = await client.get(f"/tasks/{task_id}", headers=user_b_headers)
    assert response.status_code == 404
```

```bash
# Rodar testes
pytest -v --cov=src --cov-report=term-missing

git commit -m "test: adiciona testes de integracao para API de tarefas"
```

---

## Passo 6: Security Check (/secure-coding)

```
/secure-coding fazer review OWASP do modulo de autenticacao
```

O workflow roda o checklist OWASP Top 10:
```
✅ A01 Broken Access Control — Filtro por user_id implementado
✅ A02 Crypto — bcrypt para senhas, JWT com expiracao
✅ A03 Injection — SQLAlchemy ORM, sem queries raw
⚠️ A07 Auth Failures — Falta rate limiting no login
  Sugestao: adicionar slowapi com limit de 5 tentativas/minuto
```

---

## Passo 7: Deploy (/deploy)

```
/deploy configurar Dockerfile multi-stage e GitHub Actions para a Todo API
```

Gera:
- `Dockerfile` (multi-stage: builder + runtime)
- `.github/workflows/ci-cd.yml` (lint → test → build → deploy)

```bash
git commit -m "ci: adiciona Dockerfile e pipeline CI/CD"
```

---

## Resumo do Fluxo

```
 SETUP          PLANEJAR        CODIFICAR       REVISAR        TESTAR         DEPLOY
   │               │               │               │              │              │
   ▼               ▼               ▼               ▼              ▼              ▼
 Copiar         /planejar       /codificar      /revisar       /testar        /deploy
 templates      spec CRUD       Task 1..N       seguranca      pytest         Dockerfile
 do FDEV        requirements    Context7        qualidade      cobertura      CI/CD
 guardrails     design          Serena          OWASP          criterios      GitHub
 MCPs           tasks           commits         findings       aceitacao      Actions
                                atomicos
   │               │               │               │              │              │
   └───────────────┴───────────────┴───────────────┴──────────────┴──────────────┘
                                        │
                                  GUARDRAILS (automatico)
                               pre-commit + CI + Kiro hooks
```

---

## Dicas para a Apresentacao

1. **Mostrar o paralelo** com o repo de agentes (mesma estrutura, foco diferente)
2. **Demo ao vivo**: criar um projeto do zero seguindo este guia (15 min)
3. **Highlight dos MCPs**: Context7 buscando docs em tempo real, Serena navegando simbolos
4. **Guardrails automaticos**: mostrar pre-commit bloqueando um secret
5. **Kiro + Claude Code**: specs no Kiro, execucao no Claude Code
