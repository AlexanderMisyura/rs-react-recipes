import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import eslint from 'vite-plugin-eslint2';
import { createHtmlPlugin } from 'vite-plugin-html';
import stylelint from 'vite-plugin-stylelint';
import tsconfigPaths from 'vite-tsconfig-paths';

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
});
