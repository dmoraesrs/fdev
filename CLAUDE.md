# CLAUDE.md - FDEV Toolkit

Sempre responda em português brasileiro (pt-BR).

## Sobre o Projeto

FDEV e um **toolkit de desenvolvimento com AI** — um conjunto de workflows, configs, templates e guardrails que os times de desenvolvimento adotam para trabalhar com **Kiro IDE** e **Claude Code** de forma padronizada.

Assim como o repo de agentes fornece agentes especializados para infra/operacoes, o FDEV fornece **workflows de desenvolvimento** para o ciclo completo: planejar → codificar → revisar → testar → deploy.

---

## Como Usar os Workflows

### Slash Commands (Recomendado)

```
/planejar criar spec para feature de autenticacao
/codificar implementar a task 2.1 da spec user-auth
/revisar o codigo em src/services/ com foco em seguranca
/testar criar testes unitarios para UserService
/refatorar renomear getUserById para findUserById
/documentar gerar docs da API em src/routes/
/deploy configurar GitHub Actions com lint, test, build e deploy
/setup-projeto configurar guardrails para projeto Python
/secure-coding fazer review de seguranca OWASP no modulo de auth
/design-system configurar design tokens e componentes base
```

---

## Workflows Disponiveis

### Ciclo de Desenvolvimento

| Comando | Workflow | Uso |
|---------|----------|-----|
| `/planejar` | [planning.md](workflows/planning/planning.md) | Transformar ideias em specs (requirements → design → tasks) |
| `/codificar` | [coding.md](workflows/coding/coding.md) | Implementar features com Context7 e Serena |
| `/revisar` | [review.md](workflows/review/review.md) | Code review com classificacao de severidade |
| `/testar` | [testing.md](workflows/testing/testing.md) | Criar e executar testes automatizados |
| `/refatorar` | [refactoring.md](workflows/refactoring/refactoring.md) | Refactoring seguro com Serena MCP |
| `/documentar` | [documentation.md](workflows/documentation/documentation.md) | Gerar docs, ADRs, README |
| `/deploy` | [deployment.md](workflows/deployment/deployment.md) | CI/CD, Docker, estrategias de release |

### Qualidade e Seguranca

| Comando | Workflow | Uso |
|---------|----------|-----|
| `/setup-projeto` | [guardrails.md](workflows/guardrails/guardrails.md) | Pre-commit, linters, secret scanning, conventional commits |
| `/secure-coding` | [secure-coding.md](workflows/secure-coding/secure-coding.md) | OWASP Top 10, SAST, DAST, threat modeling, SBOM |
| `/design-system` | [design-system.md](workflows/design-system/design-system.md) | Design tokens, componentes UI, acessibilidade WCAG |

### Referencia

| Documento | Uso |
|-----------|-----|
| [conventions.md](workflows/conventions/conventions.md) | Naming, SOLID, arquitetura, metricas de complexidade |
| [token-optimization.md](guides/token-optimization.md) | Uso eficiente de Context7 e Serena (economia de tokens) |
| [onboarding.md](guides/onboarding.md) | Guia passo a passo para adotar o FDEV no seu projeto |

---

## MCPs Configurados

### Context7 — Documentacao On-Demand
- Consulta docs atualizadas de qualquer lib/framework
- Tools: `resolve-library-id`, `query-docs`
- Uso: adicione "use context7" no prompt
- **Otimizacao:** queries especificas > genericas ([guia](guides/token-optimization.md))
- Docs: [mcps/context7.md](mcps/context7.md)

### Serena — Navegacao Semantica de Codigo
- Entende estrutura do codigo via LSP
- Tools: `find_symbol`, `rename_symbol`, `get_symbols_overview`, etc.
- **Otimizacao:** usar para semantica, Read/Grep nativos para leitura simples
- Docs: [mcps/serena.md](mcps/serena.md)

---

## Estrutura do Toolkit

```
fdev/
├── workflows/              # Base de conhecimento (11 workflows)
│   ├── planning/           # Planejamento e specs
│   ├── coding/             # Implementacao com MCPs
│   ├── review/             # Code review
│   ├── testing/            # Testes automatizados
│   ├── deployment/         # CI/CD e deploy
│   ├── refactoring/        # Refactoring seguro
│   ├── documentation/      # Documentacao
│   ├── guardrails/         # Pre-commit, linters, seguranca
│   ├── secure-coding/      # OWASP, SAST, DAST, secrets
│   ├── design-system/      # UI/UX, tokens, acessibilidade
│   └── conventions/        # Naming, SOLID, arquitetura
│
├── .claude/                # Claude Code
│   ├── settings.json       # MCPs (Context7 + Serena)
│   └── skills/             # 10 slash commands
│
├── .kiro/                  # Kiro IDE
│   ├── steering/           # Contexto persistente (4 files)
│   ├── hooks/              # Automacoes (3 hooks)
│   └── settings/           # MCPs
│
├── templates/              # Templates prontos
│   ├── project-setup/      # .pre-commit, .editorconfig, CI workflows
│   ├── python/             # ruff.toml, pyproject.toml
│   ├── typescript/         # eslint.config.mjs, tsconfig.json
│   ├── kiro-specs/         # Templates de specs
│   └── kiro-steering/      # Templates de steering
│
├── mcps/                   # Documentacao dos MCPs
├── guides/                 # Guias de adocao
│   ├── onboarding.md       # Passo a passo de adocao
│   └── token-optimization.md # Uso eficiente de MCPs
│
└── CLAUDE.md               # Este arquivo
```

---

## Templates por Stack

### Python
- `templates/python/ruff.toml` — Linter + formatter (profiles: recommended/strict)
- `templates/python/pyproject.toml` — pytest, mypy, coverage (>=80%)

### TypeScript
- `templates/typescript/eslint.config.mjs` — ESLint flat config com seguranca
- `templates/typescript/tsconfig.json` — Strict mode

### CI/CD
- `templates/project-setup/guardrails.yml` — Pre-commit + gitleaks + dependency review
- `templates/project-setup/security.yml` — SAST (Semgrep) + Trivy + DAST (ZAP) + SBOM

---

## Dicas

1. **Use `/setup-projeto` primeiro** — configure guardrails antes de codificar
2. **Specs antes de codigo** — `/planejar` evita retrabalho
3. **Context7 > memoria** — docs atualizadas > conhecimento memorizado
4. **Serena > find-replace** — rename semantico > regex
5. **Conventional commits** — `feat:`, `fix:`, `docs:` para changelog automatico
6. **OWASP no review** — `/secure-coding` para features com auth/dados sensiveis
7. **Otimize tokens** — queries especificas, progressive disclosure ([guia](guides/token-optimization.md))
