<script setup lang="ts">
const { data: projects } = await useAsyncData('all-work', () => queryCollection('work').order('order', 'ASC').all())
useSeoMeta({ title: 'Selected Work — Name Placeholder', description: 'Product design case studies spanning fintech, investment experiences, campaigns, risk and conversion optimization.' })
</script>

<template>
  <div class="portfolio-container pb-[var(--portfolio-section)] pt-32 md:pt-44">
    <header class="grid gap-10 border-b border-default pb-14 lg:grid-cols-12 lg:pb-20">
      <p class="eyebrow lg:col-span-3">
        Selected projects · 2026
      </p>
      <div class="lg:col-span-8 lg:col-start-5">
        <h1 class="motion-rise editorial-display text-[clamp(4.5rem,9vw,9.5rem)]">
          Selected <span class="text-accent italic">work</span>
        </h1><p class="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          A working index of product design engagements. Titles and categories are temporary; full context, decisions and outcomes will be added in the next content phase.
        </p>
      </div>
    </header>
    <div class="grid grid-cols-1 gap-x-7 gap-y-16 pt-14 md:grid-cols-12 md:gap-y-24 md:pt-20">
      <ProjectCard
        v-for="(project, index) in projects"
        :key="project.path"
        :project="project"
        :index="index"
        :eager="index === 0"
        :layout="index % 4 === 1 ? 'portrait' : index % 4 === 3 ? 'square' : 'landscape'"
        heading-tag="h2"
        :class="index % 4 === 0 ? 'md:col-span-8' : index % 4 === 1 ? 'md:col-span-4 md:mt-32' : 'md:col-span-6'"
      />
    </div>
  </div>
</template>
