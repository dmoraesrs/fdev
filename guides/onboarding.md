# Guia de Onboarding — Adotando o FDEV no seu Projeto

## Visao Geral

Este guia ensina como adotar o toolkit FDEV em um projeto existente ou novo, passo a passo.

**Tempo estimado:** 30-60 minutos para setup completo.

---

## Passo 1: Pre-requisitos (5 min)

```bash
# Verificar ferramentas
node --version      # >= 18
python3 --version   # >= 3.12
uv --version        # Se nao tem: brew install uv
pre-commit --version # Se nao tem: pip install pre-commit

# Ferramentas AI
claude --version    # Claude Code CLI
# Kiro IDE instalado (kiro.dev)
```

---

## Passo 2: Copiar Configs do FDEV (10 min)

### 2.1 Guardrails (obrigatorio)

```bash
# No diretorio do seu projeto:
cp /caminho/para/fdev/templates/project-setup/.pre-commit-config.yaml .
cp /caminho/para/fdev/templates/project-setup/.editorconfig .
cp /caminho/para/fdev/templates/project-setup/.gitignore .

# Instalar pre-commit
pre-commit install
pre-commit install --hook-type commit-msg

# Criar baseline de secrets
pip install detect-secrets
detect-secrets scan > .secrets.baseline

# Rodar em todos os arquivos (validar)
pre-commit run --all-files
```

### 2.2 Linter por Stack

**Python:**
```bash
cp /caminho/para/fdev/templates/python/ruff.toml .
cp /caminho/para/fdev/templates/python/pyproject.toml .
# Descomentar hooks de Python no .pre-commit-config.yaml
```

**TypeScript:**
```bash
cp /caminho/para/fdev/templates/typescript/eslint.config.mjs .
cp /caminho/para/fdev/templates/typescript/tsconfig.json .
# Descomentar hooks de JS/TS no .pre-commit-config.yaml
# npm install -D eslint typescript-eslint eslint-plugin-security
```

### 2.3 CI Guardrails

```bash
mkdir -p .github/workflows
cp /caminho/para/fdev/templates/project-setup/guardrails.yml .github/workflows/
```

### 2.4 MCPs

```bash
# Claude Code
mkdir -p .claude
cp /caminho/para/fdev/.claude/settings.json .claude/

# Kiro IDE
mkdir -p .kiro/settings
cp /caminho/para/fdev/.kiro/settings/mcp.json .kiro/settings/
```

---

## Passo 3: Configurar Kiro (10 min)

### 3.1 Steering

```bash
mkdir -p .kiro/steering
cp /caminho/para/fdev/templates/kiro-steering/product-template.md .kiro/steering/product.md
cp /caminho/para/fdev/templates/kiro-steering/tech-template.md .kiro/steering/tech.md
```

**Editar `product.md`** com a visao do SEU produto.
**Editar `tech.md`** com a SUA stack.

### 3.2 Hooks

```bash
mkdir -p .kiro/hooks
cp /caminho/para/fdev/.kiro/hooks/*.kiro.hook .kiro/hooks/
```

### 3.3 Specs (quando precisar)

```bash
mkdir -p .kiro/specs
# Copiar templates quando for criar uma spec:
cp -r /caminho/para/fdev/templates/kiro-specs/feature-spec-template .kiro/specs/minha-feature/
```

---

## Passo 4: Configurar Claude Code (5 min)

### 4.1 CLAUDE.md

Criar `CLAUDE.md` na raiz do projeto:

```markdown
# CLAUDE.md - [Nome do Projeto]

Sempre responda em português brasileiro (pt-BR).

## Sobre o Projeto
[Descricao breve]

## Stack
[Linguagem, framework, banco, etc.]

## Comandos Uteis
- `/planejar` - Criar spec de feature
- `/codificar` - Implementar com MCPs
- `/revisar` - Code review
- `/testar` - Criar testes
- `/setup-projeto` - Configurar guardrails

## Convencoes
Ver: workflows/conventions/conventions.md do toolkit FDEV
```

### 4.2 Verificar MCPs

```bash
cd seu-projeto
claude  # Abre Claude Code
# Verificar se MCPs estao ativos:
# Context7 e Serena devem aparecer
```

---

## Passo 5: Primeiro Uso (10 min)

### Testar o fluxo completo:

```bash
# 1. Planejar
/planejar criar spec para [feature simples do seu projeto]

# 2. Ver spec gerada em .kiro/specs/

# 3. Codificar
/codificar implementar a task 1 da spec

# 4. Testar
/testar criar testes para o codigo novo

# 5. Revisar
/revisar o codigo implementado
```

---

## Metricas de Sucesso

Apos adotar o FDEV, acompanhe estas metricas:

| Metrica | Como Medir | Meta |
|---------|-----------|------|
| **Tempo de onboarding** | Dias ate primeiro PR | < 3 dias |
| **Cobertura de testes** | pytest-cov / c8 | >= 80% |
| **Bugs em producao** | Issues com label bug | Reducao de 30% |
| **Tempo medio de review** | PR created → approved | < 24h |
| **Secrets vazados** | Alertas gitleaks/detect-secrets | 0 |
| **Vulnerabilidades** | Trivy/Safety scan | 0 HIGH/CRITICAL |
| **Conventional commits** | % commits com prefixo | >= 95% |

---

## Checklist de Adocao

```
Setup Inicial:
- [ ] Pre-requisitos instalados (node, python, uv, pre-commit)
- [ ] .pre-commit-config.yaml copiado e instalado
- [ ] .editorconfig copiado
- [ ] Linter da stack configurado (ruff.toml ou eslint.config.mjs)
- [ ] CI guardrails configurado
- [ ] MCPs configurados (Context7 + Serena)

Kiro:
- [ ] Steering files criados (product.md, tech.md)
- [ ] Hooks copiados
- [ ] Specs folder criado

Claude Code:
- [ ] CLAUDE.md criado
- [ ] .claude/settings.json com MCPs
- [ ] Slash commands funcionando

Validacao:
- [ ] pre-commit run --all-files passa
- [ ] CI pipeline verde
- [ ] /planejar funciona
- [ ] /codificar funciona
- [ ] Context7 responde ("use context7 para [lib do projeto]")
```

---

## Troubleshooting

| Problema | Solucao |
|----------|---------|
| pre-commit falha na instalacao | `pip install --upgrade pre-commit` |
| detect-secrets bloqueia falso positivo | `detect-secrets audit .secrets.baseline` |
| Context7 nao responde | Verificar `node --version >= 18` e internet |
| Serena nao inicia | Verificar `uv --version` e `python3.13` |
| Slash commands nao aparecem | Verificar `.claude/skills/` esta no projeto |
| Kiro nao carrega steering | Verificar `.kiro/steering/` com `inclusion: always` |
