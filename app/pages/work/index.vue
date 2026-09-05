<script setup lang="ts">
const { locale, t } = useI18n()
const { data: projects } = await useAsyncData(`all-work-${locale.value}`, () => locale.value === 'fa' ? queryCollection('work_fa').order('order', 'ASC').all() : queryCollection('work_en').order('order', 'ASC').all(), { watch: [locale] })
useSeoMeta({ title: () => t('work.seoTitle'), description: () => t('work.seoDescription'), ogTitle: () => t('work.seoTitle'), ogDescription: () => t('work.seoDescription') })
</script>

<template>
  <div class="portfolio-container pb-[var(--portfolio-section)] pt-28 md:pt-32">
    <header class="work-hero">
      <p class="work-hero__kicker">
        {{ t('work.eyebrow') }}
      </p>
      <h1 class="work-hero__title">
        {{ t('work.titleBefore') }} <span>{{ t('work.titleAccent') }}</span>
      </h1>
      <AsciiGlitchText
        :text="t('work.intro')"
        as="p"
        class="work-hero__intro"
      />
    </header>

    <section
      v-if="projects?.length"
      class="work-group reveal-on-scroll"
      :aria-label="t('work.eyebrow')"
    >
      <div class="project-list">
        <ProjectCard
          v-for="(project, index) in projects"
          :key="project.path"
          :project="project"
          :index="index"
          :eager="index === 0"
          layout="cinematic"
          hierarchy="secondary"
          heading-tag="h2"
          :show-role="false"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.work-hero { display: flex; width: 100%; flex-direction: column; align-items: center; padding-block: clamp(1.5rem, 3vw, 3rem) clamp(3rem, 5vw, 5rem); text-align: center; }
.work-hero__kicker { color: var(--portfolio-accent); font-size: clamp(.95rem, 1vw, 1.05rem); font-weight: 750; line-height: 1.5; }
.work-hero__title { max-width: none; margin-top: .75rem; font-family: var(--font-display); font-size: clamp(3.25rem, 6vw, 6.5rem); font-weight: 850; letter-spacing: -.055em; line-height: 1.02; white-space: nowrap; }
.work-hero__title span { color: var(--portfolio-accent); }
.work-hero__intro { width: 100%; max-width: 48rem; margin: clamp(1.25rem, 2vw, 2rem) auto 0; color: var(--portfolio-muted); font-size: clamp(1rem, 1.1vw, 1.15rem); line-height: 1.85; }
[lang='fa'] .work-hero__title { font-weight: 900; letter-spacing: -.012em; line-height: 1.18; }
.work-group { position: relative; }
.work-group::before { display: block; width: 100%; height: 1px; margin-bottom: 1.75rem; background: linear-gradient(90deg, var(--portfolio-line), transparent); content: ''; }
.project-list { display: grid; grid-template-columns: minmax(0, 1fr); gap: clamp(4rem, 7vw, 7rem); padding-top: clamp(1.5rem, 3vw, 3rem); }
@media (max-width: 767px) { .work-hero { padding-top: 1rem; padding-bottom: 3rem; } .work-hero__title { max-width: 100%; font-size: clamp(2.5rem, 12vw, 4rem); } .project-list { gap: 4rem; } }
</style>
