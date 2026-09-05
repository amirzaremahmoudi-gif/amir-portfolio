// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/eslint',
    ['@nuxt/ui', { fonts: false }],
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap'
  ],

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com',
    name: 'Portfolio — Product Designer'
  },

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classSuffix: ''
  },

  content: {
    experimental: {
      sqliteConnector: 'native'
    }
  },

  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    }
  },

  routeRules: {
    '/': { prerender: true },
    '/en': { prerender: true },
    '/en/work': { prerender: true },
    '/en/work/toranj-sarmad': { prerender: true },
    '/en/about': { prerender: true },
    '/fa': { prerender: true },
    '/fa/work': { prerender: true },
    '/fa/work/toranj-sarmad': { prerender: true },
    '/fa/about': { prerender: true }
  },

  compatibilityDate: '2026-06-30',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },

  i18n: {
    strategy: 'prefix',
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', language: 'en', dir: 'ltr', file: 'en.ts' },
      { code: 'fa', name: 'فارسی', language: 'fa', dir: 'rtl', file: 'fa.ts' }
    ],
    langDir: 'locales',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'portfolio_locale',
      redirectOn: 'root'
    },
    baseUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://example.com'
  },

  icon: {
    clientBundle: {
      icons: [
        'lucide:image-plus',
        'lucide:arrow-up-right',
        'lucide:sparkles',
        'lucide:move-right',
        'lucide:panels-top-left',
        'lucide:inbox',
        'lucide:wifi-off',
        'lucide:clock-3'
      ]
    }
  },

  image: {
    format: ['webp', 'avif'],
    quality: 82
  }
})
