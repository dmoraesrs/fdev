---
inclusion: always
---

# Fluxo de Trabalho: Kiro + Claude Code

## Quando Usar Cada Ferramenta

### Kiro IDE — Planejamento e Codificação

1. **Specs** — Transformar ideias em planos estruturados
   - Criar spec → Kiro gera requirements → design → tasks
   - Tasks com checkbox tracking (pending/in-progress/done)
   
2. **Steering** — Contexto persistente
   - `product.md`: visão do produto
   - `tech.md`: stack e constraints
   - `structure.md`: organização do código
   - Arquivos custom com `inclusion: fileMatch` para contexto condicional

3. **Hooks** — Automação
   - Rodar testes ao salvar
   - Lint automático
   - Atualizar docs

4. **MCPs** — Ferramentas extras
   - Context7: consultar docs de libs
   - Serena: navegação semântica de código

### Claude Code — Tarefas Complexas e Multi-Domínio

1. **Agentes Especializados** — Delegar para especialistas
   - `/k8s`, `/devops`, `/secops`, `/fastapi-developer`, etc.
   
2. **Orquestrador** — Tarefas que cruzam domínios
   - `/orquestrador` coordena múltiplos agentes
   
3. **Memória** — Contexto entre conversas
   - Lembra preferências, decisões, contexto do projeto
   
4. **Execução** — Terminal AI
   - Rodar comandos, scripts, deploys

## Fluxo Recomendado

```
1. PLANEJAR (Kiro)
   └─ Criar spec da feature
      └─ requirements.md → design.md → tasks.md

2. CODIFICAR (Kiro + Claude Code)
   ├─ Kiro: editar código com MCPs (Context7 + Serena)
   └─ Claude Code: tarefas complexas, debugging, infra

3. REVISAR (Claude Code)
   └─ /code-reviewer para review automatizado

4. TESTAR (Claude Code)
   └─ /tester para criar e rodar testes

5. DEPLOY (Claude Code)
   └─ /devops para CI/CD e deploy
```
