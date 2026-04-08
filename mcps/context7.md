# Context7 MCP

## O que e

Context7 fornece **documentacao atualizada** de bibliotecas e frameworks diretamente no contexto do LLM. Em vez de depender de conhecimento memorizado (que pode estar desatualizado), o Context7 busca docs em tempo real.

## Tools Disponiveis

| Tool | Descricao | Exemplo |
|------|-----------|---------|
| `resolve-library-id` | Converte nome da lib em ID Context7 | `resolve-library-id("nextjs")` |
| `query-docs` | Busca documentacao por topico | `query-docs("nextjs", "app router middleware")` |

## Como Usar

### No Prompt (Kiro ou Claude Code)

Basta adicionar **"use context7"** no seu prompt:

```
use context7 para ver como configurar middleware no Next.js 14
use context7 para ver a API de rotas do Express 5
use context7 para ver exemplos de Prisma com relacoes many-to-many
use context7 para ver como usar React Query com SSR
```

### Quando Usar

- Consultando API de uma lib que voce nao domina
- Verificando mudancas de breaking changes entre versoes
- Procurando exemplos oficiais de uso
- Validando se sua implementacao segue o padrao recomendado

### Quando NAO Usar

- Para logica de negocio (Context7 so tem docs de libs)
- Para codigo interno do projeto (use Serena para isso)

## Configuracao

### Claude Code (`.claude/settings.json`)
```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

### Kiro IDE (`.kiro/settings/mcp.json`)
```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp"]
    }
  }
}
```

## Pre-requisitos

- Node.js >= 18
- Conexao com internet
