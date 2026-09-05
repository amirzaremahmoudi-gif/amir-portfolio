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
    <div class="site-header__inner portfolio-container flex h-[5.25rem] items-center md:h-[5.75rem]">
      <div class="site-header__bar flex w-full items-center justify-between px-1.5 py-1.5 md:px-2">
        <NuxtLink
          :to="localePath('/')"
          class="brand-link group flex min-h-11 items-center"
          :aria-label="t('nav.home')"
        >
          <span class="brand-mark">
            <NuxtImg
              src="/brand/amir-zare-logo.svg"
              alt=""
              width="96"
              height="96"
              loading="eager"
              fetchpriority="high"
              class="brand-mark__image"
            />
          </span>
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
.site-header { pointer-events: none; transition: transform var(--motion-control) var(--ease-standard); }
.site-header__inner { position: relative; }
.site-header__inner::after { position: absolute; inset-inline: var(--portfolio-gutter); bottom: 0; height: 1px; background: linear-gradient(90deg, transparent, color-mix(in srgb, var(--portfolio-line) 92%, transparent) 12%, color-mix(in srgb, var(--portfolio-line) 92%, transparent) 88%, transparent); content: ''; opacity: .78; transform: scaleX(.96); transition: opacity var(--motion-control) var(--ease-standard), transform var(--motion-content) var(--ease-enter); }
.site-header.is-scrolled .site-header__inner::after { opacity: 0; transform: scaleX(.75); }
.site-header__bar { pointer-events: auto; border-radius: 999px; background: transparent; transition: background-color var(--motion-control) var(--ease-standard), box-shadow var(--motion-control) var(--ease-standard), transform var(--motion-control) var(--ease-enter); }
.site-header.is-scrolled .site-header__bar { background: color-mix(in srgb, var(--portfolio-bg) 88%, transparent); box-shadow: 0 .75rem 2.5rem rgb(17 19 24 / 9%); backdrop-filter: blur(20px) saturate(150%); transform: translateY(-.15rem); }
.brand-link { border-radius: 50%; }
.brand-mark { position: relative; display: block; width: 2.7rem; height: 2.7rem; overflow: hidden; border-radius: 50%; background: #11151b; box-shadow: 0 .4rem 1.3rem rgb(4 7 12 / 22%); transition: transform var(--motion-content) var(--ease-enter), box-shadow var(--motion-control) var(--ease-standard); }
.brand-mark__image { position: absolute; inset: 0; display: block; width: 100%; height: 100%; object-fit: cover; }
.group:hover .brand-mark { box-shadow: 0 .6rem 1.8rem rgb(4 7 12 / 32%); transform: rotate(-5deg) scale(1.04); }
.nav-link::after { position: absolute; inset-inline: .75rem; bottom: .35rem; height: 1px; content: ''; background: var(--portfolio-accent); opacity: 0; transform: scaleX(.2); transform-origin: inline-start; transition: opacity var(--motion-control) var(--ease-standard), transform var(--motion-control) var(--ease-standard); }
.nav-link:hover::after, .nav-link.is-active::after { opacity: 1; transform: scaleX(1); }
.nav-link { min-height: 2.5rem; border-radius: 999px; }
.nav-link:hover { background: color-mix(in srgb, var(--portfolio-surface) 82%, transparent); }
.mobile-nav-link .eyebrow { transition: color var(--motion-control) var(--ease-standard), transform var(--motion-control) var(--ease-standard); }
.mobile-nav-link:hover .eyebrow, .mobile-nav-link:focus-visible .eyebrow { color: var(--portfolio-accent); transform: translateX(-.35rem); }
[dir='rtl'] .mobile-nav-link:hover .eyebrow, [dir='rtl'] .mobile-nav-link:focus-visible .eyebrow { transform: translateX(.35rem); }
@media (max-width: 767px) { .site-header__bar { background: color-mix(in srgb, var(--portfolio-bg) 84%, transparent); box-shadow: 0 .45rem 1.8rem rgb(17 19 24 / 6%); backdrop-filter: blur(18px); } .brand-mark { width: 2.55rem; height: 2.55rem; } }
@media (prefers-reduced-motion: reduce) { .site-header__bar, .site-header__inner::after, .brand-mark, .nav-link::after, .mobile-nav-link .eyebrow { transition: none; } .site-header.is-scrolled .site-header__bar, .group:hover .brand-mark, .mobile-nav-link:hover .eyebrow, .mobile-nav-link:focus-visible .eyebrow { transform: none; } }
</style>
