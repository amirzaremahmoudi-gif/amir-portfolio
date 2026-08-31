<script setup lang="ts">
const { data: projects } = await useAsyncData('home-work', () => queryCollection('work').order('order', 'ASC').all())
useSeoMeta({ title: 'Name Placeholder — Product Designer', description: 'Selected product design work across fintech, investment products, research, CRO and design systems.' })
</script>

<template>
  <div>
    <section class="portfolio-container grid min-h-[38rem] grid-cols-1 content-end gap-12 pb-16 pt-32 lg:grid-cols-12 lg:pb-24 lg:pt-40">
      <div class="lg:col-span-8">
        <p class="eyebrow mb-8">
          Product Designer · Portfolio foundation
        </p>
        <h1 class="editorial-display max-w-5xl text-[clamp(4rem,10vw,9.5rem)]">
          Designing clarity into complex products.
        </h1>
      </div>
      <div class="flex flex-col justify-end gap-8 lg:col-span-4 lg:pb-3">
        <p class="max-w-md text-lg leading-relaxed text-muted">
          Name Placeholder is a Product Designer focused on fintech, digital investment experiences, research and measurable product improvement.
        </p>
        <div class="flex flex-wrap gap-3">
          <UButton
            to="/work"
            label="Selected work"
            trailing-icon="i-lucide-arrow-right"
            size="lg"
          /><UButton
            to="/about"
            label="About"
            color="neutral"
            variant="outline"
            size="lg"
          />
        </div>
      </div>
    </section>

    <section
      class="border-t border-default py-[var(--portfolio-section)]"
      aria-labelledby="selected-work"
    >
      <div class="portfolio-container">
        <SectionHeading
          id="selected-work"
          index="01"
          title="Selected work"
          description="Placeholder projects awaiting final case-study content and imagery."
        />
        <div class="mt-16 grid grid-cols-1 gap-x-6 gap-y-20 md:grid-cols-12">
          <ProjectCard
            v-for="(project, index) in projects"
            :key="project.path"
            :project="project"
            :index="index"
            :class="index % 3 === 0 ? 'md:col-span-7' : index % 3 === 1 ? 'md:col-span-5 md:mt-24' : 'md:col-span-6'"
          />
        </div>
        <UButton
          to="/work"
          label="View all projects"
          trailing-icon="i-lucide-arrow-right"
          color="neutral"
          variant="link"
          class="mt-16 px-0"
        />
      </div>
    </section>

    <section
      class="border-t border-default py-[var(--portfolio-section)]"
      aria-labelledby="expertise"
    >
      <div class="portfolio-container grid gap-14 lg:grid-cols-12">
        <SectionHeading
          id="expertise"
          index="02"
          title="Expertise"
          class="lg:col-span-4"
        />
        <ul class="divide-y divide-default border-y border-default lg:col-span-8">
          <li
            v-for="(item, index) in ['Product Design', 'UX Research', 'Fintech', 'CRO', 'Product Analytics', 'Design Systems']"
            :key="item"
            class="flex items-center justify-between py-5 text-xl md:text-2xl"
          >
            <span>{{ item }}</span><span class="eyebrow">0{{ index + 1 }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section
      class="border-t border-default py-[var(--portfolio-section)]"
      aria-labelledby="about-preview"
    >
      <div class="portfolio-container grid gap-10 lg:grid-cols-12">
        <p class="eyebrow lg:col-span-3">
          03 · About
        </p>
        <div class="lg:col-span-8 lg:col-start-5">
          <h2
            id="about-preview"
            class="editorial-display text-[clamp(3rem,6vw,6rem)]"
          >
            A systems-minded designer for consequential digital products.
          </h2>
          <p class="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            TODO: Replace this preview with a short personal introduction after the CV, experience and working philosophy are provided.
          </p>
          <UButton
            to="/about"
            label="More about me"
            trailing-icon="i-lucide-arrow-right"
            color="neutral"
            variant="link"
            class="mt-8 px-0"
          />
        </div>
      </div>
    </section>
  </div>
</template>
