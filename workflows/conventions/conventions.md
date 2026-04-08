# Conventions — Padroes de Desenvolvimento

## Identidade

Este documento define as convencoes de codigo, arquitetura e organizacao que todo projeto usando o toolkit FDEV deve seguir. Nao e um workflow invocavel — e um documento de referencia consultado pelos outros workflows.

## Naming Conventions

### Arquivos e Diretorios

| Tipo | Convencao | Exemplo |
|------|----------|---------|
| Componentes React/Vue | PascalCase | `UserProfile.tsx` |
| Modulos Python | snake_case | `user_service.py` |
| Modulos JS/TS (nao-componente) | kebab-case | `api-client.ts` |
| Diretorios | kebab-case | `user-management/` |
| Testes | `*.test.ts` ou `*_test.py` | `user.test.ts` |
| Config files | lowercase dot | `.eslintrc.json` |

### Codigo

| Tipo | Python | TypeScript |
|------|--------|------------|
| Variaveis | `snake_case` | `camelCase` |
| Funcoes | `snake_case` | `camelCase` |
| Classes | `PascalCase` | `PascalCase` |
| Constantes | `UPPER_SNAKE_CASE` | `UPPER_SNAKE_CASE` |
| Interfaces/Types | — | `PascalCase` (sem prefixo I) |
| Enums | `PascalCase` | `PascalCase` |
| Privados | `_prefixo` | `#prefixo` (private field) |

### Git

| Tipo | Convencao | Exemplo |
|------|----------|---------|
| Branches | `tipo/descricao-curta` | `feat/user-auth`, `fix/login-bug` |
| Commits | Conventional Commits | `feat: adiciona autenticacao JWT` |
| Tags | Semantic Versioning | `v1.2.3` |
| PRs | Titulo curto (< 70 chars) | `feat: implementa fluxo de login` |

### Conventional Commits

```
<tipo>(<escopo>): <descricao>

[corpo opcional]

[rodape opcional]
```

**Tipos:**
| Tipo | Quando usar |
|------|-------------|
| `feat` | Nova funcionalidade |
| `fix` | Correcao de bug |
| `docs` | Apenas documentacao |
| `style` | Formatacao, sem mudanca de logica |
| `refactor` | Refatoracao sem mudar comportamento |
| `test` | Adicionar ou corrigir testes |
| `chore` | Tarefas de manutencao |
| `ci` | Mudancas no CI/CD |
| `perf` | Melhoria de performance |
| `revert` | Reverter commit anterior |

## Arquitetura — Padroes Recomendados

### Estrutura de Projeto (Backend)

```
src/
├── api/              # Endpoints/Routes (camada de apresentacao)
│   ├── routes/
│   └── middleware/
├── services/         # Logica de negocio
├── repositories/     # Acesso a dados
├── models/           # Entidades/schemas
├── utils/            # Utilitarios puros (sem side effects)
└── config/           # Configuracoes
```

### Estrutura de Projeto (Frontend)

```
src/
├── app/              # Pages/routes
├── components/       # Componentes (ui/, composed/, layout/)
├── hooks/            # Custom hooks
├── services/         # API calls
├── stores/           # Estado global
├── tokens/           # Design tokens
├── types/            # Tipos compartilhados
└── utils/            # Utilitarios puros
```

### Principios SOLID Aplicados

| Principio | Regra Pratica | Exemplo |
|-----------|--------------|---------|
| **S** — Single Responsibility | 1 arquivo = 1 responsabilidade | `UserService` so gerencia usuarios |
| **O** — Open/Closed | Extender via composicao, nao modificacao | Plugins, middleware, hooks |
| **L** — Liskov Substitution | Subclasses substituem sem quebrar | Interfaces bem definidas |
| **I** — Interface Segregation | Interfaces pequenas e especificas | `Readable`, `Writable` separados |
| **D** — Dependency Inversion | Depender de abstrações, nao implementacoes | Injetar repository, nao database |

### Regras de Dependencia

```
API → Services → Repositories → Database
       ↓
     Models (sem dependencias)
     Utils  (sem dependencias)
```

- **Camada superior** pode importar da inferior
- **Camada inferior** NUNCA importa da superior
- **Models e Utils** sao folhas (sem dependencias)

## Complexidade e Metricas

| Metrica | Limite | Ferramenta |
|---------|--------|-----------|
| Complexidade ciclomatica | <= 10 por funcao | ruff (C901), eslint (complexity) |
| Linhas por funcao | <= 50 | ruff, eslint |
| Linhas por arquivo | <= 300 | regra do time |
| Parametros por funcao | <= 5 | ruff (PLR0913), eslint |
| Profundidade de nesting | <= 4 | ruff, eslint |
| Cobertura de testes | >= 80% | pytest-cov, c8/istanbul |

## Error Handling

### Padrao

```typescript
// BOM: Errors tipados e especificos
class UserNotFoundError extends Error {
  constructor(userId: string) {
    super(`User not found: ${userId}`)
    this.name = 'UserNotFoundError'
  }
}

// RUIM: Erro generico
throw new Error('something went wrong')
```

### Regras

| Regra | Descricao |
|-------|-----------|
| Erros tipados | Criar classes de erro especificas |
| Fail fast | Validar input no inicio da funcao |
| Never swallow | `catch {}` vazio e proibido |
| Log + rethrow | Em boundaries, logar e relancar |
| User-friendly | Mensagem para usuario != mensagem tecnica |

## Import Organization

### TypeScript
```typescript
// 1. Bibliotecas externas
import { useState } from 'react'
import { z } from 'zod'

// 2. Modulos internos (paths absolutos)
import { UserService } from '@/services/user'
import { Button } from '@/components/ui/button'

// 3. Tipos
import type { User } from '@/types/user'

// 4. Estilos (ultimo)
import './styles.css'
```

### Python
```python
# 1. Standard library
import os
from pathlib import Path

# 2. Third-party
from fastapi import FastAPI
from pydantic import BaseModel

# 3. Local
from app.services.user import UserService
from app.models.user import User
```
