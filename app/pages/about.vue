<script setup lang="ts">
useSeoMeta({ title: 'About — Name Placeholder', description: 'About a Product Designer focused on fintech, research, analytics and design systems.' })
</script>

<template>
  <div>
    <header class="portfolio-container grid gap-12 pb-20 pt-36 md:pt-48 lg:grid-cols-12 lg:pb-32">
      <p class="eyebrow lg:col-span-3">
        About · Placeholder profile
      </p>
      <div class="lg:col-span-8 lg:col-start-5">
        <h1 class="editorial-display text-[clamp(4rem,8vw,8.5rem)]">
          Designing with evidence, intent and care.
        </h1>
      </div>
    </header>
    <section class="border-t border-default py-[var(--portfolio-section)]">
      <div class="portfolio-container grid gap-12 lg:grid-cols-12">
        <div
          class="aspect-[4/5] border border-default bg-elevated lg:col-span-4"
          role="img"
          aria-label="Portrait placeholder"
        >
          <div class="grid size-full place-items-center">
            <span class="eyebrow">Portrait placeholder</span>
          </div>
        </div>
        <div class="space-y-8 lg:col-span-6 lg:col-start-7">
          <p class="text-2xl leading-relaxed md:text-3xl">
            Name Placeholder is a Product Designer working across product strategy, interaction design, research and optimization.
          </p>
          <p class="max-w-2xl text-lg leading-relaxed text-muted">
            TODO: Add the real biography, career narrative, working principles and selected experience once the CV and portfolio source material are available.
          </p>
          <div class="grid gap-8 border-t border-default pt-8 sm:grid-cols-2">
            <div>
              <h2 class="eyebrow">
                Current focus
              </h2><p class="mt-4 leading-relaxed">
                Fintech · Investment products · CRO · Product analytics
              </p>
            </div><div>
              <h2 class="eyebrow">
                Capabilities
              </h2><p class="mt-4 leading-relaxed">
                Research · Product design · Design systems · Validation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="border-t border-default py-[var(--portfolio-section)]">
      <div class="portfolio-container grid gap-10 lg:grid-cols-12">
        <p class="eyebrow lg:col-span-3">
          Working principles
        </p><ol class="divide-y divide-default border-y border-default lg:col-span-8">
          <li
            v-for="(item, index) in ['Understand the system before shaping the interface.', 'Make product decisions legible and testable.', 'Use evidence without losing design judgment.', 'Treat clarity as a measurable product outcome.']"
            :key="item"
            class="grid grid-cols-[2rem_1fr] gap-5 py-6 text-xl"
          >
            <span class="eyebrow">0{{ index + 1 }}</span><span>{{ item }}</span>
          </li>
        </ol>
      </div>
    </section>
  </div>
</template>
