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
    id: 'GTM-MHK8J5FT',
    enabled: process.env.NODE_ENV === 'production',
    debug: false,
    defer: true,
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
    '@nuxt/image',
  ],

  image: {
    storyblok: {
      baseURL: 'https://a2.storyblok.com',
    },
  },

  runtimeConfig: {
    kommo: {
      subdomain: '',
      longLivedToken: '',
      pipelineId: '',
      statusId: '',
      responsibleUserId: '',
      qualifiedWebhookSecret: '',
      googleDataManagerClientId: '',
      googleDataManagerClientSecret: '',
      googleDataManagerRefreshToken: '',
      googleAdsOperatingAccountId: '3180451827',
      googleAdsLoginAccountId: '',
      googleAdsConversionActionId: '7693506448',
      ga4MeasurementId: 'G-F4VRTJKMFH',
      ga4MeasurementProtocolApiSecret: '',
      metaPixelId: '27845610791699424',
      metaConversionsApiToken: '',
      yandexMetrikaCounterId: '110873210',
      yandexMetrikaOAuthToken: process.env.NUXT_KOMMO_YANDEX_METRIKA_OAUTH_TOKEN || '',
      yandexMetrikaQualifiedGoalId: '586798746',
      dedupeRedisUrl:
        process.env.UPSTASH_REDIS_REST_URL ||
        process.env.KV_REST_API_URL ||
        '',
      dedupeRedisToken:
        process.env.UPSTASH_REDIS_REST_TOKEN ||
        process.env.KV_REST_API_TOKEN ||
        '',
    },
    public: {
      ENVIROMENT: process.env.NODE_ENV,
    },
  },
})
