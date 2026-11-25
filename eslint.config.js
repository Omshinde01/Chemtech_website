import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'dist-ssr', '.wrangler']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
  },
  {
    // Not pure component modules, so the fast-refresh rule doesn't apply
    files: ['src/routes.jsx', 'src/entry-server.jsx', 'src/main.jsx'],
    rules: { 'react-refresh/only-export-components': 'off' },
  },
  {
    files: ['scripts/**/*.js', 'server/**/*.js'],
    languageOptions: { globals: globals.node },
  },
])
