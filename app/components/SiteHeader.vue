<script setup lang="ts">
const route = useRoute()
const { t } = useI18n()
const localePath = useLocalePath()
const { activeLocale, profile } = usePortfolioContent()
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

interface NavigationLink {
  label: string
  to: string
  external?: boolean
  download?: string
}
const links = computed<NavigationLink[]>(() => [
  { label: t('nav.work'), to: localePath('/work') },
  { label: t('nav.about'), to: localePath('/about') },
  { label: t('common.linkedin'), to: profile.value.linkedin, external: true },
  { label: t('common.cv'), to: profile.value.cv, external: true, download: 'Amir_Zare_CV_2026.pdf' }
])
function isActive(to: string) {
  return to === localePath('/work') ? route.path.startsWith(to) : route.path === to
}
</script>

<template>
  <header
    class="site-header fixed inset-x-0 top-0 z-50"
    :class="{ 'is-scrolled': scrolled }"
  >
    <a
      href="#main-content"
      class="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:z-[70] focus:bg-default focus:px-4 focus:py-3"
      style="inset-inline-start: 1rem"
    >{{ t('nav.skip') }}</a>
    <div class="portfolio-container flex h-[4.75rem] items-center justify-between md:h-20">
      <NuxtLink
        :to="localePath('/')"
        class="group flex min-h-11 items-center gap-3"
        :aria-label="t('nav.home')"
      >
        <span
          class="grid size-9 place-items-center rounded-full bg-[color:var(--portfolio-text)] text-[.66rem] font-bold tracking-[.08em] text-[color:var(--portfolio-bg)] transition-transform duration-200 group-hover:-rotate-3"
          dir="ltr"
        >{{ profile.initials }}</span>
        <span class="hidden text-sm font-semibold tracking-[-.02em] sm:block">{{ profile.name }}</span>
      </NuxtLink>

      <nav
        class="hidden items-center gap-2 md:flex"
        :aria-label="t('nav.primary')"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.label"
          :to="link.to"
          :external="link.external"
          class="nav-link relative flex min-h-11 items-center px-3 text-sm text-muted transition-colors hover:text-highlighted"
          :target="link.external && !link.download ? '_blank' : undefined"
          :rel="link.external ? 'noopener noreferrer' : undefined"
          :download="link.download"
          :class="{ 'is-active text-highlighted': !link.external && !link.download && isActive(link.to) }"
          :aria-current="!link.external && !link.download && isActive(link.to) ? 'page' : undefined"
        >
          {{ link.label }}<span
            v-if="link.external || link.download"
            class="sr-only"
          > ({{ link.download ? t('common.downloadPdf') : t('common.external') }})</span>
        </NuxtLink>
        <LanguageSwitcher />
        <ThemeToggle />
      </nav>

      <UButton
        class="min-h-11 min-w-11 justify-center rounded-full md:hidden"
        color="neutral"
        variant="ghost"
        :icon="mobileOpen ? 'i-lucide-x' : 'i-lucide-menu'"
        :aria-label="mobileOpen ? t('nav.close') : t('nav.open')"
        :aria-expanded="mobileOpen"
        aria-controls="mobile-navigation"
        @click="mobileOpen = !mobileOpen"
      />
    </div>

    <USlideover
      v-model:open="mobileOpen"
      :title="t('nav.title')"
      :description="t('nav.description')"
      :side="activeLocale === 'fa' ? 'left' : 'right'"
      :ui="{ content: 'w-full max-w-[30rem] bg-[color:var(--portfolio-bg)] shadow-2xl', overlay: 'bg-black/35', header: 'min-h-20 px-6 sm:px-8', body: 'flex flex-1 flex-col px-6 pb-8 sm:px-8' }"
    >
      <template #close>
        <UButton
          icon="i-lucide-x"
          color="neutral"
          variant="ghost"
          :aria-label="t('nav.close')"
        />
      </template>
      <template #body>
        <nav
          id="mobile-navigation"
          class="flex flex-1 flex-col"
          :aria-label="t('nav.mobile')"
        >
          <div class="mt-8 flex flex-col">
            <NuxtLink
              v-for="(link, index) in links"
              :key="link.label"
              :to="link.to"
              :external="link.external"
              class="mobile-nav-link flex min-h-16 items-center justify-between border-b border-default py-4 text-3xl font-semibold tracking-[-.04em]"
              :target="link.external && !link.download ? '_blank' : undefined"
              :rel="link.external ? 'noopener noreferrer' : undefined"
              :download="link.download"
              :aria-current="!link.external && !link.download && isActive(link.to) ? 'page' : undefined"
              @click="mobileOpen = false"
            ><span>{{ link.label }}</span><span class="eyebrow">{{ link.download ? '↓' : link.external ? '↗' : `0${index + 1}` }}</span></NuxtLink>
          </div>
          <div class="mt-auto flex items-center justify-between border-b border-default py-6">
            <span class="text-sm text-muted">{{ t('language.control') }}</span><LanguageSwitcher />
          </div>
          <div class="flex items-center justify-between pt-6">
            <span class="text-sm text-muted">{{ t('theme.label') }}</span><ThemeToggle />
          </div>
        </nav>
      </template>
    </USlideover>
  </header>
</template>

<style scoped>
.site-header { background: color-mix(in srgb, var(--portfolio-bg) 82%, transparent); transition: background-color var(--motion-control) var(--ease-standard), box-shadow var(--motion-control) var(--ease-standard); }
.site-header.is-scrolled { background: color-mix(in srgb, var(--portfolio-bg) 96%, transparent); box-shadow: 0 1px 0 var(--portfolio-line), 0 12px 40px rgb(20 16 12 / 4%); backdrop-filter: blur(14px); }
.nav-link::after { position: absolute; inset-inline: .75rem; bottom: .35rem; height: 1px; content: ''; background: var(--portfolio-accent); opacity: 0; transform: scaleX(.2); transform-origin: inline-start; transition: opacity var(--motion-control) var(--ease-standard), transform var(--motion-control) var(--ease-standard); }
.nav-link:hover::after, .nav-link.is-active::after { opacity: 1; transform: scaleX(1); }
.mobile-nav-link .eyebrow { transition: color var(--motion-control) var(--ease-standard), transform var(--motion-control) var(--ease-standard); }
.mobile-nav-link:hover .eyebrow, .mobile-nav-link:focus-visible .eyebrow { color: var(--portfolio-accent); transform: translateX(-.35rem); }
[dir='rtl'] .mobile-nav-link:hover .eyebrow, [dir='rtl'] .mobile-nav-link:focus-visible .eyebrow { transform: translateX(.35rem); }
@media (prefers-reduced-motion: reduce) { .nav-link::after, .mobile-nav-link .eyebrow { transition: none; } .mobile-nav-link:hover .eyebrow, .mobile-nav-link:focus-visible .eyebrow { transform: none; } }
</style>
