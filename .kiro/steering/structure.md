---
inclusion: always
---

# Estrutura do Toolkit FDEV

```
fdev/
├── workflows/              # Workflows de desenvolvimento (base de conhecimento)
│   ├── planning/           # Planejamento e specs
│   ├── coding/             # Implementação com MCPs
│   ├── review/             # Code review
│   ├── testing/            # Testes automatizados
│   ├── deployment/         # CI/CD e deploy
│   ├── refactoring/        # Refactoring seguro
│   ├── documentation/      # Documentação
│   └── guardrails/         # Pre-commit, linters, segurança
│
├── .claude/skills/         # Slash commands para Claude Code
├── .kiro/                  # Configs Kiro (steering, hooks, MCPs)
├── templates/              # Templates prontos para copiar
├── mcps/                   # Docs dos MCPs
├── CLAUDE.md               # Instruções Claude Code
└── README.md               # Documentação principal
```

## Convenções

- **Workflows** em `workflows/<categoria>/<nome>.md` — seguem o TEMPLATE-WORKFLOW.md
- **Skills** em `.claude/skills/<nome>/SKILL.md` — invocam os workflows
- **Templates** em `templates/` — arquivos prontos para copiar para projetos
- **MCPs docs** em `mcps/` — documentação de uso de cada MCP
