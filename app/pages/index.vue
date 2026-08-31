<script setup lang="ts">
const { data: projects } = await useAsyncData('home-work', () => queryCollection('work').order('order', 'ASC').all())
useSeoMeta({ title: 'Name Placeholder — Product Designer', description: 'Selected product design work across fintech, investment products, research, CRO and design systems.' })
</script>

<template>
  <div>
    <section class="portfolio-container hero-shell grid grid-cols-1 gap-10 pb-14 pt-32 md:pb-20 md:pt-40 lg:grid-cols-12 lg:gap-y-16">
      <div class="motion-rise lg:col-span-9">
        <p class="eyebrow mb-7 md:mb-9">
          Product Designer · Portfolio foundation
        </p>
        <h1 class="editorial-display max-w-6xl text-[clamp(3.9rem,9.2vw,9rem)]">
          Designing clarity <span class="text-accent italic">into</span> complex products.
        </h1>
      </div>
      <div class="motion-rise motion-rise-delay-1 flex flex-col justify-end gap-7 lg:col-span-3 lg:pb-3">
        <p class="max-w-md text-[1.05rem] leading-[1.75] text-muted">
          Name Placeholder is a Product Designer focused on fintech, digital investment experiences, research and measurable product improvement.
        </p>
        <div class="flex flex-wrap gap-3">
          <UButton
            to="#selected-work"
            label="Selected work"
            trailing-icon="i-lucide-arrow-right"
            size="lg"
            class="rounded-full px-5"
          /><UButton
            to="/about"
            label="About"
            color="neutral"
            variant="soft"
            size="lg"
            class="rounded-full px-5"
          />
        </div>
      </div>
      <dl class="motion-rise motion-rise-delay-2 hero-meta grid grid-cols-2 gap-x-6 gap-y-5 border-t border-default pt-5 text-sm md:grid-cols-4 lg:col-span-12">
        <div>
          <dt class="eyebrow">
            Focus
          </dt><dd class="mt-2">
            Fintech products
          </dd>
        </div>
        <div>
          <dt class="eyebrow">
            Practice
          </dt><dd class="mt-2">
            Research to systems
          </dd>
        </div>
        <div>
          <dt class="eyebrow">
            Approach
          </dt><dd class="mt-2">
            Evidence with judgment
          </dd>
        </div>
        <div>
          <dt class="eyebrow">
            Status
          </dt><dd class="mt-2 text-muted">
            Placeholder
          </dd>
        </div>
      </dl>
    </section>

    <section
      class="section-divider py-[var(--portfolio-section)]"
      aria-labelledby="selected-work"
    >
      <div class="portfolio-container">
        <SectionHeading
          id="selected-work"
          index="01"
          title="Selected work"
          description="Placeholder projects awaiting final case-study content and imagery."
        />
        <div class="mt-14 grid grid-cols-1 gap-x-7 gap-y-16 md:mt-20 md:grid-cols-12 md:gap-y-24">
          <ProjectCard
            v-for="(project, index) in projects"
            :key="project.path"
            :project="project"
            :index="index"
            :eager="index === 0"
            :layout="index % 3 === 1 ? 'portrait' : index % 3 === 2 ? 'square' : 'landscape'"
            :class="index % 3 === 0 ? 'md:col-span-7' : index % 3 === 1 ? 'md:col-span-5 md:mt-24' : 'md:col-span-6'"
          />
        </div>
        <UButton
          to="/work"
          label="View all projects"
          trailing-icon="i-lucide-arrow-right"
          color="neutral"
          variant="link"
          class="mt-14 px-0"
        />
      </div>
    </section>

    <section
      class="section-divider py-[var(--portfolio-section)]"
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
            class="group flex items-center justify-between py-5 text-xl transition-[padding] duration-[var(--motion-control)] hover:px-2 md:text-2xl"
          >
            <span>{{ item }}</span><span class="eyebrow">0{{ index + 1 }}</span>
          </li>
        </ul>
      </div>
    </section>

    <section
      class="section-divider py-[var(--portfolio-section)]"
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

<style scoped>
.hero-shell { min-height: min(52rem, calc(100svh - 1rem)); align-content: end; }
@media (max-height: 740px) and (min-width: 1024px) { .hero-shell { min-height: 43rem; } }
@media (max-width: 767px) {
  .hero-shell { min-height: auto; }
  .hero-meta > div:nth-child(3), .hero-meta > div:nth-child(4) { padding-top: 1rem; border-top: 1px solid var(--portfolio-line); }
}
@media (prefers-reduced-motion: reduce) { .group { transition: none; } }
</style>
