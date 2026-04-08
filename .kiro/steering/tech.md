---
inclusion: always
---

# Tech Stack

## AI Development Tools

| Ferramenta | Papel | Quando Usar |
|-----------|-------|-------------|
| **Kiro IDE** | IDE principal com specs, steering e hooks | Codificação diária, planejamento de features, design |
| **Claude Code** | Terminal AI com agentes especializados | Tarefas complexas, debugging, infra, multi-domínio |
| **Context7 MCP** | Documentação atualizada de libs/frameworks | Consultar docs sem sair do editor |
| **Serena MCP** | Navegação semântica de código via LSP | Refactoring, busca de símbolos, edição inteligente |

## MCP Servers Configurados

### Context7
- **Pacote:** `@upstash/context7-mcp`
- **Tools:** `resolve-library-id`, `query-docs`
- **Uso:** Adicione "use context7" no prompt para consultar docs

### Serena
- **Pacote:** Python via `uvx` (git+https://github.com/oraios/serena)
- **Tools:** `find_symbol`, `rename_symbol`, `replace_symbol_body`, `get_symbols_overview`, etc.
- **Uso:** Navegação semântica do código, refactoring seguro

## Pré-requisitos

- Node.js >= 18 (para npx/Context7)
- Python >= 3.13 + uv (para Serena)
- Kiro IDE instalado
- Claude Code CLI instalado
