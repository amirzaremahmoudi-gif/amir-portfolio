<script setup lang="ts">
import type { ProjectSummary } from '~/types/project'

defineProps<{ project: ProjectSummary, index: number }>()
</script>

<template>
  <article class="group">
    <NuxtLink
      :to="project.path"
      class="block"
    >
      <div class="relative aspect-[4/3] overflow-hidden border border-default bg-[color:var(--portfolio-surface)]">
        <NuxtImg
          v-if="project.cover"
          :src="project.cover"
          :alt="project.coverAlt || ''"
          width="1200"
          height="900"
          loading="lazy"
          class="size-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
        <div
          v-else
          class="project-placeholder absolute inset-0 transition-transform duration-500 group-hover:scale-[1.015]"
          :data-tone="project.coverTone"
          role="img"
          :aria-label="`${project.title} cover image placeholder`"
        >
          <span class="absolute left-6 top-6 text-[10px] font-bold uppercase tracking-[0.2em] text-black/60">Image placeholder · {{ String(index + 1).padStart(2, '0') }}</span>
          <span class="editorial-display absolute bottom-5 right-6 text-[clamp(5rem,12vw,11rem)] text-black/10">{{ String(index + 1).padStart(2, '0') }}</span>
        </div>
      </div>
      <div class="grid grid-cols-[1fr_auto] gap-4 border-b border-default py-5">
        <div>
          <p class="eyebrow mb-2">{{ project.category }} · {{ project.year }}</p>
          <h3 class="text-xl font-semibold tracking-tight md:text-2xl">{{ project.title }}</h3>
          <p class="mt-2 max-w-xl text-sm leading-relaxed text-muted">{{ project.description }}</p>
        </div>
        <UIcon
          name="i-lucide-arrow-up-right"
          class="mt-1 size-5 text-muted transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
          aria-hidden="true"
        />
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped>
.project-placeholder { background: #b56f45; }
.project-placeholder::after { content: ''; position: absolute; inset: 18% 12%; border: 1px solid rgb(0 0 0 / 25%); transform: rotate(-4deg); }
.project-placeholder[data-tone='sage'] { background: #7d8772; }
.project-placeholder[data-tone='cobalt'] { background: #526278; }
.project-placeholder[data-tone='sand'] { background: #c6ac7c; }
.project-placeholder[data-tone='graphite'] { background: #62605b; }
</style>
