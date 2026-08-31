<script setup lang="ts">
import type { ProjectSummary } from '~/types/project'

withDefaults(defineProps<{ project: ProjectSummary, index: number, eager?: boolean, layout?: 'landscape' | 'portrait' | 'square', headingTag?: 'h2' | 'h3' }>(), {
  eager: false,
  layout: 'landscape',
  headingTag: 'h3'
})
</script>

<template>
  <article
    class="project-card group"
    :data-layout="layout"
  >
    <NuxtLink
      :to="project.path"
      class="block rounded-sm focus-visible:outline-offset-8"
    >
      <div class="project-media relative overflow-hidden bg-[color:var(--portfolio-surface)]">
        <NuxtImg
          v-if="project.cover"
          :src="project.cover"
          :alt="project.coverAlt || ''"
          width="1200"
          height="900"
          :loading="eager ? 'eager' : 'lazy'"
          :fetchpriority="eager ? 'high' : 'auto'"
          class="size-full object-cover transition-transform duration-[var(--motion-major)] ease-[var(--ease-enter)] group-hover:scale-[1.025] group-focus-within:scale-[1.025]"
        />
        <div
          v-else
          class="project-placeholder absolute inset-0 transition-transform duration-500 group-hover:scale-[1.015]"
          :data-tone="project.coverTone"
          role="img"
          :aria-label="`${project.title} cover image placeholder`"
        >
          <span class="absolute left-5 top-5 text-[10px] font-bold uppercase tracking-[0.2em] text-black/60 md:left-7 md:top-7">Project image placeholder</span>
          <span class="editorial-display absolute bottom-4 right-5 text-[clamp(4.5rem,12vw,10rem)] text-black/12 md:bottom-6 md:right-7">{{ String(index + 1).padStart(2, '0') }}</span>
        </div>
        <span class="project-action absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full bg-[color:var(--portfolio-bg)] px-4 py-2 text-xs font-semibold shadow-lg md:bottom-5 md:right-5">
          View case study
          <UIcon
            name="i-lucide-arrow-up-right"
            class="size-4"
            aria-hidden="true"
          />
        </span>
      </div>
      <div class="project-copy grid gap-4 border-b border-default py-5 transition-transform duration-[var(--motion-control)] ease-[var(--ease-standard)] sm:grid-cols-[minmax(0,1fr)_auto] md:py-6">
        <div class="max-w-2xl">
          <p class="eyebrow mb-3">{{ String(index + 1).padStart(2, '0') }} · {{ project.category }} · {{ project.year }}</p>
          <component
            :is="headingTag"
            class="text-[1.45rem] font-semibold tracking-[-.035em] md:text-[1.7rem]"
          >
            {{ project.title }}
          </component>
          <p class="mt-3 text-[.94rem] leading-relaxed text-muted">{{ project.description }}</p>
        </div>
        <span class="hidden self-end text-xs font-semibold text-muted transition-colors group-hover:text-highlighted group-focus-within:text-highlighted sm:block">Open project</span>
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped>
.project-media { aspect-ratio: 4 / 3; }
.project-card[data-layout='portrait'] .project-media { aspect-ratio: 4 / 5; }
.project-card[data-layout='square'] .project-media { aspect-ratio: 1; }
.project-placeholder { background: #b56f45; }
.project-placeholder[data-tone='sage'] { background: #7d8772; }
.project-placeholder[data-tone='cobalt'] { background: #526278; }
.project-placeholder[data-tone='sand'] { background: #c6ac7c; }
.project-placeholder[data-tone='graphite'] { background: #62605b; }
.project-action { opacity: .92; transition: background-color var(--motion-control) var(--ease-standard), color var(--motion-control) var(--ease-standard), transform var(--motion-control) var(--ease-standard); }
.project-card:hover .project-action, .project-card:focus-within .project-action { color: var(--portfolio-footer-text); background: var(--portfolio-footer-bg); transform: translate(-.2rem, -.2rem); }
.project-card:hover .project-copy, .project-card:focus-within .project-copy { transform: translateX(.35rem); }
@media (max-width: 639px) {
  .project-card[data-layout] .project-media { aspect-ratio: 4 / 3; }
  .project-action { right: .75rem; bottom: .75rem; padding: .65rem .8rem; }
}
@media (prefers-reduced-motion: reduce) {
  .project-card :deep(img), .project-action, .project-copy { transition: none; }
  .project-card:hover .project-action, .project-card:focus-within .project-action, .project-card:hover .project-copy, .project-card:focus-within .project-copy { transform: none; }
}
</style>
