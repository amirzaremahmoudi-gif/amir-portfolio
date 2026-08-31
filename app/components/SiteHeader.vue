<script setup lang="ts">
const route = useRoute()
const mobileOpen = ref(false)
watch(() => route.path, () => {
  mobileOpen.value = false
})

const links = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'LinkedIn', to: '#', placeholder: true },
  { label: 'CV', to: '#', placeholder: true }
]
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 border-b border-default bg-[color:var(--portfolio-bg)]/92 backdrop-blur-md">
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-default focus:px-4 focus:py-2"
    >Skip to content</a>
    <div class="portfolio-container flex h-20 items-center justify-between">
      <NuxtLink
        to="/"
        class="group flex items-center gap-3"
        aria-label="Portfolio home"
      >
        <span class="grid size-8 place-items-center border border-default text-xs font-bold transition-colors group-hover:border-primary">NP</span>
        <span class="hidden text-sm font-semibold tracking-tight sm:block">Name Placeholder</span>
      </NuxtLink>

      <nav
        class="hidden items-center gap-8 md:flex"
        aria-label="Primary navigation"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          class="text-sm text-muted transition-colors hover:text-highlighted"
          :class="{ 'text-highlighted': !link.placeholder && route.path.startsWith(link.to) }"
          :aria-disabled="link.placeholder ? 'true' : undefined"
          @click="link.placeholder && $event.preventDefault()"
        >
          {{ link.label }}<span
            v-if="link.placeholder"
            class="sr-only"
          > (placeholder)</span>
        </NuxtLink>
        <UColorModeButton
          aria-label="Toggle color theme"
          color="neutral"
          variant="ghost"
        />
      </nav>

      <UButton
        class="md:hidden"
        color="neutral"
        variant="ghost"
        :icon="mobileOpen ? 'i-lucide-x' : 'i-lucide-menu'"
        :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="mobileOpen"
        aria-controls="mobile-navigation"
        @click="mobileOpen = !mobileOpen"
      />
    </div>

    <nav
      v-if="mobileOpen"
      id="mobile-navigation"
      class="portfolio-container border-t border-default py-6 md:hidden"
      aria-label="Mobile navigation"
    >
      <div class="flex flex-col">
        <NuxtLink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          class="border-b border-default py-4 text-xl"
          :aria-disabled="link.placeholder ? 'true' : undefined"
          @click="link.placeholder && $event.preventDefault()"
        >{{ link.label }}<span
          v-if="link.placeholder"
          class="ml-2 text-xs text-muted"
        >TODO</span></NuxtLink>
      </div>
      <UColorModeButton
        class="mt-5"
        aria-label="Toggle color theme"
        color="neutral"
        variant="outline"
      />
    </nav>
  </header>
</template>
