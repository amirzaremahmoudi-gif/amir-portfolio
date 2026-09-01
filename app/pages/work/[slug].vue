<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()
const path = computed(() => `/work/${route.params.slug}`)

const { data: project } = await useAsyncData(`project-${locale.value}-${route.params.slug}`, () => locale.value === 'fa' ? queryCollection('work_fa').path(path.value).first() : queryCollection('work_en').path(path.value).first(), { watch: [locale, path] })
if (!project.value) throw createError({ statusCode: 404, statusMessage: t('project.notFound') })

const { data: allProjects } = await useAsyncData(`project-navigation-${locale.value}`, () => locale.value === 'fa' ? queryCollection('work_fa').order('order', 'ASC').select('path', 'title').all() : queryCollection('work_en').order('order', 'ASC').select('path', 'title').all(), { watch: [locale] })
const currentIndex = computed(() => allProjects.value?.findIndex(item => item.path === path.value) ?? -1)
const previous = computed(() => currentIndex.value > 0 ? allProjects.value?.[currentIndex.value - 1] : null)
const next = computed(() => currentIndex.value >= 0 && currentIndex.value < (allProjects.value?.length || 0) - 1 ? allProjects.value?.[currentIndex.value + 1] : null)

useSeoMeta({
  title: () => `${project.value?.title} — ${t('project.caseStudySuffix')}`,
  description: () => project.value?.description,
  ogTitle: () => project.value?.title,
  ogDescription: () => project.value?.description
})
</script>

<template>
  <article v-if="project">
    <header class="portfolio-container pb-16 pt-36 md:pb-24 md:pt-48">
      <div class="grid gap-10 lg:grid-cols-12">
        <p class="eyebrow lg:col-span-3">
          {{ project.category }} · {{ project.year }}
        </p><div class="lg:col-span-8 lg:col-start-5">
          <h1 class="editorial-display text-[clamp(4rem,8vw,8rem)]">
            {{ project.title }}
          </h1><p class="mt-8 max-w-2xl text-xl leading-relaxed text-muted">
            {{ project.description }}
          </p>
        </div>
      </div>
      <div class="mt-16">
        <ProjectMeta
          :role="project.role"
          :timeline="project.timeline"
          :team="project.team"
          :industry="project.industry"
          :responsibilities="project.responsibilities"
        />
      </div>
    </header>

    <div class="portfolio-container">
      <div
        class="project-hero relative aspect-[16/9] overflow-hidden border border-default"
        :data-tone="project.coverTone"
      >
        <NuxtImg
          v-if="project.cover"
          :src="project.cover"
          :alt="project.coverAlt || ''"
          width="1800"
          height="1013"
          class="size-full object-cover"
        /><div
          v-else
          class="grid size-full place-items-center"
        >
          <span class="eyebrow text-black/60">{{ t('project.heroPlaceholder') }}</span>
        </div>
      </div>
    </div>

    <div class="portfolio-container py-[var(--portfolio-section)]">
      <div class="case-study-layout grid gap-14 lg:grid-cols-12">
        <aside class="hidden lg:col-span-3 lg:block">
          <div class="sticky top-28">
            <p class="eyebrow">
              {{ t('project.outline') }}
            </p><ol class="mt-5 space-y-3 text-sm text-muted">
              <li>{{ t('project.context') }}</li><li>{{ t('project.challenge') }}</li><li>{{ t('project.research') }}</li><li>{{ t('project.decisions') }}</li><li>{{ t('project.solution') }}</li><li>{{ t('project.validation') }}</li><li>{{ t('project.learnings') }}</li>
            </ol>
          </div>
        </aside>
        <div class="case-study-content lg:col-span-7 lg:col-start-5">
          <ContentRenderer :value="project" />
        </div>
      </div>
      <ProjectNavigation
        :previous="previous"
        :next="next"
        class="mt-[var(--portfolio-section)]"
      />
    </div>
  </article>
</template>

<style scoped>
.project-hero { background: #b56f45; }
.project-hero[data-tone='sage'] { background: #7d8772; }
.project-hero[data-tone='cobalt'] { background: #526278; }
.project-hero[data-tone='sand'] { background: #c6ac7c; }
.project-hero[data-tone='graphite'] { background: #62605b; }
.case-study-content :deep(h2) { margin-top: clamp(4rem, 8vw, 7rem); font-family: var(--font-serif); font-size: clamp(2.5rem, 5vw, 4.5rem); font-weight: 430; letter-spacing: -0.04em; line-height: .98; }
.case-study-content :deep(h3) { margin-top: 3rem; font-size: 1.35rem; font-weight: 650; letter-spacing: -0.02em; }
.case-study-content :deep(p) { margin-top: 1.4rem; font-size: 1.0625rem; line-height: 1.85; color: var(--portfolio-muted); }
.case-study-content :deep(ul) { margin-top: 1.5rem; list-style: none; border-top: 1px solid var(--portfolio-line); }
.case-study-content :deep(li) { border-bottom: 1px solid var(--portfolio-line); padding-block: 1rem; line-height: 1.6; }
.case-study-content :deep(strong) { color: var(--portfolio-text); font-weight: 650; }
</style>
