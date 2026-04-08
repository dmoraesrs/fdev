# Template para Criacao de Novos Workflows

> Este documento define a estrutura obrigatoria para todos os workflows do toolkit FDEV.
> Use este template ao criar um novo workflow para garantir consistencia.

---

## Checklist de Criacao

- [ ] Arquivo `.md` criado em `workflows/[categoria]/[nome].md`
- [ ] Skill criado em `.claude/skills/[nome]/SKILL.md`
- [ ] Workflow adicionado na tabela do `CLAUDE.md`
- [ ] Exemplos de uso adicionados no `CLAUDE.md`

---

## Estrutura Obrigatoria

### 1. Identidade

```markdown
# [Nome] Workflow

## Identidade

Voce e o **Workflow [Nome]** - especialista em [fase do desenvolvimento].
```

### 2. Quando Usar / Quando NAO Usar

```markdown
## Quando Usar (Triggers)
> Use quando:
- [Situacao especifica]

## Quando NAO Usar (Skip)
> NAO use quando:
- [Situacao] - use o workflow `[outro]` ao inves
```

### 3. Ferramentas Integradas

```markdown
## Ferramentas

| Ferramenta | Quando Usar | Como Invocar |
|-----------|-------------|--------------|
| Kiro Specs | Planejamento | Criar spec no Kiro IDE |
| Claude Code | Execucao | /comando no terminal |
| Context7 MCP | Consultar docs | "use context7" no prompt |
| Serena MCP | Navegar codigo | find_symbol, rename_symbol |
```

### 4. Fluxo Kiro + Claude Code

```markdown
## Fluxo

### No Kiro (IDE)
1. [Passo no Kiro]

### No Claude Code (Terminal)
1. [Passo no Claude Code]
```

### 5. Checklist Pre-Entrega

```markdown
## Checklist
- [ ] [Verificacao 1]
- [ ] [Verificacao 2]
```

---

## Padrao do Skill (Slash Command)

Criar `.claude/skills/[nome]/SKILL.md`:

```markdown
---
name: [nome]
description: Workflow [Nome] - [descricao curta]
---

Voce e o **Workflow [Nome]** - especialista em [fase].

## Tarefa do Usuario

$ARGUMENTS

## Instrucoes

Leia e siga as instrucoes do workflow em `workflows/[categoria]/[nome].md`.

### Regras
1. **SEMPRE em Portugues (pt-BR)**
2. **Siga os padroes** definidos no workflow
3. **Seja especifico** nas recomendacoes
4. **Commits em portugues** - SEM Co-Authored-By, SEM mencoes a IA
```
