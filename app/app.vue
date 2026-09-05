<script setup lang="ts">
const { locale, t } = useI18n()
const localeHead = useLocaleHead({ seo: true })

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
  ogType: 'website',
  twitterCard: 'summary'
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
