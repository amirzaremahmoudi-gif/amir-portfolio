// https://nuxt.com/docs/api/configuration/nuxt-config
const publicSiteUrl = process.env.NUXT_PUBLIC_SITE_URL
  || (process.env.NODE_ENV === 'production' ? 'https://azuiux.com' : 'http://localhost:3000')

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
    enabled: false
  },

  css: ['~/assets/css/main.css'],

  site: {
    url: publicSiteUrl,
    name: 'Portfolio — Product Designer'
  },

  colorMode: {
    preference: 'dark',
    fallback: 'dark',
    classSuffix: ''
  },

  content: {
    experimental: {
      sqliteConnector: 'native'
    }
  },

  runtimeConfig: {
    public: {
      siteUrl: publicSiteUrl
    }
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
    defaultLocale: 'fa',
    locales: [
      { code: 'en', name: 'English', language: 'en', dir: 'ltr', file: 'en.ts' },
      { code: 'fa', name: 'فارسی', language: 'fa', dir: 'rtl', file: 'fa.ts' }
    ],
    langDir: 'locales',
    detectBrowserLanguage: false,
    baseUrl: publicSiteUrl
  },

  icon: {
    clientBundle: {
      icons: [
        'lucide:image-plus',
        'lucide:arrow-up-right',
        'lucide:box',
        'lucide:sparkles',
        'lucide:move-right',
        'lucide:panels-top-left',
        'lucide:circle-dot',
        'lucide:maximize-2',
        'lucide:inbox',
        'lucide:wifi-off',
        'lucide:clock-3'
      ]
    }
  },

  image: {
    format: ['webp', 'avif'],
    quality: 82
  },

  sitemap: {
    excludeAppSources: true,
    urls: [
      '/en',
      '/fa',
      '/en/work',
      '/fa/work',
      '/en/about',
      '/fa/about',
      '/en/work/toranj-insurance',
      '/fa/work/toranj-insurance'
    ]
  }
})
