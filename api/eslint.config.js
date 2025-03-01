import globals from "globals";
import stylistic from '@stylistic/eslint-plugin';
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config({
  extends: [
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
  ],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node
    }
  },
  plugins: {
    '@stylistic': stylistic
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    '@stylistic/semi': 'error',
    '@stylistic/indent': ['error', 2]
  },
});