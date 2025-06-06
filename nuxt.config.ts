import { encodeConfig } from './cli/decodeEnv'
import { pageTransition } from './transitions/base'

export default defineNuxtConfig({
  devtools: { enabled: false },

  compatibilityDate: '2025-05-05',

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

  gtm: {
    id: process.env.GTM_ID || 'GTM-XXXXXXX',
    enabled: process.env.NODE_ENV === 'production',
    debug: false,
    pageTracking: true,
  },

  modules: [
    '@zadigetvoltaire/nuxt-gtm',
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
      ENVIROMENT: process.env.NODE_ENV,
      value: encodeConfig({
        FORMSPREE_KEY: process.env.FORMSPREE_KEY,
      }),
    },
  },
})
