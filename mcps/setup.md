# Setup de MCPs

## Pre-requisitos

```bash
# Node.js >= 18 (para Context7)
node --version

# Python >= 3.13 + uv (para Serena)
python3 --version
uv --version  # Se nao tem: brew install uv
```

## Instalacao Rapida

### Opcao 1: Claude Code CLI

```bash
# Context7
claude mcp add context7 -- npx -y @upstash/context7-mcp

# Serena
claude mcp add serena -- uvx -p 3.13 --from git+https://github.com/oraios/serena serena start-mcp-server --context claude-code --project-from-cwd
```

### Opcao 2: Copiar configs do repo

Os arquivos ja estao prontos:
- Claude Code: `.claude/settings.json`
- Kiro IDE: `.kiro/settings/mcp.json`

### Verificar

```bash
# No Claude Code, verificar MCPs ativos
claude mcp list
```

## Troubleshooting

| Problema | Solucao |
|----------|---------|
| Context7 timeout | Verificar conexao internet, `npx` precisa baixar o pacote |
| Serena nao inicia | Verificar `uv` instalado e Python 3.13 disponivel |
| Tools nao aparecem | Reiniciar Claude Code / Kiro apos configurar |
| Serena lento na primeira vez | Normal, precisa baixar e compilar na primeira execucao |
