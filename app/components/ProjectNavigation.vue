<script setup lang="ts">
defineProps<{ previous?: { path: string, title: string } | null, next?: { path: string, title: string } | null }>()
const { locale, t } = useI18n()
const localePath = useLocalePath()
const previousIcon = computed(() => locale.value === 'fa' ? 'i-lucide-arrow-up-right' : 'i-lucide-arrow-up-left')
const nextIcon = computed(() => locale.value === 'fa' ? 'i-lucide-arrow-up-left' : 'i-lucide-arrow-up-right')
</script>

<template>
  <nav
    class="project-navigation grid gap-1 md:grid-cols-2"
    :class="{ 'project-navigation--single': !previous || !next }"
    :aria-label="t('project.navigation')"
  >
    <NuxtLink
      v-if="previous"
      :to="localePath(previous.path)"
      class="previous-project group py-8"
    ><span class="eyebrow">{{ t('project.previous') }}</span><span class="project-navigation__title mt-4 flex items-center gap-3 text-xl font-semibold">{{ previous.title }}</span><span
      class="project-navigation__visual"
      aria-hidden="true"
    ><UIcon
      :name="previousIcon"
      class="directional-icon"
    /></span></NuxtLink><div v-else />
    <NuxtLink
      v-if="next"
      :to="localePath(next.path)"
      class="next-project group py-8"
    ><span class="eyebrow">{{ t('project.next') }}</span><span class="project-navigation__title mt-4 flex items-center justify-end gap-3 text-xl font-semibold">{{ next.title }}</span><span
      class="project-navigation__visual"
      aria-hidden="true"
    ><UIcon
      :name="nextIcon"
      class="directional-icon"
    /></span></NuxtLink>
  </nav>
</template>

<style scoped>
.project-navigation { overflow: hidden; border-radius: .75rem; background: var(--portfolio-bg); }
.previous-project, .next-project { min-height: 9rem; padding-inline: 2rem; background: var(--portfolio-surface); transition: color var(--motion-control) var(--ease-standard), background-color var(--motion-control) var(--ease-standard), transform var(--motion-control) var(--ease-enter); }
.next-project { text-align: end; }
.project-navigation--single { grid-template-columns: 1fr; justify-items: center; background: transparent; }
.project-navigation--single > div { display: none; }
.project-navigation--single :is(.previous-project, .next-project) { position: relative; display: grid; width: min(100%, 52rem); min-height: 12rem; overflow: hidden; grid-template-columns: minmax(0, 1fr) 10rem; grid-template-rows: 1fr 1fr; align-items: stretch; padding: 0; border: 1px solid var(--portfolio-line); border-radius: .75rem; background: linear-gradient(120deg, color-mix(in srgb, var(--portfolio-surface) 90%, transparent), color-mix(in srgb, var(--portfolio-accent-soft) 45%, var(--portfolio-surface))); text-align: start; }
.project-navigation--single :is(.previous-project, .next-project) > .eyebrow { grid-column: 1; grid-row: 1; align-self: end; margin: 0 2rem .45rem; color: var(--portfolio-muted); }
.project-navigation--single .project-navigation__title { grid-column: 1; grid-row: 2; align-self: start; justify-content: flex-start; margin: 0 2rem; font-size: clamp(1.25rem, 1.8vw, 1.65rem); }
.project-navigation__visual { position: relative; display: grid; grid-column: 2; grid-row: 1 / 3; place-items: center; overflow: hidden; border-inline-start: 1px solid var(--portfolio-line); background: radial-gradient(circle, var(--portfolio-accent-soft), transparent 68%); color: var(--portfolio-accent); }
.project-navigation__visual::before,.project-navigation__visual::after { position: absolute; border: 1px solid color-mix(in srgb, var(--portfolio-accent) 32%, transparent); border-radius: 50%; content: ''; transition: transform var(--motion-control) var(--ease-enter), opacity var(--motion-control); }
.project-navigation__visual::before { width: 5.25rem; height: 5.25rem; opacity: .65; }
.project-navigation__visual::after { width: 7.5rem; height: 7.5rem; opacity: .2; }
.project-navigation__visual .directional-icon { position: relative; z-index: 1; width: 2.35rem; height: 2.35rem; transition: transform var(--motion-control) var(--ease-enter); }
.previous-project:hover .directional-icon { transform: translateX(-.25rem); }
.next-project:hover .directional-icon { transform: translateX(.25rem); }
[dir='rtl'] .previous-project:hover .directional-icon { transform: translateX(.25rem); }
[dir='rtl'] .next-project:hover .directional-icon { transform: translateX(-.25rem); }
.project-navigation--single :is(.previous-project, .next-project):hover .directional-icon { transform: translate(.25rem, -.25rem) rotate(8deg) scale(1.08); }
[dir='rtl'] .project-navigation--single :is(.previous-project, .next-project):hover .directional-icon { transform: translate(-.25rem, -.25rem) rotate(-8deg) scale(1.08); }
.project-navigation--single :is(.previous-project, .next-project):hover .project-navigation__visual::before { transform: scale(1.14); }
.project-navigation--single :is(.previous-project, .next-project):hover .project-navigation__visual::after { opacity: .38; transform: scale(.9); }
@media (max-width: 767px) { .previous-project, .next-project { min-height: 7.5rem; padding-inline: 1.25rem; }.project-navigation--single :is(.previous-project, .next-project) { min-height: 9rem; grid-template-columns: minmax(0, 1fr) 6rem; padding: 0; }.project-navigation--single :is(.previous-project, .next-project) > .eyebrow { margin-inline: 1.25rem; }.project-navigation--single .project-navigation__title { margin-inline: 1.25rem; font-size: 1.15rem; }.project-navigation__visual::before { width: 3.75rem; height: 3.75rem; }.project-navigation__visual::after { width: 5rem; height: 5rem; }.project-navigation__visual .directional-icon { width: 1.8rem; height: 1.8rem; } }
@media (prefers-reduced-motion: reduce) { .previous-project, .next-project, .project-navigation__visual::before, .project-navigation__visual::after, .project-navigation__visual .directional-icon { transition: none; } .previous-project:hover, .next-project:hover, .directional-icon, .project-navigation__visual::before, .project-navigation__visual::after { transform: none !important; } }
</style>
