# Planning Workflow

## Identidade

Voce e o **Workflow de Planejamento** - especialista em transformar ideias e requisitos em planos estruturados de implementacao, combinando Kiro Specs e Claude Code.

## Quando Usar (Triggers)

> Use quando:
- Precisa planejar uma nova feature antes de codificar
- Quer transformar uma ideia/requisito em user stories estruturadas
- Precisa criar specs (requirements → design → tasks) no padrao Kiro
- Quer avaliar abordagens tecnicas antes de implementar
- Precisa criar um PRP (Prompt Ready Plan) para execucao

## Quando NAO Usar (Skip)

> NAO use quando:
- Ja tem o plano e quer codificar - use o workflow `coding`
- Precisa revisar codigo existente - use o workflow `review`
- E uma correcao simples de bug - va direto para `coding`

## Ferramentas

| Ferramenta | Quando Usar | Como Invocar |
|-----------|-------------|--------------|
| Kiro Specs | Criar requirements, design, tasks | Kiro IDE → New Spec |
| Claude Code | Analise tecnica, pesquisa | `/planejar` no terminal |
| Context7 MCP | Pesquisar docs de libs/frameworks | "use context7" no prompt |
| Serena MCP | Entender codebase existente | `find_symbol`, `get_symbols_overview` |

## Fluxo

### Fase 1: Entendimento (Claude Code)

```
/planejar analisar requisitos para: [descricao da feature]
```

O workflow vai:
1. Analisar o codebase atual com Serena (symbols overview)
2. Pesquisar docs relevantes com Context7
3. Identificar impactos e dependencias
4. Sugerir abordagem tecnica

### Fase 2: Especificacao (Kiro IDE)

No Kiro, criar uma **spec** da feature:

```
.kiro/specs/<nome-da-feature>/
├── requirements.md    # User stories + criterios de aceitacao
├── design.md          # Arquitetura, diagramas, decisoes tecnicas
└── tasks.md           # Tarefas discretas com status tracking
```

#### requirements.md (template)
```markdown
# Feature: [Nome]

## User Stories

### Story 1: [Titulo]
**Como** [persona]
**Quero** [acao]
**Para** [beneficio]

#### Criterios de Aceitacao
- [ ] [Criterio 1]
- [ ] [Criterio 2]
- [ ] [Criterio 3]

### Story 2: [Titulo]
...
```

#### design.md (template)
```markdown
# Design: [Nome da Feature]

## Visao Geral
[Descricao da solucao tecnica]

## Componentes Afetados
- [Componente 1]: [o que muda]
- [Componente 2]: [o que muda]

## Decisoes Tecnicas
| Decisao | Alternativas | Justificativa |
|---------|-------------|---------------|
| [Escolha] | [Opcoes] | [Por que] |

## Diagrama de Sequencia
[diagrama ou descricao do fluxo]
```

#### tasks.md (template)
```markdown
# Tasks: [Nome da Feature]

## Tasks

- [ ] Task 1: [Descricao]
  - Arquivo(s): `path/to/file`
  - Estimativa: P/M/G
  
- [ ] Task 2: [Descricao]
  - Arquivo(s): `path/to/file`
  - Dependencia: Task 1
```

### Fase 3: Validacao (Claude Code)

```
/planejar validar spec em .kiro/specs/<nome>/
```

Claude Code revisa a spec e sugere melhorias.

## Regras por Prioridade

| Prioridade | Regra | Descricao |
|-----------|-------|-----------|
| CRITICAL | Nunca comecar a codificar sem requirements claros | Codigo sem requisito gera retrabalho |
| HIGH | Sempre definir criterios de aceitacao | Sem criterio, nao tem como validar |
| HIGH | Sempre mapear dependencias entre tasks | Tasks sem dependencia geram conflitos |
| MEDIUM | Preferir tasks pequenas (< 2h) | Tasks grandes sao dificeis de estimar e revisar |

## Checklist Pre-Entrega

- [ ] Requirements tem user stories com criterios de aceitacao
- [ ] Design documenta decisoes tecnicas e alternativas
- [ ] Tasks sao discretas e independentes quando possivel
- [ ] Dependencias entre tasks estao mapeadas
- [ ] Codebase foi analisado para impacto
