<script setup lang="ts">
const { locale, t } = useI18n()
const localeHead = useLocaleHead({ seo: true })
const config = useRuntimeConfig()
const defaultOgImage = computed(() => new URL('/images/amir-zare.png', config.public.siteUrl).toString())

const criticalFont = computed(() => locale.value === 'fa'
  ? '/fonts/pelak-fa-900.woff2'
  : '/fonts/montserrat-latin-variable.woff2')

useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }, ...localeHead.value.meta],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'preload', href: criticalFont.value, as: 'font', type: 'font/woff2', crossorigin: 'anonymous' },
    ...localeHead.value.link
  ]
}))

useSeoMeta({
  title: () => t('home.seoTitle'),
  description: () => t('home.seoDescription'),
  ogTitle: () => t('home.seoTitle'),
  ogDescription: () => t('home.seoDescription'),
  ogImage: defaultOgImage,
  ogImageAlt: () => locale.value === 'fa' ? 'امیر زارع، طراح ارشد محصول' : 'Amir Zare, Senior Product Designer',
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
