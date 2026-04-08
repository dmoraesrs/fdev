// ESLint Flat Config - Template FDEV
// Profile: RECOMMENDED (ativar strict descomentando abaixo)
// Docs: https://eslint.org/docs/latest/use/configure/configuration-files

import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import pluginSecurity from 'eslint-plugin-security'

export default tseslint.config(
  // === BASE ===
  js.configs.recommended,
  ...tseslint.configs.recommended,

  // === SEGURANCA ===
  pluginSecurity.configs.recommended,

  // === STRICT (descomentar para ativar) ===
  // ...tseslint.configs.strict,
  // ...tseslint.configs.stylistic,

  // === REGRAS CUSTOMIZADAS ===
  {
    rules: {
      // Qualidade
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-alert': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],

      // Complexidade
      'complexity': ['warn', 10],
      'max-depth': ['warn', 4],
      'max-params': ['warn', 5],
      'max-lines-per-function': ['warn', 50],

      // TypeScript
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/consistent-type-imports': ['error', {
        prefer: 'type-imports',
      }],
    },
  },

  // === OVERRIDES PARA TESTES ===
  {
    files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'max-lines-per-function': 'off',
      'security/detect-object-injection': 'off',
    },
  },

  // === IGNORES ===
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      '.next/',
      'coverage/',
    ],
  },
)
