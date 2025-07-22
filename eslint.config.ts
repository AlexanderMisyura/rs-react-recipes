import js from '@eslint/js';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { createViteImportResolver } from 'eslint-import-resolver-vite';
import { importX } from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { configs as reactCompilerConfigs } from 'eslint-plugin-react-compiler';
import reactDom from 'eslint-plugin-react-dom';
import { configs as reactHooksConfigs } from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import reactX from 'eslint-plugin-react-x';
import importSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint, { configs as tseslintConfigs, parser as tsParser } from 'typescript-eslint';

import viteConfig from './vite.config';

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'coverage'] },

  {
    files: ['**/*.{ts,tsx}'],

    extends: [
      js.configs.recommended,
      jsxA11y.flatConfigs.recommended,
      reactDom.configs.recommended,
      reactHooksConfigs['recommended-latest'],
      reactX.configs.recommended,
      tseslintConfigs.strictTypeChecked,
      tseslintConfigs.stylisticTypeChecked,
      importX.flatConfigs.recommended,
      importX.flatConfigs.typescript,
      reactCompilerConfigs.recommended,
      eslintPluginPrettierRecommended,
    ],

    languageOptions: {
      parser: tsParser,
      ecmaVersion: 2022,
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },

    linterOptions: {
      reportUnusedDisableDirectives: true,
    },

    plugins: {
      'react-refresh': reactRefresh,
      'simple-import-sort': importSort,
    },

    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'explicit', overrides: { constructors: 'off' } },
      ],
      '@typescript-eslint/member-ordering': 'error',
      '@typescript-eslint/restrict-template-expressions': [
        'error',
        {
          allow: [{ name: ['Error', 'URL', 'URLSearchParams'], from: 'lib' }],
          allowAny: true,
          allowBoolean: true,
          allowNullish: true,
          allowNumber: true,
          allowRegExp: true,
        },
      ],
      'no-debugger': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },

    settings: {
      react: {
        version: 'detect',
      },
      'import-x/resolver-next': [
        createTypeScriptImportResolver(),
        importX.createNodeResolver(),
        createViteImportResolver({ viteConfig }),
      ],
    },
  },

  {
    files: ['vite.config.ts'],
    rules: {
      '@typescript-eslint/triple-slash-reference': 'off',
    },
  }
);
