<script setup lang="ts">
defineProps<{ previous?: { path: string, title: string } | null, next?: { path: string, title: string } | null }>()
const { locale, t } = useI18n()
const localePath = useLocalePath()
const previousIcon = computed(() => locale.value === 'fa' ? 'i-lucide-arrow-right' : 'i-lucide-arrow-left')
const nextIcon = computed(() => locale.value === 'fa' ? 'i-lucide-arrow-left' : 'i-lucide-arrow-right')
</script>

<template>
  <nav
    class="grid border-y border-default md:grid-cols-2"
    :aria-label="t('project.navigation')"
  >
    <NuxtLink
      v-if="previous"
      :to="localePath(previous.path)"
      class="previous-project group border-b border-default py-8 md:border-b-0"
    ><span class="eyebrow">{{ t('project.previous') }}</span><span class="mt-4 flex items-center gap-3 text-xl font-semibold"><UIcon
      :name="previousIcon"
      class="directional-icon transition-transform"
    />{{ previous.title }}</span></NuxtLink><div v-else />
    <NuxtLink
      v-if="next"
      :to="localePath(next.path)"
      class="next-project group py-8"
    ><span class="eyebrow">{{ t('project.next') }}</span><span class="mt-4 flex items-center justify-end gap-3 text-xl font-semibold">{{ next.title }}<UIcon
      :name="nextIcon"
      class="directional-icon transition-transform"
    /></span></NuxtLink>
  </nav>
</template>

<style scoped>
.previous-project { padding-inline-end: 2.5rem; }
.next-project { padding-inline-start: 2.5rem; text-align: end; }
.previous-project:hover .directional-icon { transform: translateX(-.25rem); }
.next-project:hover .directional-icon { transform: translateX(.25rem); }
[dir='rtl'] .previous-project:hover .directional-icon { transform: translateX(.25rem); }
[dir='rtl'] .next-project:hover .directional-icon { transform: translateX(-.25rem); }
@media (min-width: 768px) { .previous-project { border-inline-end: 1px solid var(--portfolio-line); } }
@media (prefers-reduced-motion: reduce) { .directional-icon { transform: none !important; } }
</style>
