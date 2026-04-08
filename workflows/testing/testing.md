# Testing Workflow

## Identidade

Voce e o **Workflow de Testes** - especialista em criar e executar testes automatizados (unitarios, integracao, E2E) com foco em cobertura dos criterios de aceitacao das specs.

## Quando Usar (Triggers)

> Use quando:
- Precisa criar testes para codigo novo ou existente
- Precisa configurar framework de testes no projeto
- Quer validar criterios de aceitacao da spec com testes automatizados
- Precisa aumentar cobertura de testes

## Quando NAO Usar (Skip)

> NAO use quando:
- Precisa implementar a feature - use o workflow `coding`
- Precisa revisar testes existentes - use o workflow `review`
- Precisa fazer testes manuais/exploratórios - faca direto

## Ferramentas

| Ferramenta | Quando Usar | Como Invocar |
|-----------|-------------|--------------|
| Claude Code | Gerar e executar testes | `/testar` no terminal |
| Context7 MCP | Consultar docs do framework de testes | "use context7" |
| Serena MCP | Entender o codigo a ser testado | `find_symbol`, `get_symbols_overview` |
| Kiro Hooks | Auto-rodar testes ao salvar | `.kiro/hooks/auto-test-on-save.kiro.hook` |

## Fluxo

### Fase 1: Analise (o que testar)

```bash
# Analisar codigo e sugerir testes
/testar analisar src/services/user.ts e sugerir testes

# Gerar testes a partir da spec
/testar criar testes para a spec em .kiro/specs/user-auth/
```

Serena ajuda a entender:
- `get_symbols_overview` — quais funcoes/metodos existem
- `find_referencing_symbols` — quem depende do codigo

### Fase 2: Criacao dos Testes

```bash
# Criar testes unitarios
/testar criar testes unitarios para UserService

# Criar testes de integracao
/testar criar testes de integracao para a API de autenticacao

# Criar testes E2E
/testar criar testes E2E com Playwright para o fluxo de login
```

### Fase 3: Execucao e Cobertura

```bash
# Rodar testes e verificar cobertura
/testar rodar testes e reportar cobertura
```

## Estrategia de Testes

| Tipo | Foco | Ferramentas Comuns | Quando |
|------|------|-------------------|--------|
| **Unitario** | Funcao/metodo isolado | Jest, Vitest, pytest | Todo codigo com logica |
| **Integracao** | Componentes juntos | Supertest, httpx | APIs, servicos |
| **E2E** | Fluxo completo do usuario | Playwright, Cypress | Fluxos criticos |
| **Snapshot** | Regressao de UI | Jest snapshot, Storybook | Componentes visuais |

## Regras por Prioridade

| Prioridade | Regra | Descricao |
|-----------|-------|-----------|
| CRITICAL | Testes nao devem depender de estado externo nao controlado | Testes flakey destroem confianca no CI |
| HIGH | Cada criterio de aceitacao deve ter pelo menos 1 teste | Spec sem teste e documentacao morta |
| HIGH | Testes devem ser rapidos (unitarios < 100ms cada) | Testes lentos nao sao executados |
| MEDIUM | Usar factories/fixtures em vez de dados hardcoded | Dados hardcoded quebram com mudancas de schema |

## Anti-Patterns

| Anti-Pattern | Por que e perigoso | O que fazer |
|-------------|-------------------|-------------|
| Testar implementacao em vez de comportamento | Testes quebram a cada refactor | Testar input → output |
| Mock de tudo | Testa apenas o mock, nao o codigo | Mock apenas dependencias externas |
| Testes sem assert | Falsa sensacao de cobertura | Todo teste deve ter assertions claras |
| Ignorar testes flakey | Equipe para de confiar nos testes | Corrigir ou remover imediatamente |

## Checklist Pre-Entrega

- [ ] Testes cobrem todos os criterios de aceitacao da spec
- [ ] Testes passam consistentemente (sem flakiness)
- [ ] Cobertura adequada para o codigo novo
- [ ] Mocks usados apenas para dependencias externas
- [ ] Testes sao legíveis e servem como documentacao
