# Serena MCP

## O que e

Serena e um MCP de **navegacao semantica de codigo** via LSP. Diferente de grep/find, o Serena entende a estrutura do codigo — encontra simbolos, referencias, e permite renomear/mover com seguranca.

## Tools Disponiveis

### Symbol Tools (Core)

| Tool | Descricao | Quando Usar |
|------|-----------|-------------|
| `find_symbol` | Busca global de simbolos (funcoes, classes, etc.) | Encontrar onde algo esta definido |
| `find_referencing_symbols` | Encontra todas as referencias a um simbolo | Ver quem usa uma funcao antes de modificar |
| `get_symbols_overview` | Overview dos simbolos top-level de um arquivo | Entender a estrutura de um arquivo |
| `rename_symbol` | Renomeia em todo o codebase | Refactoring seguro |
| `replace_symbol_body` | Substitui o corpo de uma funcao/metodo | Reescrever logica mantendo assinatura |
| `insert_after_symbol` | Insere codigo apos um simbolo | Adicionar metodo novo a uma classe |
| `insert_before_symbol` | Insere codigo antes de um simbolo | Adicionar import ou decorador |
| `safe_delete_symbol` | Remove simbolo com seguranca | Limpar codigo morto |

### File Tools

| Tool | Descricao |
|------|-----------|
| `read_file` | Le arquivos (desabilitado no modo claude-code) |
| `search_for_pattern` | Busca por padrao regex |
| `find_file` | Encontra arquivos por nome |

### Memory Tools

| Tool | Descricao |
|------|-----------|
| `write_memory` / `read_memory` | Persiste informacoes entre sessoes |

## Como Usar

### Antes de Modificar Codigo

```
# 1. Entenda a estrutura do arquivo
get_symbols_overview("src/services/user.ts")

# 2. Encontre quem usa o que voce vai mudar
find_referencing_symbols("UserService.createUser")

# 3. So entao modifique
```

### Para Refactoring

```
# Renomear funcao em todo o codebase (seguro!)
rename_symbol("getUserById", "findUserById")

# Reescrever corpo de funcao
replace_symbol_body("validate", "novo codigo aqui")

# Remover funcao nao usada
safe_delete_symbol("oldHelper")
```

### No Claude Code

O modo `--context claude-code` desabilita tools que duplicam funcionalidades nativas (read_file, execute_shell_command), mantendo apenas as tools semanticas.

### No Kiro IDE

O modo `--context ide` mantem todas as tools disponiveis.

## Configuracao

### Claude Code (`.claude/settings.json`)
```json
{
  "mcpServers": {
    "serena": {
      "command": "uvx",
      "args": [
        "-p", "3.13",
        "--from", "git+https://github.com/oraios/serena",
        "serena", "start-mcp-server",
        "--context", "claude-code",
        "--project-from-cwd"
      ]
    }
  }
}
```

### Kiro IDE (`.kiro/settings/mcp.json`)
```json
{
  "mcpServers": {
    "serena": {
      "command": "uvx",
      "args": [
        "-p", "3.13",
        "--from", "git+https://github.com/oraios/serena",
        "serena", "start-mcp-server",
        "--context", "ide",
        "--project", "${workspaceFolder}"
      ]
    }
  }
}
```

## Pre-requisitos

- Python >= 3.13
- uv (`brew install uv` ou `pip install uv`)
