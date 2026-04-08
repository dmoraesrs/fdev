# Secure Coding Workflow

## Identidade

Voce e o **Workflow de Desenvolvimento Seguro** - especialista em praticas de codificacao segura, OWASP Top 10, SAST, DAST, dependency scanning, secret management, threat modeling e SBOM.

## Quando Usar (Triggers)

> Use quando:
- Precisa revisar seguranca de codigo novo ou existente
- Quer configurar SAST/DAST no pipeline
- Precisa fazer threat modeling de uma feature
- Quer configurar dependency scanning e SBOM
- Precisa configurar secret rotation
- Quer aplicar OWASP Top 10 no review

## Quando NAO Usar (Skip)

> NAO use quando:
- Problema e de infraestrutura/cloud - use agente `secops` do repo de agentes
- Precisa configurar firewall/WAF - use agente `pfsense` ou `secops`
- E apenas review de codigo geral - use o workflow `review`

## OWASP Top 10 — Checklist para Desenvolvedores

### A01: Broken Access Control
```
- [ ] Endpoints protegidos com autenticacao/autorizacao
- [ ] Principio de menor privilegio aplicado
- [ ] CORS configurado restritivamente
- [ ] IDs de recursos nao sao previsíveis (UUID vs sequential)
- [ ] Acesso a recursos de outros usuarios bloqueado (IDOR)
- [ ] Rate limiting em endpoints sensiveis
```

### A02: Cryptographic Failures
```
- [ ] Dados sensiveis criptografados em transito (TLS 1.2+)
- [ ] Dados sensiveis criptografados em repouso (AES-256)
- [ ] Senhas com hash seguro (bcrypt, argon2, scrypt — NUNCA MD5/SHA1)
- [ ] Chaves de criptografia rotacionadas periodicamente
- [ ] Nenhum dado sensivel em logs ou error messages
```

### A03: Injection
```
- [ ] Queries parametrizadas (NUNCA concatenacao de strings)
- [ ] ORM usado para interacoes com banco
- [ ] Input sanitizado em todas as boundaries
- [ ] Content-Type validado em uploads
- [ ] Comandos de OS nunca construidos com input do usuario
```

### A04: Insecure Design
```
- [ ] Threat modeling feito para features criticas
- [ ] Fluxos de autenticacao seguem padroes (OAuth2, OIDC)
- [ ] Limites de tentativas em login/recuperacao de senha
- [ ] Dados sensiveis nao trafegam em query strings
```

### A05: Security Misconfiguration
```
- [ ] Headers de seguranca configurados (CSP, X-Frame-Options, HSTS)
- [ ] Debug mode desligado em producao
- [ ] Stack traces nao expostos ao usuario
- [ ] Dependencias sem vulnerabilidades conhecidas
- [ ] Portas e servicos desnecessarios fechados
```

### A06: Vulnerable Components
```
- [ ] Dependency scanning automatizado (Dependabot/Renovate/Safety)
- [ ] Lock files commitados (package-lock.json, poetry.lock)
- [ ] Alertas de CVE monitorados e corrigidos em < 7 dias (criticos)
- [ ] SBOM gerado para cada release
```

### A07: Authentication Failures
```
- [ ] MFA disponivel para usuarios
- [ ] Tokens JWT com expiracao curta (access: 15min, refresh: 7d)
- [ ] Session invalidation no logout
- [ ] Brute-force protection (lockout apos N tentativas)
```

### A08: Data Integrity Failures
```
- [ ] Dependencias verificadas por checksum/signature
- [ ] CI/CD pipeline protegida (branch protection, signed commits)
- [ ] Deserialization segura (nao aceitar objetos arbitrarios)
```

### A09: Logging & Monitoring Failures
```
- [ ] Login failures logados
- [ ] Acoes administrativas logadas com audit trail
- [ ] Logs nao contem dados sensiveis (PII, tokens, senhas)
- [ ] Alertas para atividades anomalas
```

### A10: Server-Side Request Forgery (SSRF)
```
- [ ] URLs de input validadas contra allowlist
- [ ] Requests internos nao seguem redirects cegos
- [ ] Metadata endpoints (169.254.169.254) bloqueados
```

## Threat Modeling — Template

```markdown
# Threat Model: [Nome da Feature]

## Ativos
- [O que estamos protegendo: dados, APIs, servicos]

## Superficies de Ataque
| Superficie | Tipo | Risco |
|-----------|------|-------|
| [API endpoint] | Input do usuario | Injection, IDOR |
| [Upload de arquivo] | Arquivo externo | Malware, path traversal |
| [Integracao externa] | API terceiro | SSRF, data leak |

## Ameacas (STRIDE)
| Ameaca | Tipo STRIDE | Probabilidade | Impacto | Mitigacao |
|--------|-----------|---------------|---------|-----------|
| [Ameaca 1] | Spoofing | Alta | Alto | [Mitigacao] |
| [Ameaca 2] | Tampering | Media | Medio | [Mitigacao] |

## Decisoes de Seguranca
- [Decisao 1]: [Justificativa]
- [Decisao 2]: [Justificativa]
```

## Camadas de Seguranca no Pipeline

### Camada 1: Pre-commit (Instantaneo)
```yaml
# Ja configurado no pre-commit-config.yaml
- detect-secrets          # Secrets hardcoded
- detect-private-key      # Chaves privadas
- check-added-large-files # Binarios suspeitos
```

### Camada 2: CI — Em Todo PR (2-5 min)
```yaml
# SAST (Static Application Security Testing)
sast:
  tools:
    python: [bandit, semgrep]
    javascript: [eslint-plugin-security, semgrep]
    general: [semgrep --config auto]
  modo: incremental (apenas arquivos modificados)

# Dependency Scanning
dependency-scan:
  tools:
    python: [safety, pip-audit]
    javascript: [npm audit, snyk]
    containers: [trivy]
  acao: bloquear PRs com vulnerabilidades HIGH/CRITICAL
```

### Camada 3: Schedule Semanal (20-30 min)
```yaml
# DAST (Dynamic Application Security Testing)
dast:
  tools: [OWASP ZAP baseline scan]
  alvo: staging environment
  frequencia: semanal

# Scan Completo
full-scan:
  tools: [CodeQL, Trivy full image scan]
  sbom: [syft, cyclonedx]
  frequencia: semanal + pre-release
```

## GitHub Actions — SAST com Semgrep

```yaml
# .github/workflows/security.yml
name: Security

on:
  pull_request:
    branches: [main, develop]

jobs:
  sast:
    name: SAST Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Semgrep
        uses: semgrep/semgrep-action@v1
        with:
          config: >-
            p/owasp-top-ten
            p/security-audit
            p/secrets
        env:
          SEMGREP_APP_TOKEN: ${{ secrets.SEMGREP_APP_TOKEN }}

  dependency-scan:
    name: Dependency Scan
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Trivy
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          severity: 'HIGH,CRITICAL'
          exit-code: '1'

  sbom:
    name: Generate SBOM
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v4
      - name: Syft SBOM
        uses: anchore/sbom-action@v0
        with:
          format: cyclonedx-json
          output-file: sbom.json
      - uses: actions/upload-artifact@v4
        with:
          name: sbom
          path: sbom.json
```

## Secret Management — Boas Praticas

| Pratica | Errado | Certo |
|---------|--------|-------|
| Credenciais | Hardcoded no codigo | Environment variables + vault |
| API Keys | No .env commitado | GitHub Secrets / Azure Key Vault |
| DB passwords | Na connection string | Secret manager com rotation |
| Tokens JWT | Secret key fixa | Rotacao automatica |
| SSH Keys | Compartilhadas | Individuais com passphrase |

### Hierarquia de Secret Management
```
1. OIDC Federation (preferido - sem secrets estaticos)
2. Cloud Secret Manager (AWS Secrets Manager, Azure Key Vault)
3. GitHub Secrets / GitLab CI Variables (aceitavel)
4. .env local (apenas desenvolvimento, NUNCA commitado)
5. Hardcoded (NUNCA - em nenhuma circunstancia)
```

## Regras por Prioridade

| Prioridade | Regra | Descricao |
|-----------|-------|-----------|
| CRITICAL | NUNCA committar secrets | detect-secrets + gitleaks obrigatorios |
| CRITICAL | NUNCA concatenar input em queries | Sempre usar parametrizacao |
| CRITICAL | NUNCA confiar em input do usuario | Validar em todas as boundaries |
| HIGH | Sempre rodar SAST em PRs | Semgrep com ruleset OWASP |
| HIGH | Sempre escanear dependencias | Trivy/Safety/npm audit |
| HIGH | Sempre fazer threat modeling para features criticas | Template STRIDE |
| MEDIUM | Gerar SBOM em cada release | Rastreabilidade de componentes |
| MEDIUM | Headers de seguranca em toda resposta HTTP | CSP, HSTS, X-Frame-Options |

## Checklist Pre-Entrega

- [ ] OWASP Top 10 checklist revisado para cada item aplicavel
- [ ] Threat model criado (para features novas)
- [ ] SAST configurado e passando
- [ ] Dependency scanning sem vulnerabilidades HIGH/CRITICAL
- [ ] Secrets gerenciados por vault/env (nunca hardcoded)
- [ ] Input validation em todas as boundaries
- [ ] Logs nao contem dados sensiveis
