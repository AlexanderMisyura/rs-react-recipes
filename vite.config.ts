/// <reference types="vitest/config" />

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint2';
import { createHtmlPlugin } from 'vite-plugin-html';
import stylelint from 'vite-plugin-stylelint';
import tsconfigPaths from 'vite-tsconfig-paths';
import { coverageConfigDefaults } from 'vitest/config';

const title = 'Recipes';

export default defineConfig({
  base: '/',

  build: {
    outDir: 'dist',
    target: 'esnext',
  },

  css: {
    modules: {
      localsConvention: 'camelCaseOnly',
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    },
  },

  plugins: [
    createHtmlPlugin({
      entry: './src/main.tsx',
      template: './index.html',
      inject: { data: { title } },
    }),

    react(),
    eslint({ cacheLocation: 'node_modules/.vite/.eslintcache' }),
    stylelint({ lintOnStart: true, cacheLocation: 'node_modules/.vite/.stylelintcache' }),
    tailwindcss(),
    tsconfigPaths(),
  ],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setup-tests.ts'],
    coverage: {
      exclude: ['commitlint.config.ts', 'lint-staged.config.ts', ...coverageConfigDefaults.exclude],
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
  },
});
