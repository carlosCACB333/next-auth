import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import _import from 'eslint-plugin-import';
import unusedImports from 'eslint-plugin-unused-imports';
import { defineConfig, globalIgnores } from 'eslint/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

export default defineConfig([
  globalIgnores(['**/node_modules', '**/.next', '**/build']),
  {
    extends: fixupConfigRules(compat.extends('prettier', 'next', 'next/core-web-vitals', 'next/typescript')),

    plugins: {
      'unused-imports': unusedImports,
      import: fixupPluginRules(_import),
    },

    settings: {
      react: {
        version: 'detect',
      },
    },

    rules: {},
  },
]);
