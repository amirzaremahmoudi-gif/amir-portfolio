<script setup lang="ts">
const colorMode = useColorMode()
const { t } = useI18n()
const isDark = ref(false)
const label = computed(() => isDark.value ? t('theme.light') : t('theme.dark'))

function syncThemeState() {
  isDark.value = document.documentElement.classList.contains('dark')
}

function applyTheme() {
  const activeDark = document.documentElement.classList.contains('dark')
  colorMode.preference = activeDark ? 'light' : 'dark'
}

function toggleTheme(event: MouseEvent) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const documentWithTransition = document as Document & { startViewTransition?: (callback: () => void) => { ready: Promise<void> } }

  document.documentElement.style.setProperty('--theme-x', `${event.clientX || window.innerWidth / 2}px`)
  document.documentElement.style.setProperty('--theme-y', `${event.clientY || 48}px`)

  if (reduceMotion || !documentWithTransition.startViewTransition) {
    applyTheme()
    return
  }

  documentWithTransition.startViewTransition(applyTheme)
}

onMounted(syncThemeState)
watch(() => colorMode.value, () => nextTick(syncThemeState))
</script>

<template>
  <UButton
    color="neutral"
    variant="ghost"
    size="lg"
    :icon="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
    :aria-label="label"
    :title="label"
    class="theme-toggle min-h-11 min-w-11 justify-center rounded-full"
    @click="toggleTheme"
  />
</template>

<style scoped>
.theme-toggle { background: var(--portfolio-surface); transition: color var(--motion-control) var(--ease-standard), background-color var(--motion-control) var(--ease-standard), transform var(--motion-control) var(--ease-enter); }
.theme-toggle :deep(svg) {
  transition: opacity var(--motion-control) var(--ease-standard), transform var(--motion-control) var(--ease-standard);
}
.theme-toggle:hover { color: #fff; background: var(--portfolio-accent); transform: translateY(-1px); }
.theme-toggle:hover :deep(svg) { transform: rotate(18deg) scale(1.05); }
@media (prefers-reduced-motion: reduce) {
  .theme-toggle, .theme-toggle :deep(svg) { transition: none; }
  .theme-toggle:hover, .theme-toggle:hover :deep(svg) { transform: none; }
}
</style>
