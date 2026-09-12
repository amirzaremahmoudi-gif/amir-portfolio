<script setup lang="ts">
const { locale, t } = useI18n()
const { data: projects } = await useAsyncData(`all-work-${locale.value}`, () => locale.value === 'fa' ? queryCollection('work_fa').all() : queryCollection('work_en').all(), { watch: [locale] })
const sortedProjects = computed(() => [...(projects.value || [])].sort((a, b) => a.order - b.order))
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
    </header>

    <section
      v-if="sortedProjects.length"
      class="work-group reveal-on-scroll"
      :aria-label="t('work.eyebrow')"
    >
      <div class="project-list">
        <ProjectCard
          v-for="(project, index) in sortedProjects"
          :key="project.path"
          :project="project"
          :index="index"
          :eager="index === 0"
          layout="cinematic"
          hierarchy="secondary"
          heading-tag="h2"
          :label="t('project.caseStudySuffix')"
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
[lang='fa'] .work-hero__title { font-weight: 900; letter-spacing: -.012em; line-height: 1.18; }
.work-group { position: relative; }
.work-group::before { display: block; width: 100%; height: 1px; margin-bottom: 1.75rem; background: linear-gradient(90deg, var(--portfolio-line), transparent); content: ''; }
.project-list { display: grid; grid-template-columns: minmax(0, 1fr); gap: clamp(1.25rem, 2vw, 1.75rem); padding-top: clamp(1.5rem, 3vw, 3rem); }
.project-list :deep(.project-card) { position: relative; min-width: 0; padding: .55rem; overflow: clip; border: 1px solid color-mix(in srgb, var(--portfolio-line) 88%, transparent); border-radius: 1.5rem; background: color-mix(in srgb, var(--portfolio-surface) 78%, transparent); box-shadow: 0 1.25rem 3.5rem rgb(0 0 0 / 7%); transition: border-color var(--motion-content) var(--ease-standard), box-shadow var(--motion-content) var(--ease-standard), transform var(--motion-content) var(--ease-enter); backdrop-filter: blur(12px); }
.project-list :deep(.project-card:hover), .project-list :deep(.project-card:focus-within) { border-color: color-mix(in srgb, var(--portfolio-accent) 42%, var(--portfolio-line)); box-shadow: 0 1.75rem 4.5rem rgb(0 0 0 / 13%); transform: translateY(-.25rem); }
.project-list :deep(.project-link) { display: grid; width: 100%; min-width: 0; height: clamp(17rem, 24vw, 21rem); min-height: 0; grid-template-rows: minmax(0, 1fr); grid-template-columns: minmax(0, 1.4fr) minmax(18rem, .7fr); grid-template-areas: 'media copy'; align-items: stretch; }
.project-list :deep(.project-card:nth-child(even) .project-link) { grid-template-columns: minmax(18rem, .7fr) minmax(0, 1.4fr); grid-template-areas: 'copy media'; }
.project-list :deep(.project-media) { grid-area: media; width: 100%; height: 100%; min-height: 0; overflow: hidden; border-radius: 1.08rem; box-shadow: none; }
.project-list :deep(.project-card[data-layout] .project-media) { aspect-ratio: auto !important; }
.project-list :deep(.project-media img) { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.project-list :deep(.project-media), .project-list :deep(.project-card:hover .project-media), .project-list :deep(.project-card:focus-within .project-media) { transform: none; }
.project-list :deep(.project-card:hover .project-media img), .project-list :deep(.project-card:focus-within .project-media img), .project-list :deep(.project-card:hover .project-placeholder), .project-list :deep(.project-card:focus-within .project-placeholder) { transform: none; }
.project-list :deep(.project-glow) { border-radius: inherit; }
.project-list :deep(.project-placeholder) { background: radial-gradient(circle at 22% 16%, color-mix(in srgb, var(--portfolio-accent) 32%, transparent), transparent 30%), linear-gradient(145deg, color-mix(in srgb, var(--portfolio-surface) 84%, #151922), color-mix(in srgb, var(--portfolio-accent) 18%, var(--portfolio-bg))); }
.project-list :deep(.project-placeholder::before) { position: absolute; inset: 0; background-image: linear-gradient(color-mix(in srgb, var(--portfolio-line) 42%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--portfolio-line) 42%, transparent) 1px, transparent 1px); background-size: 3rem 3rem; content: ''; opacity: .5; -webkit-mask-image: linear-gradient(135deg, #000, transparent 78%); mask-image: linear-gradient(135deg, #000, transparent 78%); }
.project-list :deep(.project-placeholder-label) { color: color-mix(in srgb, var(--portfolio-text) 68%, transparent); }
.project-list :deep(.project-placeholder-number) { color: color-mix(in srgb, var(--portfolio-accent) 14%, transparent); font-size: clamp(7rem, 11vw, 10rem); }
.project-list :deep(.project-copy) { display: flex; min-width: 0; min-height: 0; grid-area: copy; align-items: center; padding: clamp(1.5rem, 3vw, 3rem); }
.project-list :deep(.project-title) { font-size: clamp(1.65rem, 2.4vw, 2.65rem); line-height: 1.25; white-space: normal; text-wrap: balance; }
.project-list :deep(.project-description) { display: -webkit-box; margin-top: 1rem; overflow: hidden; color: var(--portfolio-muted); font-size: clamp(.9rem, 1vw, 1.02rem); line-height: 1.85; white-space: normal; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
.project-list :deep(.project-role) { display: block; width: fit-content; margin-top: 1.25rem; padding-top: .85rem; border-top: 1px solid var(--portfolio-line); color: var(--portfolio-accent); font-size: .72rem; font-weight: 800; }
.project-list :deep(.project-reveal) { inset-inline-end: 1rem; inset-block-end: 1rem; }
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
  .project-list { gap: 1.25rem; padding-top: 1.5rem; }
  .project-list :deep(.project-card) { padding: .4rem .4rem 1rem; border-radius: 1.25rem; }
  .project-list :deep(.project-link), .project-list :deep(.project-card:nth-child(even) .project-link) { display: block; height: auto; min-height: 0; }
  .project-list :deep(.project-media), .project-list :deep(.project-card[data-layout] .project-media) { height: auto; aspect-ratio: 16 / 10 !important; border-radius: .95rem; }
  .project-list :deep(.project-copy) { padding: 1.15rem .85rem .2rem; }
  .project-list :deep(.project-title) { font-size: clamp(1.25rem, 6vw, 1.65rem); }
  .project-list :deep(.project-description) { margin-top: .55rem; font-size: .82rem; -webkit-line-clamp: 2; }
  .project-list :deep(.project-role) { display: block; margin-top: .8rem; padding-top: .65rem; font-size: .66rem; }
  .project-list :deep(.project-reveal) { display: none; }
}
</style>
