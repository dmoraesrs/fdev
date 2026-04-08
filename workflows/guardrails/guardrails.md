# Guardrails Workflow

## Identidade

Voce e o **Workflow de Guardrails** - especialista em configurar barreiras de qualidade e seguranca automaticas: pre-commit hooks, linters, formatters, secret scanning, type checking e validacoes de CI.

## Quando Usar (Triggers)

> Use quando:
- Precisa configurar pre-commit hooks no projeto
- Quer adicionar linters e formatters automaticos
- Precisa configurar secret scanning (detect-secrets, gitleaks)
- Quer configurar type checking (mypy, TypeScript strict)
- Precisa configurar commit message standards (conventional commits)
- Quer adicionar guardrails de seguranca no CI

## Quando NAO Usar (Skip)

> NAO use quando:
- Precisa fazer security review profundo - use agente `secops` do repo de agentes
- Precisa configurar pipeline CI/CD completa - use o workflow `deployment`
- Precisa configurar regras de branch protection - use o workflow `deployment`

## Ferramentas

| Ferramenta | Quando Usar | Como Invocar |
|-----------|-------------|--------------|
| Claude Code | Configurar guardrails | `/setup-projeto` ou `/codificar` |
| Context7 MCP | Docs de ferramentas | "use context7" |
| Kiro Hooks | Automacoes no editor | `.kiro/hooks/` |

## Stack de Guardrails Recomendada

### Pre-commit Hooks

```yaml
# .pre-commit-config.yaml
repos:
  # ===== FORMATACAO =====
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.6.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-json
      - id: check-added-large-files
        args: ['--maxkb=500']
      - id: check-merge-conflict
      - id: detect-private-key
      - id: no-commit-to-branch
        args: ['--branch', 'main']

  # ===== SECRETS =====
  - repo: https://github.com/Yelp/detect-secrets
    rev: v1.5.0
    hooks:
      - id: detect-secrets
        args: ['--baseline', '.secrets.baseline']

  # ===== PYTHON (se aplicavel) =====
  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.7.0
    hooks:
      - id: ruff
        args: [--fix]
      - id: ruff-format

  - repo: https://github.com/pre-commit/mirrors-mypy
    rev: v1.13.0
    hooks:
      - id: mypy
        additional_dependencies: []

  # ===== JAVASCRIPT/TYPESCRIPT (se aplicavel) =====
  - repo: https://github.com/pre-commit/mirrors-eslint
    rev: v9.13.0
    hooks:
      - id: eslint
        files: \.(js|jsx|ts|tsx)$

  - repo: https://github.com/pre-commit/mirrors-prettier
    rev: v4.0.0-alpha.8
    hooks:
      - id: prettier
        files: \.(js|jsx|ts|tsx|css|md|json|yaml|yml)$

  # ===== COMMIT MESSAGE =====
  - repo: https://github.com/compilerla/conventional-pre-commit
    rev: v3.6.0
    hooks:
      - id: conventional-pre-commit
        stages: [commit-msg]
        args: [feat, fix, docs, style, refactor, test, chore, ci, perf]

  # ===== DOCKER (se aplicavel) =====
  - repo: https://github.com/hadolint/hadolint
    rev: v2.12.0
    hooks:
      - id: hadolint
```

### Setup Automatico

```bash
# Instalar pre-commit
pip install pre-commit  # ou: brew install pre-commit

# Instalar hooks no repo
pre-commit install
pre-commit install --hook-type commit-msg

# Rodar em todos os arquivos (primeira vez)
pre-commit run --all-files

# Criar baseline de secrets (para detect-secrets)
detect-secrets scan > .secrets.baseline
```

### EditorConfig

```ini
# .editorconfig
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[*.{py,pyi}]
indent_size = 4

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab
```

### Commitlint (alternativa JS)

```json
// .commitlintrc.json
{
  "extends": ["@commitlint/config-conventional"],
  "rules": {
    "type-enum": [2, "always", [
      "feat", "fix", "docs", "style", "refactor",
      "test", "chore", "ci", "perf", "revert"
    ]],
    "subject-max-length": [2, "always", 100],
    "body-max-line-length": [2, "always", 200]
  }
}
```

## Guardrails no CI (GitHub Actions)

```yaml
# .github/workflows/guardrails.yml
name: Guardrails

on: [push, pull_request]

jobs:
  pre-commit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.13'
      - uses: pre-commit/action@v3.0.1

  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Gitleaks
        uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}

  dependency-review:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    steps:
      - uses: actions/checkout@v4
      - uses: actions/dependency-review-action@v4
```

## Guardrails por Stack

| Stack | Linter | Formatter | Type Check | Security |
|-------|--------|-----------|------------|----------|
| **Python** | ruff | ruff format | mypy | bandit, safety |
| **TypeScript** | eslint | prettier | tsc --strict | npm audit |
| **Go** | golangci-lint | gofmt | (built-in) | govulncheck |
| **Rust** | clippy | rustfmt | (built-in) | cargo audit |
| **Docker** | hadolint | - | - | trivy, snyk |
| **Terraform** | tflint | terraform fmt | - | tfsec, checkov |
| **YAML/JSON** | yamllint | prettier | - | - |

## Kiro Hooks para Guardrails

### Lint on Save
```json
{
  "enabled": true,
  "name": "Lint on Save",
  "version": "1",
  "when": {
    "type": "fileSaved",
    "patterns": ["src/**/*"]
  },
  "then": {
    "type": "askAgent",
    "prompt": "Run the linter on the saved file and fix any issues automatically."
  }
}
```

### Security Check on New File
```json
{
  "enabled": true,
  "name": "Security Check",
  "version": "1",
  "when": {
    "type": "fileCreated",
    "patterns": ["**/*.env*", "**/secret*", "**/credential*"]
  },
  "then": {
    "type": "askAgent",
    "prompt": "A potentially sensitive file was created. Check if it's in .gitignore and doesn't contain hardcoded secrets."
  }
}
```

## Regras por Prioridade

| Prioridade | Regra | Descricao |
|-----------|-------|-----------|
| CRITICAL | pre-commit hooks devem bloquear secrets | Secrets no Git sao permanentes |
| CRITICAL | no-commit-to-branch em main | Push direto em main sem review |
| HIGH | Linter + formatter devem rodar automaticamente | Code style inconsistente gera ruido em PRs |
| HIGH | CI deve replicar pre-commit | Guardrails locais podem ser bypassados |
| MEDIUM | Conventional commits enforced | Sem padrao, changelog e impossivel |
| MEDIUM | check-added-large-files configurado | Binarios no Git inflam o repo |

## Anti-Patterns

| Anti-Pattern | Por que e perigoso | O que fazer |
|-------------|-------------------|-------------|
| `git commit --no-verify` | Bypassa todos os guardrails | Bloquear no CI (mesmas validacoes) |
| Secrets baseline desatualizado | Novos secrets passam despercebidos | CI roda detect-secrets audit |
| Linter com muitas regras off | Falsa sensacao de qualidade | Comecar com preset strict, desligar so com justificativa |
| Pre-commit sem CI correspondente | Dev pode pular hooks locais | CI e a barreira final |

## Checklist Pre-Entrega

- [ ] `.pre-commit-config.yaml` criado e instalado
- [ ] `.editorconfig` criado
- [ ] Secret scanning configurado com baseline
- [ ] Conventional commits enforced
- [ ] CI replica os guardrails locais
- [ ] Documentacao de setup no README
- [ ] `no-commit-to-branch` protege main
