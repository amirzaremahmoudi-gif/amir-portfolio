<script setup lang="ts">
const { data: projects } = await useAsyncData('all-work', () => queryCollection('work').order('order', 'ASC').all())
useSeoMeta({ title: 'Selected Work — Name Placeholder', description: 'Product design case studies spanning fintech, investment experiences, campaigns, risk and conversion optimization.' })
</script>

<template>
  <div class="portfolio-container pb-[var(--portfolio-section)] pt-36 md:pt-48">
    <header class="grid gap-10 border-b border-default pb-16 lg:grid-cols-12 lg:pb-24">
      <p class="eyebrow lg:col-span-3">
        Selected projects · 2026
      </p>
      <div class="lg:col-span-8 lg:col-start-5">
        <h1 class="editorial-display text-[clamp(4.5rem,10vw,10rem)]">
          Work
        </h1><p class="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
          A working index of product design engagements. Titles and categories are temporary; full context, decisions and outcomes will be added in the next content phase.
        </p>
      </div>
    </header>
    <div class="grid grid-cols-1 gap-x-6 gap-y-20 pt-16 md:grid-cols-12">
      <ProjectCard
        v-for="(project, index) in projects"
        :key="project.path"
        :project="project"
        :index="index"
        :class="index % 4 === 0 ? 'md:col-span-8' : index % 4 === 1 ? 'md:col-span-4 md:mt-32' : 'md:col-span-6'"
      />
    </div>
  </div>
</template>
