<script setup lang="ts">
const { locale, t } = useI18n()
const localePath = useLocalePath()
const { expertise, profile } = usePortfolioContent()
const forwardIcon = computed(() => locale.value === 'fa' ? 'i-lucide-arrow-left' : 'i-lucide-arrow-right')
const { data: projects } = await useAsyncData(`home-work-${locale.value}`, () => locale.value === 'fa' ? queryCollection('work_fa').order('order', 'ASC').all() : queryCollection('work_en').order('order', 'ASC').all(), { watch: [locale] })
useSeoMeta({ title: () => t('home.seoTitle'), description: () => t('home.seoDescription'), ogTitle: () => t('home.seoTitle'), ogDescription: () => t('home.seoDescription') })
</script>

<template>
  <div>
    <section class="portfolio-container hero-shell grid grid-cols-1 gap-10 pb-14 pt-32 md:pb-20 md:pt-40 lg:grid-cols-12 lg:gap-y-16">
      <div class="motion-rise lg:col-span-9">
        <p class="eyebrow mb-7 md:mb-9">
          {{ profile.title }} · {{ profile.location }}
        </p>
        <h1 class="editorial-display max-w-6xl text-[clamp(3.9rem,9.2vw,9rem)]">
          {{ t('home.heroBefore') }} <span class="text-accent italic">{{ t('home.heroAccent') }}</span> {{ t('home.heroAfter') }}
        </h1>
      </div>
      <div class="motion-rise motion-rise-delay-1 flex flex-col justify-end gap-7 lg:col-span-3 lg:pb-3">
        <p class="max-w-md text-[1.05rem] leading-[1.75] text-muted">
          {{ profile.positioning }}
        </p>
        <div class="flex flex-wrap gap-3">
          <UButton
            to="#selected-work"
            :label="t('home.selectedWork')"
            :trailing-icon="forwardIcon"
            size="lg"
            class="rounded-full px-5"
          /><UButton
            :to="localePath('/about')"
            :label="t('home.about')"
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
            {{ t('home.focus') }}
          </dt><dd class="mt-2">
            {{ t('home.focusValue') }}
          </dd>
        </div>
        <div>
          <dt class="eyebrow">
            {{ t('home.practice') }}
          </dt><dd class="mt-2">
            {{ t('home.practiceValue') }}
          </dd>
        </div>
        <div>
          <dt class="eyebrow">
            {{ t('home.approach') }}
          </dt><dd class="mt-2">
            {{ t('home.approachValue') }}
          </dd>
        </div>
        <div>
          <dt class="eyebrow">
            {{ t('home.status') }}
          </dt><dd class="mt-2 text-accent">
            {{ profile.availability }}
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
          :title="t('home.selectedWork')"
          :description="t('home.workDescription')"
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
          :to="localePath('/work')"
          :label="t('home.viewAll')"
          :trailing-icon="forwardIcon"
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
          :title="t('home.expertise')"
          class="lg:col-span-4"
        />
        <ul class="divide-y divide-default border-y border-default lg:col-span-8">
          <li
            v-for="(item, index) in expertise"
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
          03 · {{ t('home.aboutLabel') }}
        </p>
        <div class="lg:col-span-8 lg:col-start-5">
          <h2
            id="about-preview"
            class="editorial-display text-[clamp(3rem,6vw,6rem)]"
          >
            {{ t('home.aboutHeadline') }}
          </h2>
          <p class="mt-8 max-w-2xl text-lg leading-relaxed text-muted">
            {{ profile.summary }}
          </p>
          <UButton
            :to="localePath('/about')"
            :label="t('home.moreAbout')"
            :trailing-icon="forwardIcon"
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
