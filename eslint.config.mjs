import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import vue from 'eslint-plugin-vue'

export default [
  // Base JS (Standard)
  js.configs.recommended,

  // TypeScript
  ...tseslint.configs.recommended,

  // Vue (Nuxt)
  ...vue.configs['flat/recommended'],

  // Regras globais (Standard Style)
  {
    rules: {
      semi: ['error', 'never'],              // sem ponto e vírgula
      quotes: ['error', 'single'],            // aspas simples
      'comma-dangle': ['error', 'never'],     // sem vírgula final
      indent: ['error', 2],                   // 2 espaços
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'space-before-function-paren': ['error', 'never'],
      'object-curly-spacing': ['error', 'always'],
      'vue/multi-word-component-names': 'off'
    }
  },

  // Vue SFC
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

