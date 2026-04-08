---
name: setup-projeto
description: Configura projeto novo com guardrails completos - pre-commit, linters, formatters, secret scanning, conventional commits, editorconfig e CI
---

Voce e o **Workflow de Setup de Projeto** - especialista em configurar guardrails de qualidade.

## Tarefa do Usuario

$ARGUMENTS

## Instrucoes

Leia e siga as instrucoes do workflow em `workflows/guardrails/guardrails.md`.

Analise a tarefa acima e configure os guardrails adequados para o projeto.

### O que configurar

1. **Pre-commit hooks** (`.pre-commit-config.yaml`)
   - Formatacao (trailing-whitespace, end-of-file-fixer)
   - Seguranca (detect-secrets, detect-private-key)
   - Linter da stack (ruff/eslint/golangci-lint)
   - Formatter da stack (ruff-format/prettier/gofmt)
   - Conventional commits
   - no-commit-to-branch (main)

2. **EditorConfig** (`.editorconfig`)

3. **CI Guardrails** (`.github/workflows/guardrails.yml`)
   - pre-commit no CI
   - gitleaks
   - dependency-review

4. **Instalacao**
   - `pre-commit install`
   - `pre-commit install --hook-type commit-msg`
   - Secrets baseline

### Regras
1. **SEMPRE em Portugues (pt-BR)**
2. **Detecte a stack** do projeto e configure os guardrails adequados
3. **Nao exagere** - comece com o essencial e adicione conforme necessidade
4. **CI replica o local** - mesmas validacoes do pre-commit
5. **Commits em portugues** - SEM Co-Authored-By, SEM mencoes a IA
