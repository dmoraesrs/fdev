# FDEV - Toolkit de Desenvolvimento com AI

Conjunto de ferramentas, workflows e configs para times de desenvolvimento trabalharem com **Kiro IDE** + **Claude Code** de forma padronizada e produtiva.

> Assim como um repo de agentes fornece agentes especializados para infra/operações, o FDEV fornece **workflows de desenvolvimento** para o ciclo completo.

---

## Arquitetura

```
┌─────────────────────────────────────────────────────────────────────┐
│                      FDEV TOOLKIT                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  ┌────────────────────────┐       ┌────────────────────────────┐    │
│  │       KIRO IDE          │       │       CLAUDE CODE           │    │
│  │   (Planejamento +       │       │   (Execução +               │    │
│  │    Codificação)         │◄─────►│    Tarefas Complexas)       │    │
│  │                         │       │                             │    │
│  │  Steering:              │       │  Skills:                    │    │
│  │  ├ product.md           │       │  ├ /planejar               │    │
│  │  ├ tech.md              │       │  ├ /codificar              │    │
│  │  └ structure.md         │       │  ├ /revisar                │    │
│  │                         │       │  ├ /testar                 │    │
│  │  Specs:                 │       │  ├ /refatorar              │    │
│  │  ├ requirements.md      │       │  ├ /documentar             │    │
│  │  ├ design.md            │       │  ├ /deploy                 │    │
│  │  └ tasks.md             │       │  └ /setup-projeto          │    │
│  │                         │       │                             │    │
│  │  Hooks:                 │       │  Workflows:                 │    │
│  │  ├ auto-test            │       │  ├ planning/               │    │
│  │  ├ lint-on-save         │       │  ├ coding/                 │    │
│  │  └ security-check       │       │  ├ review/                 │    │
│  └────────────────────────┘       │  ├ testing/                │    │
│                                    │  ├ deployment/             │    │
│                                    │  ├ refactoring/            │    │
│                                    │  ├ documentation/          │    │
│                                    │  └ guardrails/             │    │
│                                    └────────────────────────────┘    │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                       MCP SERVERS                              │   │
│  │                                                                │   │
│  │  ┌──────────────────┐         ┌──────────────────────────┐    │   │
│  │  │    Context7       │         │        Serena             │    │   │
│  │  │                   │         │                           │    │   │
│  │  │  Docs atualizadas │         │  Navegação semântica      │    │   │
│  │  │  de libs/          │         │  de código via LSP        │    │   │
│  │  │  frameworks        │         │                           │    │   │
│  │  │                   │         │  find_symbol              │    │   │
│  │  │  resolve-library  │         │  rename_symbol            │    │   │
│  │  │  query-docs       │         │  get_symbols_overview     │    │   │
│  │  └──────────────────┘         └──────────────────────────┘    │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                      GUARDRAILS                                │   │
│  │                                                                │   │
│  │  Pre-commit:          CI:                  Kiro Hooks:         │   │
│  │  ├ trailing-whitespace ├ pre-commit/action  ├ auto-test        │   │
│  │  ├ detect-secrets      ├ gitleaks           ├ lint-on-save     │   │
│  │  ├ ruff/eslint         ├ dependency-review  └ security-check   │   │
│  │  ├ prettier/ruff-fmt   └ (replica local)                      │   │
│  │  ├ conventional-commit                                         │   │
│  │  └ no-commit-to-branch                                         │   │
│  └──────────────────────────────────────────────────────────────┘   │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐   │
│  │                      TEMPLATES                                 │   │
│  │                                                                │   │
│  │  Project Setup:         Kiro Specs:          Kiro Steering:    │   │
│  │  ├ .pre-commit-config   ├ requirements.md    ├ product.md      │   │
│  │  ├ .editorconfig        ├ design.md          └ tech.md         │   │
│  │  ├ .gitignore           └ tasks.md                             │   │
│  │  └ guardrails.yml                                              │   │
│  └──────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Quick Start

### 1. Clonar o toolkit

```bash
git clone git@github.com:dmoraesrs/fdev.git
cd fdev
```

### 2. Configurar MCPs

```bash
# No terminal com Claude Code:
claude mcp add context7 -- npx -y @upstash/context7-mcp
claude mcp add serena -- uvx -p 3.13 --from git+https://github.com/oraios/serena serena start-mcp-server --context claude-code --project-from-cwd
```

### 3. Configurar guardrails no seu projeto

```bash
# Copiar templates para seu projeto:
cp templates/project-setup/.pre-commit-config.yaml seu-projeto/
cp templates/project-setup/.editorconfig seu-projeto/
cp templates/project-setup/.gitignore seu-projeto/

# Ou usar o slash command:
cd seu-projeto
/setup-projeto configurar guardrails para projeto Python com FastAPI
```

### 4. Configurar Kiro no seu projeto

```bash
# Copiar configs Kiro:
cp -r .kiro/ seu-projeto/.kiro/

# Adaptar steering:
# Editar .kiro/steering/product.md com visão do seu produto
# Editar .kiro/steering/tech.md com sua stack
```

---

## Slash Commands

| Comando | Descrição | Exemplo |
|---------|-----------|---------|
| `/planejar` | Criar spec de feature | `/planejar feature de autenticação JWT` |
| `/codificar` | Implementar código | `/codificar implementar UserService.createUser` |
| `/revisar` | Code review | `/revisar PR #42 com foco em segurança` |
| `/testar` | Criar/executar testes | `/testar criar testes para UserService` |
| `/refatorar` | Refactoring seguro | `/refatorar extrair validação em módulo separado` |
| `/documentar` | Gerar documentação | `/documentar criar ADR sobre escolha do banco` |
| `/deploy` | CI/CD e release | `/deploy configurar GitHub Actions` |
| `/setup-projeto` | Guardrails | `/setup-projeto configurar pre-commit para TypeScript` |

---

## Estrutura de Pastas

```
fdev/
├── workflows/                      # Base de conhecimento (como agents/)
│   ├── TEMPLATE-WORKFLOW.md        # Template para novos workflows
│   ├── planning/planning.md        # Planejamento e specs
│   ├── coding/coding.md            # Implementação
│   ├── review/review.md            # Code review
│   ├── testing/testing.md          # Testes
│   ├── deployment/deployment.md    # CI/CD e deploy
│   ├── refactoring/refactoring.md  # Refactoring
│   ├── documentation/documentation.md  # Docs
│   └── guardrails/guardrails.md    # Pre-commit, linters, segurança
│
├── .claude/                        # Claude Code
│   ├── settings.json               # MCPs configurados
│   └── skills/                     # Slash commands
│       ├── planejar/SKILL.md
│       ├── codificar/SKILL.md
│       ├── revisar/SKILL.md
│       ├── testar/SKILL.md
│       ├── refatorar/SKILL.md
│       ├── documentar/SKILL.md
│       ├── deploy/SKILL.md
│       └── setup-projeto/SKILL.md
│
├── .kiro/                          # Kiro IDE
│   ├── steering/                   # Contexto persistente
│   │   ├── product.md
│   │   ├── tech.md
│   │   ├── structure.md
│   │   └── dev-workflow.md
│   ├── hooks/                      # Automações
│   │   ├── auto-test-on-save.kiro.hook
│   │   ├── lint-on-save.kiro.hook
│   │   └── security-check.kiro.hook
│   └── settings/mcp.json          # MCPs
│
├── templates/                      # Templates prontos para copiar
│   ├── project-setup/             # Guardrails (.pre-commit, .editorconfig, CI)
│   ├── kiro-specs/                # Templates de specs
│   └── kiro-steering/             # Templates de steering
│
├── mcps/                           # Documentação dos MCPs
│   ├── context7.md
│   ├── serena.md
│   └── setup.md
│
├── CLAUDE.md                       # Instruções Claude Code
└── README.md                       # Este arquivo
```

---

## Comparativo: Repo Agentes vs FDEV

| Aspecto | Repo Agentes | FDEV |
|---------|-------------|------|
| **Foco** | Infra, operações, cloud | Desenvolvimento de software |
| **Base** | `agents/` (agentes) | `workflows/` (workflows de dev) |
| **Interface** | `/k8s`, `/devops`, `/secops` | `/planejar`, `/codificar`, `/revisar` |
| **IDE** | Claude Code only | Kiro IDE + Claude Code |
| **MCPs** | — | Context7 + Serena |
| **Guardrails** | — | Pre-commit, linters, CI |
| **Templates** | Agent template | Specs, steering, project setup |

---

## Fluxo Completo

```
   IDEIA          SPEC           CÓDIGO         REVIEW         TESTES         DEPLOY
     │              │               │              │              │              │
     ▼              ▼               ▼              ▼              ▼              ▼
 /planejar    Kiro Specs      /codificar      /revisar       /testar        /deploy
     │        requirements       │              │              │              │
     │        design             │              │              │              │
     │        tasks          Context7        Serena         Context7      GitHub
     │              │        Serena            │              │          Actions
     │              │            │              │              │              │
     └──────────────┴────────────┴──────────────┴──────────────┴──────────────┘
                                    │
                              GUARDRAILS
                         /setup-projeto
                      pre-commit + CI + hooks
```

---

## Pré-requisitos

| Ferramenta | Instalação |
|-----------|------------|
| **Kiro IDE** | [kiro.dev](https://kiro.dev) |
| **Claude Code** | `npm install -g @anthropic-ai/claude-code` |
| **Node.js >= 18** | Para Context7 MCP |
| **Python >= 3.13** | Para Serena MCP |
| **uv** | `brew install uv` |
| **pre-commit** | `pip install pre-commit` |

---

## Licença

GPL-3.0
