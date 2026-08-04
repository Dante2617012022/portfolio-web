import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores([
    'dist/**',
    '.vite/**',
    'coverage/**',
    'node_modules/**',
  ]),
  {
    files: ['src/**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // El componente base conserva piezas declaradas con mayúscula que hoy son
      // reemplazadas por módulos progresivos. Se retirarán durante el refactor
      // React documentado en el roadmap técnico.
      'no-unused-vars': ['error', {
        varsIgnorePattern: '^(?:[A-Z_]|createTextLogo)',
        argsIgnorePattern: '^_',
      }],
    },
  },
])
