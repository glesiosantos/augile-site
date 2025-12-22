import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import vue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

export default [
  // Base JS
  js.configs.recommended,

  // TypeScript
  ...tseslint.configs.recommended,

  // Vue base rules
  ...vue.configs['flat/recommended'],

  // 🔥 O PONTO-CHAVE (parser para Vue + TS)
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: tseslint.parser,
        ecmaVersion: 'latest',
        sourceType: 'module'
      }
    },
    rules: {
      'vue/multi-word-component-names': 'off'
    }
  },

  // Regras globais (Standard Style)
  {
    rules: {
      semi: ['error', 'never'],
      quotes: ['error', 'single'],
      'comma-dangle': ['error', 'never'],
      indent: ['error', 2],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'space-before-function-paren': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      '@typescript-eslint/no-unused-vars': 'off',
      'no-undef': 'off'
    }
  },

  // Vue template formatting
  {
    files: ['**/*.vue'],
    rules: {
      'vue/html-indent': ['error', 2],
      'vue/max-attributes-per-line': ['error', {
        singleline: 3,
        multiline: 1
      }],
      'vue/singleline-html-element-content-newline': 'off'
    }
  }
]
