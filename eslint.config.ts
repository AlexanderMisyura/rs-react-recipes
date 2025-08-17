import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { createTypeScriptImportResolver } from 'eslint-import-resolver-typescript';
import { importX } from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { configs as reactCompilerConfigs } from 'eslint-plugin-react-compiler';
import reactDom from 'eslint-plugin-react-dom';
import { configs as reactHooksConfigs } from 'eslint-plugin-react-hooks';
import reactX from 'eslint-plugin-react-x';
import importSort from 'eslint-plugin-simple-import-sort';
import { dirname } from 'path';
import tseslint, { configs as tseslintConfigs, parser as tsParser } from 'typescript-eslint';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  {
    ignores: ['.next', 'dist', 'node_modules', 'coverage'],
  },

  {
    files: ['**/*.{ts,tsx}'],

    extends: [
      js.configs.recommended,
      ...compat.config({
        extends: ['plugin:@next/next/recommended', 'plugin:@next/next/core-web-vitals'],
      }),
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
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },

    linterOptions: {
      reportUnusedDisableDirectives: true,
    },

    plugins: {
      'simple-import-sort': importSort,
    },

    rules: {
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
      'import-x/resolver-next': [createTypeScriptImportResolver(), importX.createNodeResolver()],
    },
  },

  {
    files: ['**/*.test.{ts,tsx}'],
    rules: {
      '@typescript-eslint/unbound-method': 'off',
    },
  }
);
