# Design System Workflow

## Identidade

Voce e o **Workflow de Design System** - especialista em definir e implementar padroes de UI/UX, design tokens, componentes reutilizaveis, acessibilidade e consistencia visual em projetos frontend.

## Quando Usar (Triggers)

> Use quando:
- Precisa definir design tokens (cores, espacamento, tipografia)
- Quer criar ou padronizar componentes UI
- Precisa configurar tema (light/dark mode)
- Quer fazer audit de acessibilidade (WCAG)
- Precisa configurar biblioteca de componentes (shadcn, Radix, MUI)
- Quer padronizar responsive design e breakpoints

## Quando NAO Usar (Skip)

> NAO use quando:
- Precisa implementar logica de backend - use o workflow `coding`
- Precisa configurar API - use o workflow `coding` ou agente `backend-design-system`
- Precisa deploy de frontend - use o workflow `deployment`

## Ferramentas

| Ferramenta | Quando Usar | Como Invocar |
|-----------|-------------|--------------|
| Claude Code | Configurar design system | `/design-system` no terminal |
| Context7 MCP | Docs de Tailwind, shadcn, Radix, etc. | "use context7" |
| Serena MCP | Navegar componentes existentes | `find_symbol`, `get_symbols_overview` |
| Kiro IDE | Editar componentes com preview | Editor principal |

## Design Tokens — Padrao

```typescript
// tokens/colors.ts
export const colors = {
  // Semanticos (usar estes no codigo)
  primary: { DEFAULT: '#2563eb', hover: '#1d4ed8', active: '#1e40af' },
  secondary: { DEFAULT: '#64748b', hover: '#475569' },
  success: { DEFAULT: '#16a34a', light: '#dcfce7' },
  warning: { DEFAULT: '#d97706', light: '#fef3c7' },
  error: { DEFAULT: '#dc2626', light: '#fee2e2' },

  // Superficie
  background: { DEFAULT: '#ffffff', secondary: '#f8fafc' },
  foreground: { DEFAULT: '#0f172a', muted: '#64748b' },
  border: { DEFAULT: '#e2e8f0' },
} as const

// tokens/spacing.ts
export const spacing = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '1rem',     // 16px
  lg: '1.5rem',   // 24px
  xl: '2rem',     // 32px
  '2xl': '3rem',  // 48px
} as const

// tokens/typography.ts
export const typography = {
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'monospace'],
  },
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
  },
} as const
```

## Estrutura de Componentes

```
src/
├── components/
│   ├── ui/              # Primitivos (Button, Input, Badge)
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   └── index.ts     # Re-exports
│   │
│   ├── composed/        # Compostos (SearchBar, DataTable, FormField)
│   │   ├── search-bar.tsx
│   │   └── data-table.tsx
│   │
│   └── layout/          # Layout (Header, Sidebar, Footer, Page)
│       ├── header.tsx
│       └── sidebar.tsx
│
├── tokens/              # Design tokens
│   ├── colors.ts
│   ├── spacing.ts
│   └── typography.ts
│
└── styles/
    └── globals.css      # CSS variáveis + reset
```

## Checklist de Componente

Cada componente DEVE ter:
```
- [ ] Props tipadas com TypeScript (interface, not type)
- [ ] Variantes via class-variance-authority (cva) ou similar
- [ ] Suporte a className para customizacao
- [ ] Ref forwarding (React.forwardRef)
- [ ] Acessibilidade (aria-labels, roles, keyboard nav)
- [ ] Responsivo (mobile-first)
- [ ] Dark mode (via CSS variables, nao condicional)
- [ ] Storybook story ou exemplo de uso
```

## Acessibilidade — WCAG 2.1 AA

| Criterio | Requisito | Como Verificar |
|----------|----------|----------------|
| **Contraste** | Ratio >= 4.5:1 (texto), >= 3:1 (grande) | Chrome DevTools / axe |
| **Keyboard** | Tudo acessivel via teclado | Tab through all elements |
| **Screen Reader** | Labels em todos os interativos | aria-label, aria-describedby |
| **Focus** | Focus visible em todos os interativos | :focus-visible outline |
| **Motion** | Respeitar prefers-reduced-motion | @media (prefers-reduced-motion) |
| **Semantica** | HTML semantico (nav, main, aside) | Lighthouse audit |

### Ferramentas de Audit
```bash
# Lighthouse (integrado no Chrome)
# axe DevTools (extensao Chrome)
# eslint-plugin-jsx-a11y (lint automatico)

# CI: pa11y para testes automatizados
npx pa11y http://localhost:3000
```

## Responsive Design — Breakpoints

```css
/* Mobile-first breakpoints */
--bp-sm: 640px;   /* Small: mobile landscape */
--bp-md: 768px;   /* Medium: tablet */
--bp-lg: 1024px;  /* Large: desktop */
--bp-xl: 1280px;  /* Extra large: wide */
--bp-2xl: 1536px; /* 2XL: ultra wide */
```

## Regras por Prioridade

| Prioridade | Regra | Descricao |
|-----------|-------|-----------|
| CRITICAL | Acessibilidade WCAG 2.1 AA obrigatoria | Exclusao de usuarios com deficiencia + compliance legal |
| HIGH | Usar design tokens, NUNCA cores hardcoded | Inconsistencia visual e impossibilidade de temas |
| HIGH | Componentes tipados com TypeScript | Erros de props em runtime |
| MEDIUM | Mobile-first responsive | Maioria do trafego e mobile |
| MEDIUM | Dark mode via CSS variables | Preferencia do usuario |

## Anti-Patterns

| Anti-Pattern | Por que e perigoso | O que fazer |
|-------------|-------------------|-------------|
| Cor hardcoded (#2563eb) no JSX | Impossivel trocar tema | Usar token: `text-primary` |
| Componente sem forwardRef | Breaks quando usado em forms | Sempre forwardRef |
| div com onClick | Inacessivel para teclado | Usar button ou role="button" |
| Responsivo com display:none | Carrega conteudo invisivel | Responsive rendering |
| CSS-in-JS em runtime | Performance ruim | Tailwind ou CSS modules |

## Checklist Pre-Entrega

- [ ] Design tokens definidos (cores, spacing, typography)
- [ ] Componentes tipados com variantes
- [ ] Acessibilidade WCAG 2.1 AA verificada
- [ ] Responsivo mobile-first
- [ ] Dark mode funcional
- [ ] Sem cores hardcoded no codigo
