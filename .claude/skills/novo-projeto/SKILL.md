---
name: novo-projeto
description: Clona um repo Git e faz bootstrap completo com toolkit FDEV - guardrails, MCPs, skills, Kiro steering/hooks, linters, CI pipelines. Uso - /novo-projeto git@github.com:user/repo.git python
---

Voce e o **Bootstrap de Novo Projeto** — clona um repo e configura o toolkit FDEV completo.

## Tarefa do Usuario

$ARGUMENTS

## Instrucoes

### Passo 1: Parsear argumentos

O usuario pode passar:
- **URL do repo** (obrigatorio): `git@github.com:user/repo.git` ou `https://github.com/user/repo.git`
- **Stack** (opcional): `python`, `typescript`, `fullstack`, `go`
- **Diretorio destino** (opcional): default = `/Users/diegomoraes/repos-trabalhos/comunidade/repos-2025/`

Se faltar a URL, perguntar ao usuario.

### Passo 2: Clonar o repo

```bash
cd [diretorio-destino]
git clone [url-do-repo]
cd [nome-do-repo]
```

Se o repo ja existe no destino, perguntar se quer usar o existente.

### Passo 3: Detectar stack (se nao informada)

Verificar arquivos no repo clonado:
- `pyproject.toml`, `requirements.txt`, `*.py` → Python
- `package.json`, `tsconfig.json`, `*.ts` → TypeScript
- `go.mod` → Go
- Vazio/novo → usar a stack informada ou perguntar

### Passo 4: Copiar toolkit FDEV

O FDEV esta em: `/Users/diegomoraes/repos-trabalhos/comunidade/repos-2025/fdev`

```bash
FDEV="/Users/diegomoraes/repos-trabalhos/comunidade/repos-2025/fdev"
REPO="[repo-clonado]"

# === BASE (todos os projetos) ===

# Guardrails
cp "$FDEV/templates/project-setup/.pre-commit-config.yaml" "$REPO/"
cp "$FDEV/templates/project-setup/.editorconfig" "$REPO/"

# Merge .gitignore (nao sobrescrever se ja existe)
if [ -f "$REPO/.gitignore" ]; then
  # Adicionar entradas do FDEV que nao existem
  cat "$FDEV/templates/project-setup/.gitignore" >> "$REPO/.gitignore"
  sort -u "$REPO/.gitignore" -o "$REPO/.gitignore"
else
  cp "$FDEV/templates/project-setup/.gitignore" "$REPO/"
fi

# CI pipelines
mkdir -p "$REPO/.github/workflows"
cp "$FDEV/templates/project-setup/guardrails.yml" "$REPO/.github/workflows/"
cp "$FDEV/templates/project-setup/security.yml" "$REPO/.github/workflows/"

# Claude Code - MCPs + Skills
mkdir -p "$REPO/.claude/skills"
cp "$FDEV/.claude/settings.json" "$REPO/.claude/"
cp -r "$FDEV/.claude/skills/"* "$REPO/.claude/skills/"

# Kiro IDE - MCPs + Hooks + Steering dir
mkdir -p "$REPO/.kiro/"{settings,steering,hooks,specs}
cp "$FDEV/.kiro/settings/mcp.json" "$REPO/.kiro/settings/"
cp "$FDEV/.kiro/hooks/"* "$REPO/.kiro/hooks/"
```

### Passo 5: Configurar por stack

**Python:**
```bash
cp "$FDEV/templates/python/ruff.toml" "$REPO/"
cp "$FDEV/templates/python/pyproject.toml" "$REPO/"
```
Descomentar no `.pre-commit-config.yaml` as secoes:
- `ruff` e `ruff-format`
- `mypy`

**TypeScript:**
```bash
cp "$FDEV/templates/typescript/eslint.config.mjs" "$REPO/"
cp "$FDEV/templates/typescript/tsconfig.json" "$REPO/"
```
Descomentar no `.pre-commit-config.yaml` as secoes:
- `eslint`
- `prettier`

**Fullstack (Python + TypeScript):** aplicar ambos.

### Passo 6: Criar Kiro steering

Criar `.kiro/steering/product.md`:
```markdown
---
inclusion: always
---

# Product Vision - [Nome do Repo]

## Propósito
[Inferir do README ou perguntar ao usuario]

## Stack
[Stack detectada]
```

Criar `.kiro/steering/tech.md`:
```markdown
---
inclusion: always
---

# Tech Stack
[Preencher com a stack detectada e ferramentas]
```

### Passo 7: Criar CLAUDE.md

Criar `CLAUDE.md` na raiz com:
- Idioma: portugues brasileiro
- Nome e descricao do projeto
- Stack detectada
- Lista dos 10 slash commands disponiveis
- Convencoes (conventional commits, branches, cobertura)

### Passo 8: Instalar pre-commit

```bash
cd "$REPO"
pre-commit install
pre-commit install --hook-type commit-msg
```

Se falhar (pre-commit nao instalado), avisar o usuario.

### Passo 9: Commit inicial

Perguntar ao usuario se deseja commitar as configuracoes:
```bash
git add -A
git commit -m "chore: bootstrap com toolkit FDEV (guardrails, MCPs, Kiro, CI)"
git push
```

### Passo 10: Relatorio final

```
## Setup Completo!

**Repo:** [url]
**Stack:** [stack]
**Local:** [caminho]

### O que foi configurado:
- [x] Guardrails (pre-commit, editorconfig, gitignore)
- [x] CI pipelines (guardrails.yml, security.yml)
- [x] MCPs (Context7 + Serena) para Claude Code e Kiro
- [x] 10 slash commands (/planejar, /codificar, etc.)
- [x] Kiro steering (product.md, tech.md)
- [x] Kiro hooks (auto-test, lint, security-check)
- [x] Linter [stack] ([ruff.toml / eslint.config.mjs])
- [x] CLAUDE.md

### Proximo passo:
1. Abrir o projeto no **Kiro IDE**
2. Criar primeira spec: Kiro → New Spec
3. Ou no terminal: `/planejar [sua feature]`
```

### Regras
1. **SEMPRE em Portugues (pt-BR)**
2. **Detectar stack automaticamente** antes de perguntar
3. **Nao sobrescrever** arquivos que ja existem (merge .gitignore, preservar README)
4. **Descomentar hooks** da stack no .pre-commit-config.yaml
5. **Steering personalizado** — inferir do README, nao copiar template generico
6. **Commits em portugues** - SEM Co-Authored-By, SEM mencoes a IA
