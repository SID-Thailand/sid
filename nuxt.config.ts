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
          additionalData: '@import "~/assets/styles/helpers/all.scss";',
        },
      },
    },
  },

  eslint: {
    config: {
      typescript: true,
    },
  },

  modules: [
    '@vueuse/nuxt',
    '@nuxt/eslint',
    'nuxt-lucide-icons',
    [
      '@storyblok/nuxt',
      {
        accessToken: process.env.STORYBLOK_TOKEN,
      },
    ],
  ],
})
