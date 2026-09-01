<script setup lang="ts">
const { locale, t } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const targetLocale = computed(() => locale.value === 'fa' ? 'en' : 'fa')
const targetPath = computed(() => switchLocalePath(targetLocale.value) || `/${targetLocale.value}`)
</script>

<template>
  <NuxtLink
    :to="targetPath"
    class="language-switcher inline-flex min-h-11 min-w-11 items-center justify-center rounded-full px-3 text-xs font-bold tracking-[.08em] text-muted transition-colors hover:text-highlighted"
    :lang="targetLocale"
    :hreflang="targetLocale"
    :aria-label="t('language.switchTo')"
    :title="t('language.switchTo')"
  >
    {{ t('language.short') }}
  </NuxtLink>
</template>

<style scoped>
.language-switcher { border: 1px solid var(--portfolio-line); }
</style>
