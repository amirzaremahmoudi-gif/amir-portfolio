<script setup lang="ts">
const { locale, t } = useI18n()
const { data: projects } = await useAsyncData(`all-work-${locale.value}`, () => locale.value === 'fa' ? queryCollection('work_fa').all() : queryCollection('work_en').all(), { watch: [locale] })
useSeoMeta({ title: () => t('work.seoTitle'), description: () => t('work.seoDescription'), ogTitle: () => t('work.seoTitle'), ogDescription: () => t('work.seoDescription') })
</script>

<template>
  <div class="work-page portfolio-container pb-[var(--portfolio-section)] pt-28 md:pt-32">
    <header class="work-hero">
      <p class="work-hero__kicker">
        {{ t('work.eyebrow') }}
      </p>
      <h1 class="work-hero__title">
        <span class="work-hero__title-text">{{ t('work.titleBefore') }}</span>{{ ' ' }}<span>{{ t('work.titleAccent') }}</span>
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
.work-hero__title > span:last-child { color: var(--portfolio-accent); }
.work-hero__intro { width: 100%; max-width: 48rem; margin: clamp(1.25rem, 2vw, 2rem) auto 0; color: var(--portfolio-muted); font-size: clamp(1rem, 1.1vw, 1.15rem); line-height: 1.85; }
[lang='fa'] .work-hero__title { font-weight: 900; letter-spacing: -.012em; line-height: 1.18; }
.work-group { position: relative; }
.work-group::before { display: block; width: 100%; height: 1px; margin-bottom: 1.75rem; background: linear-gradient(90deg, var(--portfolio-line), transparent); content: ''; }
.project-list { display: grid; grid-template-columns: minmax(0, 1fr); gap: clamp(4rem, 7vw, 7rem); padding-top: clamp(1.5rem, 3vw, 3rem); }
@media (max-width: 767px) {
  .work-page { box-sizing: border-box; width: 100%; max-width: 100vw; overflow: hidden; }
  .work-hero { padding-top: 1rem; padding-bottom: 3rem; overflow: hidden; }
  .work-hero__title {
    width: 100%;
    max-width: 10.5em;
    margin-inline: auto;
    font-size: clamp(2.1rem, 10vw, 2.75rem);
    line-height: 1.2;
    overflow-wrap: anywhere;
    text-wrap: balance;
    white-space: normal;
  }
  [lang='fa'] .work-hero__title { line-height: 1.3; }
  .work-hero__title > span { display: block; width: 100%; }
  .project-list { gap: 4rem; }
}
</style>
