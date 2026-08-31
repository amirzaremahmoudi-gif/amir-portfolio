<script setup lang="ts">
const route = useRoute()
const mobileOpen = ref(false)
const scrolled = ref(false)

function updateScrolled() {
  scrolled.value = window.scrollY > 20
}

onMounted(() => {
  updateScrolled()
  window.addEventListener('scroll', updateScrolled, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', updateScrolled))

watch(() => route.path, () => {
  mobileOpen.value = false
})

const links = [
  { label: 'Work', to: '/work' },
  { label: 'About', to: '/about' },
  { label: 'LinkedIn', to: '#', placeholder: true },
  { label: 'CV', to: '#', placeholder: true }
]

function isActive(to: string) {
  return to === '/work' ? route.path.startsWith('/work') : route.path === to
}
</script>

<template>
  <header
    class="site-header fixed inset-x-0 top-0 z-50"
    :class="{ 'is-scrolled': scrolled }"
  >
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:bg-default focus:px-4 focus:py-3"
    >Skip to content</a>
    <div class="portfolio-container flex h-[4.75rem] items-center justify-between md:h-20">
      <NuxtLink
        to="/"
        class="group flex min-h-11 items-center gap-3"
        aria-label="Portfolio home"
      >
        <span class="grid size-9 place-items-center rounded-full bg-[color:var(--portfolio-text)] text-[.66rem] font-bold tracking-[.08em] text-[color:var(--portfolio-bg)] transition-transform duration-200 group-hover:-rotate-3">NP</span>
        <span class="hidden text-sm font-semibold tracking-[-.02em] sm:block">Name Placeholder</span>
      </NuxtLink>

      <nav
        class="hidden items-center gap-2 md:flex"
        aria-label="Primary navigation"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          class="nav-link relative flex min-h-11 items-center px-3 text-sm text-muted transition-colors hover:text-highlighted"
          :class="{ 'is-active text-highlighted': !link.placeholder && isActive(link.to) }"
          :aria-disabled="link.placeholder ? 'true' : undefined"
          :aria-current="!link.placeholder && isActive(link.to) ? 'page' : undefined"
          @click="link.placeholder && $event.preventDefault()"
        >
          {{ link.label }}<span
            v-if="link.placeholder"
            class="sr-only"
          > (placeholder)</span>
        </NuxtLink>
        <ThemeToggle />
      </nav>

      <UButton
        class="min-h-11 min-w-11 justify-center rounded-full md:hidden"
        color="neutral"
        variant="ghost"
        :icon="mobileOpen ? 'i-lucide-x' : 'i-lucide-menu'"
        :aria-label="mobileOpen ? 'Close menu' : 'Open menu'"
        :aria-expanded="mobileOpen"
        aria-controls="mobile-navigation"
        @click="mobileOpen = !mobileOpen"
      />
    </div>

    <USlideover
      v-model:open="mobileOpen"
      title="Navigation"
      description="Portfolio navigation and theme controls"
      side="right"
      :ui="{
        content: 'w-full max-w-[30rem] bg-[color:var(--portfolio-bg)] shadow-2xl',
        overlay: 'bg-black/35',
        header: 'min-h-20 px-6 sm:px-8',
        body: 'flex flex-1 flex-col px-6 pb-8 sm:px-8'
      }"
    >
      <template #body>
        <nav
          id="mobile-navigation"
          class="flex flex-1 flex-col"
          aria-label="Mobile navigation"
        >
          <div class="mt-8 flex flex-col">
            <NuxtLink
              v-for="(link, index) in links"
              :key="link.label"
              :to="link.to"
              class="mobile-nav-link flex min-h-16 items-center justify-between border-b border-default py-4 text-3xl font-semibold tracking-[-.04em]"
              :class="{ 'text-muted': link.placeholder }"
              :aria-disabled="link.placeholder ? 'true' : undefined"
              :aria-current="!link.placeholder && isActive(link.to) ? 'page' : undefined"
              @click="link.placeholder ? $event.preventDefault() : mobileOpen = false"
            >
              <span>{{ link.label }}</span>
              <span class="eyebrow">{{ link.placeholder ? 'Placeholder' : `0${index + 1}` }}</span>
            </NuxtLink>
          </div>
          <div class="mt-auto flex items-center justify-between pt-12">
            <span class="text-sm text-muted">Color theme</span>
            <ThemeToggle />
          </div>
        </nav>
      </template>
    </USlideover>
  </header>
</template>

<style scoped>
.site-header { background: color-mix(in srgb, var(--portfolio-bg) 82%, transparent); transition: background-color var(--motion-control) var(--ease-standard), box-shadow var(--motion-control) var(--ease-standard); }
.site-header.is-scrolled { background: color-mix(in srgb, var(--portfolio-bg) 96%, transparent); box-shadow: 0 1px 0 var(--portfolio-line), 0 12px 40px rgb(20 16 12 / 4%); backdrop-filter: blur(14px); }
.nav-link::after { position: absolute; right: .75rem; bottom: .35rem; left: .75rem; height: 1px; content: ''; background: var(--portfolio-accent); opacity: 0; transform: scaleX(.2); transform-origin: left; transition: opacity var(--motion-control) var(--ease-standard), transform var(--motion-control) var(--ease-standard); }
.nav-link:hover::after, .nav-link.is-active::after { opacity: 1; transform: scaleX(1); }
.mobile-nav-link .eyebrow { transition: color var(--motion-control) var(--ease-standard), transform var(--motion-control) var(--ease-standard); }
.mobile-nav-link:hover .eyebrow, .mobile-nav-link:focus-visible .eyebrow { color: var(--portfolio-accent); transform: translateX(-.35rem); }
@media (prefers-reduced-motion: reduce) {
  .nav-link::after, .mobile-nav-link .eyebrow { transition: none; }
  .mobile-nav-link:hover .eyebrow, .mobile-nav-link:focus-visible .eyebrow { transform: none; }
}
</style>
