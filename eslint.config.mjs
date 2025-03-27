// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    '@typescript-eslint/no-unused-expressions': 'off',
    'arrow-parens': [
      1,
      'as-needed',
      {
        requireForBlockBody: false,
      },
    ],
    'comma-dangle': 'off',
    'no-console': 'off',
    'unicorn/prefer-text-content': 'off',
    'no-new': 'off',
    'prefer-const': 'warn',
    'vue/require-default-prop': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-html': 'off',
    'vue/html-self-closing': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/v-on-event-hyphenation': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'import/no-named-as-default': 'off',
    'prettier/prettier': [
      'off',
      {
        endOfLine: 'auto',
      },
    ],
    '@typescript-eslint/ban-ts-comment': 'off',
    'vue/require-toggle-inside-transition': 'off',
  },
})

// Your custom configs here
