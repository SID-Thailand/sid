import { pageTransition } from './transitions/base'

export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },

  css: ['~/assets/styles/index.scss'],

  app: {
    pageTransition: pageTransition as any,
  },

  typescript: {
    strict: false,
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/helpers/index.scss" as *;',
          api: 'modern-compiler',
        },
      },
    },
  },

  i18n: {
    strategy: 'prefix_except_default',
    locales: [
      { code: 'en', iso: 'en-US', baseDefault: true },
      { code: 'ru', iso: 'ru-RU' },
    ],
    autoDetectLanguage: false,
  },

  eslint: {
    config: {
      typescript: true,
    },
  },

  modules: [
    '@vueuse/nuxt',
    '@nuxt/eslint',
    'nuxt-i18n-micro',
    [
      '@storyblok/nuxt',
      {
        accessToken: process.env.STORYBLOK_TOKEN,
      },
    ],
  ],

  runtimeConfig: {
    public: {
      env: process.env.NODE_ENV,
    },
  },
})
