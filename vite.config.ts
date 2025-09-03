/// <reference types="vitest/config" />

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { coverageConfigDefaults } from 'vitest/config';

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

  plugins: [react(), tailwindcss(), tsconfigPaths()],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setup-tests.ts'],
    coverage: {
      exclude: [
        'src/main.tsx',
        'commitlint.config.ts',
        'lint-staged.config.ts',
        ...coverageConfigDefaults.exclude,
      ],
      thresholds: {
        statements: 80,
        branches: 50,
        functions: 50,
        lines: 50,
      },
    },
  },
});
