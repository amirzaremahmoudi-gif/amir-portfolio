<script setup lang="ts">
const colorMode = useColorMode()
const isDark = ref(false)
const label = computed(() => isDark.value ? 'Switch to light mode' : 'Switch to dark mode')

function syncThemeState() {
  isDark.value = document.documentElement.classList.contains('dark')
}

function toggleTheme() {
  const activeDark = document.documentElement.classList.contains('dark')
  colorMode.preference = activeDark ? 'light' : 'dark'
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
.theme-toggle :deep(svg) {
  transition: opacity var(--motion-control) var(--ease-standard), transform var(--motion-control) var(--ease-standard);
}
.theme-toggle:hover :deep(svg) { transform: rotate(12deg); }
@media (prefers-reduced-motion: reduce) {
  .theme-toggle :deep(svg) { transition: none; }
  .theme-toggle:hover :deep(svg) { transform: none; }
}
</style>
