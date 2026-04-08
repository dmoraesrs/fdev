# Guia de Otimizacao de Tokens com MCPs

## Por que Otimizar?

Cada interacao com Context7 e Serena consome tokens. Uso inteligente = mesma qualidade com menos custo.

**ROI medido:** Cada chamada Context7 economiza ~5-15 min de pesquisa manual em docs. Cada chamada Serena economiza ~3-10 min de navegacao manual pelo codebase.

---

## Context7 — Quando Usar vs Quando NAO Usar

### USAR (alto ROI)

| Cenario | Por que | Exemplo |
|---------|---------|---------|
| API nova ou pouco conhecida | Modelo pode ter info desatualizada | "use context7 para API do Drizzle ORM" |
| Breaking changes entre versoes | Docs antigas vs novas | "use context7 para middleware Next.js 15" |
| Configuracao complexa | Muitos parametros | "use context7 para config do Vitest" |
| Lib de nicho | Modelo nao foi treinado nisso | "use context7 para API do Hono framework" |

### NAO USAR (baixo ROI — modelo ja sabe)

| Cenario | Por que | Alternativa |
|---------|---------|-------------|
| JavaScript/Python basico | Modelo conhece profundamente | Perguntar diretamente |
| React hooks padrao | useState, useEffect, etc. | Conhecimento nativo |
| SQL basico | SELECT, JOIN, WHERE | Conhecimento nativo |
| Git commands | Modelo domina | Perguntar diretamente |
| APIs estaveis ha anos | Express, Flask basico | Conhecimento nativo |

### Padrao de Uso Eficiente

```
# RUIM: Chamada generica (retorna muitos tokens)
"use context7 para documentacao do React"

# BOM: Chamada especifica (retorna poucos tokens, relevantes)
"use context7 para React Server Components with async/await pattern"

# RUIM: Multiplas chamadas separadas
"use context7 para Prisma"
"use context7 para Prisma relations"
"use context7 para Prisma migrations"

# BOM: Uma chamada focada
"use context7 para Prisma many-to-many relations with explicit join table"
```

**Regra:** Quanto mais especifica a query, menos tokens consumidos e mais relevante o resultado.

---

## Serena — Quando Usar vs Quando NAO Usar

### USAR (alto ROI)

| Tool | Quando | ROI |
|------|--------|-----|
| `find_symbol` | Precisa localizar uma funcao/classe | Alto — evita grep manual |
| `find_referencing_symbols` | Antes de modificar algo | Critico — evita quebrar consumidores |
| `rename_symbol` | Renomear em todo codebase | Muito alto — evita find-replace inseguro |
| `get_symbols_overview` | Primeira vez vendo um arquivo | Alto — mapa rapido |

### NAO USAR (baixo ROI)

| Tool | Quando evitar | Alternativa |
|------|-------------|-------------|
| `get_symbols_overview` | Arquivo que voce ja conhece | Read direto |
| `find_symbol` | Sabe exatamente onde esta | Read com line number |
| `read_file` (Serena) | No Claude Code | Usar Read nativo (mais barato) |
| `search_for_pattern` | Busca simples de texto | Usar Grep nativo |

### Padrao de Uso Eficiente

```
# RUIM: Explorar arquivo inteiro sem necessidade
get_symbols_overview("src/services/user.ts")
get_symbols_overview("src/services/auth.ts")
get_symbols_overview("src/services/email.ts")

# BOM: Ir direto ao que precisa
find_symbol("UserService.createUser")
find_referencing_symbols("UserService.createUser")

# RUIM: Usar Serena para ler (no Claude Code, Read nativo e gratis)
serena.read_file("src/config.ts")

# BOM: Usar Read nativo do Claude Code
Read("src/config.ts")
```

**Regra:** Serena para navegacao semantica. Read/Grep nativos para leitura simples.

---

## Estrategias de Economia

### 1. Cache Mental

Antes de chamar um MCP, pergunte:
- "O modelo ja sabe isso?" → Se sim, nao chame
- "Preciso de info atualizada?" → Se nao, nao chame
- "Posso ser mais especifico?" → Se sim, refine a query

### 2. Batching

```
# RUIM: 3 chamadas Context7 separadas
"use context7 para Prisma schema syntax"
[resposta]
"use context7 para Prisma migrations"
[resposta]
"use context7 para Prisma seeding"

# BOM: 1 chamada combinada
"use context7 para Prisma: schema with relations, migration workflow, and seeding"
```

### 3. Progressive Disclosure

```
# Fase 1: Overview rapido (barato)
find_symbol("UserService")

# Fase 2: So se precisar mais detalhes
get_symbols_overview("src/services/user.ts")

# Fase 3: So se for modificar
find_referencing_symbols("UserService.createUser")
```

### 4. Evitar Redundancia

| Situacao | Nao faca | Faca |
|----------|----------|------|
| Ja leu o arquivo | Nao releia com Serena | Use info do Read anterior |
| Ja buscou simbolo | Nao busque de novo | Referencie resultado anterior |
| Modelo respondeu | Nao valide com Context7 | Confie (a menos que seja critico) |

---

## Metricas de Referencia

| Acao | Tokens estimados | Tempo economizado |
|------|-----------------|-------------------|
| Context7 query especifica | ~500-2000 | 5-15 min pesquisa |
| Context7 query generica | ~3000-8000 | 5-15 min pesquisa |
| Serena find_symbol | ~200-500 | 2-5 min navegacao |
| Serena get_symbols_overview | ~500-2000 | 5-10 min leitura |
| Serena rename_symbol | ~300-800 | 10-30 min refactor manual |
| Read nativo (Claude Code) | ~100-500 | Baseline |
| Grep nativo (Claude Code) | ~100-300 | Baseline |

**Regra de ouro:** Se a alternativa manual leva < 2 min, nao use MCP. Se leva > 5 min, use MCP.

---

## Checklist de Otimizacao

- [ ] Queries Context7 sao especificas (nao genericas)
- [ ] Serena usado para semantica (nao leitura simples)
- [ ] Read/Grep nativos para operacoes simples
- [ ] Sem chamadas redundantes (reutilizar resultados)
- [ ] Progressive disclosure (overview → detalhe → impacto)
