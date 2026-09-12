<script setup lang="ts">
const { locale, t } = useI18n()
const localeHead = useLocaleHead({ seo: true })
const config = useRuntimeConfig()
const route = useRoute()
const siteUrl = computed(() => String(config.public.siteUrl).replace(/\/$/, ''))
const defaultOgImage = computed(() => new URL('/images/amir-zare.png', config.public.siteUrl).toString())
const canonicalUrl = computed(() => new URL(route.path, `${siteUrl.value}/`).toString())

const identityStructuredData = computed(() => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl.value}/#website`,
      'url': `${siteUrl.value}/`,
      'name': 'Amir Zare | امیر زارع',
      'alternateName': ['Amir Zare Portfolio', 'وب‌سایت امیر زارع'],
      'inLanguage': ['fa-IR', 'en'],
      'creator': { '@id': `${siteUrl.value}/#person` }
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl.value}/#person`,
      'name': 'امیر زارع',
      'alternateName': 'Amir Zare',
      'url': `${siteUrl.value}/${locale.value}`,
      'image': defaultOgImage.value,
      'jobTitle': locale.value === 'fa' ? 'طراح ارشد محصول و تجربه کاربری' : 'Senior Product and UX Designer',
      'description': t('home.seoDescription'),
      'knowsAbout': ['Product Design', 'User Experience Design', 'Fintech', 'Investment Platforms', 'Design Systems'],
      'sameAs': ['https://behance.net/azuiux']
    }
  ]
}))

const criticalFont = computed(() => locale.value === 'fa'
  ? '/fonts/pelak-fa-900.woff2'
  : '/fonts/montserrat-latin-variable.woff2')

useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }, ...localeHead.value.meta],
  link: [
    { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/svg+xml', href: '/brand/amir-zare-logo.svg' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'preload', href: criticalFont.value, as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
    ...localeHead.value.link
  ],
  script: [{ key: 'identity-structured-data', type: 'application/ld+json', textContent: JSON.stringify(identityStructuredData.value) }]
}))

useSeoMeta({
  title: () => t('home.seoTitle'),
  description: () => t('home.seoDescription'),
  ogTitle: () => t('home.seoTitle'),
  ogDescription: () => t('home.seoDescription'),
  ogImage: defaultOgImage,
  ogImageAlt: () => locale.value === 'fa' ? 'امیر زارع، طراح ارشد محصول' : 'Amir Zare, Senior Product Designer',
  ogUrl: canonicalUrl,
  ogLocale: () => locale.value === 'fa' ? 'fa_IR' : 'en_US',
  ogLocaleAlternate: () => locale.value === 'fa' ? ['en_US'] : ['fa_IR'],
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: () => t('home.seoTitle'),
  twitterDescription: () => t('home.seoDescription'),
  twitterImage: defaultOgImage
})
</script>

<template>
  <UApp>
    <SiteHeader />
    <UMain id="main-content">
      <NuxtPage :transition="{ name: 'page', mode: 'out-in' }" />
    </UMain>
    <SiteFooter />
  </UApp>
</template>
