<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()

useHead({
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
  link: computed(() => [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'canonical', href: new URL(route.path, config.public.siteUrl).toString() }
  ]),
  htmlAttrs: { lang: 'en' }
})

const title = 'Name Placeholder — Product Designer'
const description = 'Portfolio foundation for a Product Designer working across fintech, digital investment products, research, conversion and design systems.'

useSeoMeta({ title, description, ogTitle: title, ogDescription: description, ogType: 'website', twitterCard: 'summary' })
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
