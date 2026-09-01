<script setup lang="ts">
const { t } = useI18n()
const localeHead = useLocaleHead({ seo: true })

useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }, ...localeHead.value.meta],
  link: [{ rel: 'icon', href: '/favicon.ico' }, ...localeHead.value.link]
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
