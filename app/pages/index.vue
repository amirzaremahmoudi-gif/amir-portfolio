<script setup lang="ts">
import { toranjInsuranceContent } from '~/data/toranjInsurance'

const { locale, t } = useI18n()
const localePath = useLocalePath()
const { expertise, profile } = usePortfolioContent()
const forwardIcon = computed(() => locale.value === 'fa' ? 'i-lucide-arrow-left' : 'i-lucide-arrow-right')
const heroSealSrc = computed(() => locale.value === 'fa' ? '/images/home/amir-zare-mobile-seal-bold.png' : '/images/home/amir-zare-mobile-seal-en.png')
const { data: projects } = await useAsyncData(`home-work-${locale.value}`, () => locale.value === 'fa' ? queryCollection('work_fa').all() : queryCollection('work_en').all(), { watch: [locale] })
const selectedProjects = computed(() => [...(projects.value || [])].sort((a, b) => a.order - b.order))
const caseContent = computed(() => toranjInsuranceContent[locale.value === 'fa' ? 'fa' : 'en'])
const featuredDecisionBodies = computed(() => [
  t('home.decisions.items.progressive'),
  t('home.decisions.items.identity'),
  t('home.decisions.items.hierarchy')
])
const featuredDecisions = computed(() => caseContent.value.decisions.items.slice(0, 3).map((decision, index) => ({
  ...decision,
  number: String(index + 1).padStart(2, '0'),
  body: featuredDecisionBodies.value[index]
})))
const workingSteps = computed(() => {
  const numbers = locale.value === 'fa' ? ['۰۱', '۰۲', '۰۳'] : ['01', '02', '03']
  return [
    { number: numbers[0], icon: 'i-lucide-focus', title: t('home.working.steps.frame') },
    { number: numbers[1], icon: 'i-lucide-blocks', title: t('home.working.steps.structure') },
    { number: numbers[2], icon: 'i-lucide-badge-check', title: t('home.working.steps.delivery') }
  ]
})
useSeoMeta({ title: () => t('home.seoTitle'), description: () => t('home.seoDescription'), ogTitle: () => t('home.seoTitle'), ogDescription: () => t('home.seoDescription') })
</script>

<template>
  <div>
    <section
      class="home-hero"
    >
      <HeroProductPattern />
      <div class="portfolio-container home-hero__mast">
        <div class="hero-intro motion-rise">
          <div class="hero-meta">
            <UIcon
              name="i-lucide-sparkles"
              class="hero-meta__ornament"
              aria-hidden="true"
            />
            <span class="hero-meta__role">{{ profile.title }}</span>
            <span
              class="hero-meta__separator"
              aria-hidden="true"
            >/</span>
            <span class="hero-meta__location">{{ profile.location }}</span>
          </div>
          <div class="hero-name-stage">
            <NuxtImg
              :src="heroSealSrc"
              alt=""
              width="640"
              height="640"
              class="hero-name-stage__art"
              aria-hidden="true"
            />
            <h1 class="hero-title">
              {{ profile.name }}
            </h1>
            <span class="hero-name-stage__location">{{ profile.location }}</span>
          </div>
          <p class="hero-positioning">
            {{ t('home.heroPositioning') }}
          </p>
        </div>

        <div class="home-hero__bottom motion-rise motion-rise-delay-1">
          <div class="hero-services">
            <div class="hero-services__head">
              <UIcon
                name="i-lucide-box"
                class="hero-services__icon"
                aria-hidden="true"
              />
              <p class="hero-services__label">
                {{ t('home.expertise') }}
              </p>
            </div>
            <MorphText
              :words="expertise.slice(0, 4)"
              :interval="1800"
            />
          </div>
          <nav
            class="hero-actions"
            :aria-label="t('nav.primary')"
          >
            <a
              href="#selected-work"
              class="hero-action"
            ><span>{{ t('home.selectedWork') }}</span><UIcon :name="forwardIcon" /></a>
            <NuxtLink
              :to="localePath('/about')"
              class="hero-action"
            ><span>{{ t('home.about') }}</span><UIcon :name="forwardIcon" /></NuxtLink>
          </nav>
        </div>
      </div>
    </section>

    <section
      id="selected-work"
      class="selected-work-section reveal-on-scroll section-divider"
      aria-labelledby="selected-work-title"
    >
      <div class="portfolio-container">
        <header class="selected-work-heading">
          <span
            class="selected-work-heading__count"
            aria-hidden="true"
          >{{ String(selectedProjects.length).padStart(2, '0') }}</span>
          <h2
            id="selected-work-title"
            class="selected-work-heading__title"
          >
            {{ t('home.selectedWork') }}
          </h2>
          <AsciiGlitchText
            :text="t('home.workDescription')"
            as="p"
            class="selected-work-heading__description"
          />
          <NuxtLink
            :to="localePath('/work')"
            class="selected-work-heading__link"
          >
            {{ t('home.viewAll') }}<UIcon :name="forwardIcon" />
          </NuxtLink>
        </header>

        <div class="selected-work-grid">
          <ProjectCard
            v-for="(project, index) in selectedProjects"
            :key="project.path"
            :project="project"
            :index="index"
            :eager="index === 0"
            layout="cinematic"
            hierarchy="secondary"
            :label="t('project.caseStudySuffix')"
          />
        </div>
      </div>
    </section>

    <section
      class="decision-showcase reveal-on-scroll section-divider"
      aria-labelledby="home-decisions-title"
    >
      <div class="portfolio-container">
        <header class="home-section-heading">
          <p class="eyebrow">
            {{ t('home.decisions.label') }}
          </p>
          <h2 id="home-decisions-title">
            {{ t('home.decisions.title') }}
          </h2>
          <p>{{ t('home.decisions.intro') }}</p>
        </header>

        <div class="decision-stories">
          <article
            v-for="decision in featuredDecisions"
            :key="decision.title"
            class="decision-story"
          >
            <div class="decision-story__copy">
              <span class="decision-story__number">{{ decision.number }}</span>
              <h3>{{ decision.title }}</h3>
              <p>{{ decision.body }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section
      class="working-method reveal-on-scroll section-divider"
      aria-labelledby="working-method-title"
    >
      <div class="portfolio-container">
        <header class="home-section-heading home-section-heading--wide">
          <p class="eyebrow">
            {{ t('home.working.label') }}
          </p>
          <h2 id="working-method-title">
            {{ t('home.working.title') }}
          </h2>
        </header>

        <ol class="working-method__steps">
          <li
            v-for="step in workingSteps"
            :key="step.number"
          >
            <span
              class="working-method__number"
              aria-hidden="true"
            >{{ step.number }}</span>
            <span class="working-method__icon">
              <UIcon
                :name="step.icon"
                aria-hidden="true"
              />
            </span>
            <h3>{{ step.title }}</h3>
          </li>
        </ol>
      </div>
    </section>

    <section
      class="about-preview reveal-on-scroll section-divider"
      aria-labelledby="about-preview"
    >
      <div class="portfolio-container about-preview__layout">
        <div class="about-preview__visual">
          <NuxtImg
            src="/images/amir-zare.png"
            :alt="profile.name"
            width="600"
            height="600"
            loading="lazy"
            class="about-preview__portrait"
          />
        </div>

        <div class="about-preview__content">
          <AsciiGlitchText
            :text="t('home.aboutLabel')"
            as="p"
            class="about-preview__label eyebrow"
          />
          <h2
            id="about-preview"
            class="about-preview__title"
          >
            {{ t('home.aboutHeadline') }}
          </h2>
          <AsciiGlitchText
            :text="t('home.aboutSummary')"
            as="p"
            class="about-preview__summary"
          />
          <NuxtLink
            :to="localePath('/about')"
            class="about-preview__link"
          >{{ t('home.moreAbout') }}<UIcon :name="forwardIcon" /></NuxtLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-hero { --hero-height: 100svh; position: relative; min-height: var(--hero-height); overflow: hidden; background: var(--portfolio-bg); isolation: isolate; }
.home-hero__mast { position: relative; z-index: 1; display: grid; grid-template-rows: minmax(0, 1fr) auto; width: 100%; min-height: var(--hero-height); padding-top: clamp(7rem, 12vh, 8.5rem); padding-bottom: clamp(2rem, 4vh, 3rem); }
.hero-intro { display: flex; min-width: 0; flex-direction: column; align-items: center; justify-content: center; padding-block: clamp(2rem, 5vh, 4rem); text-align: center; }
.hero-meta { display: flex; flex-wrap: wrap; align-items: center; justify-content: center; gap: .7rem 1.05rem; color: var(--portfolio-muted); font-size: clamp(1rem, 1.12vw, 1.12rem); font-weight: 500; text-align: center; }
.hero-meta__role { color: var(--portfolio-text); font-weight: 700; }
.hero-meta__separator { color: var(--portfolio-accent); }
.hero-meta__ornament, .hero-name-stage__art, .hero-name-stage__location, .hero-services__icon { display: none; }
.hero-name-stage { display: contents; }
.hero-title { max-width: none; margin-top: clamp(1.4rem, 2.6vh, 2.2rem); font-family: var(--font-display); font-size: clamp(4.5rem, 7.6vw, 7.6rem); font-weight: 700; letter-spacing: -.05em; line-height: .98; white-space: nowrap; }
.hero-positioning { max-width: none; margin-top: clamp(1.35rem, 2.8vh, 2.2rem); font-size: clamp(1.4rem, 1.9vw, 2rem); font-weight: 700; letter-spacing: -.02em; line-height: 1.5; text-align: center; text-wrap: balance; white-space: nowrap; }
.home-hero__bottom { display: flex; align-items: flex-end; justify-content: space-between; gap: clamp(2rem, 6vw, 6rem); padding-top: clamp(1.5rem, 3vh, 2.25rem); border-top: 1px solid var(--portfolio-line); }
.hero-services { display: flex; min-width: 0; flex-direction: column; align-items: flex-start; gap: .55rem; text-align: start; }
.hero-services__head { display: contents; }
.hero-services__label { color: var(--portfolio-muted); font-size: clamp(.84rem, .94vw, .94rem); font-weight: 600; text-align: start; white-space: nowrap; }
.hero-services :deep(.morph-text) { place-items: start; text-align: start; }
.hero-services :deep(.morph-text__word) { text-align: start; }
.hero-actions { display: flex; flex-wrap: wrap; flex: 0 0 auto; justify-content: flex-end; gap: 1rem 2.25rem; }
.hero-action { position: relative; display: inline-flex; min-height: 3rem; align-items: center; gap: .7rem; color: var(--portfolio-text); font-size: clamp(.9rem, 1vw, 1rem); font-weight: 700; cursor: pointer; }
.hero-action::after { position: absolute; inset-inline: 0; bottom: .1rem; height: 1px; background: var(--portfolio-accent); content: ''; transform: scaleX(.16); transform-origin: inline-start; transition: transform var(--motion-content) var(--ease-enter); }
.hero-action svg { color: var(--portfolio-accent); transition: transform var(--motion-control) var(--ease-enter); }
.hero-action:hover::after, .hero-action:focus-visible::after { transform: scaleX(1); }
.hero-action:hover svg, .hero-action:focus-visible svg { transform: translateX(-.3rem); }
[dir='ltr'] .hero-action:hover svg, [dir='ltr'] .hero-action:focus-visible svg { transform: translateX(.3rem); }
[lang='fa'] .hero-title { font-size: clamp(4.4rem, 7.35vw, 7.35rem); font-weight: 900; letter-spacing: -.018em; line-height: 1.06; }
[lang='fa'] .hero-positioning { letter-spacing: -.01em; line-height: 1.62; }
.selected-work-section { position: relative; padding-block: clamp(4.5rem, 7vw, 7.5rem); overflow: hidden; background: linear-gradient(180deg, color-mix(in srgb, var(--portfolio-surface) 58%, var(--portfolio-bg)), var(--portfolio-bg)); isolation: isolate; }
.selected-work-section::before { position: absolute; inset: 0; z-index: -1; pointer-events: none; background-image: radial-gradient(circle at 82% 8%, color-mix(in srgb, var(--portfolio-accent) 12%, transparent), transparent 26%), radial-gradient(circle, color-mix(in srgb, var(--portfolio-line) 58%, transparent) 1px, transparent 1.2px); background-size: 100% 100%, 1.75rem 1.75rem; content: ''; opacity: .7; -webkit-mask-image: linear-gradient(180deg, #000, transparent 82%); mask-image: linear-gradient(180deg, #000, transparent 82%); }
.selected-work-section::after { position: absolute; inset-inline: var(--portfolio-gutter); bottom: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--portfolio-line) 10%, var(--portfolio-line) 90%, transparent); content: ''; }
.selected-work-heading { display: grid; grid-template-areas: 'count link' 'title link' 'description link'; grid-template-columns: minmax(0, 1fr) auto; align-items: center; gap: .4rem clamp(1rem, 2.2vw, 2.25rem); }
.selected-work-heading__count { display: inline-flex; grid-area: count; width: fit-content; align-items: center; gap: .7rem; color: var(--portfolio-accent); font-family: var(--font-display); font-size: .78rem; font-weight: 800; }
.selected-work-heading__count::after { width: 2.5rem; height: 1px; background: var(--portfolio-accent); content: ''; opacity: .7; }
.selected-work-heading__title { grid-area: title; font-family: var(--font-display); font-size: clamp(2.2rem, 3.2vw, 3.4rem); font-weight: 700; letter-spacing: -.04em; line-height: 1.08; white-space: nowrap; }
.selected-work-heading__description { grid-area: description; max-width: 45rem; color: var(--portfolio-muted); font-size: clamp(.95rem, 1.05vw, 1.08rem); line-height: 1.75; }
.selected-work-heading__link { position: relative; display: inline-flex; grid-area: link; min-height: 2.75rem; align-items: center; gap: .6rem; font-size: clamp(.92rem, 1vw, 1.02rem); font-weight: 700; white-space: nowrap; }
.selected-work-heading__link::after { position: absolute; inset-inline: 0; bottom: .15rem; height: 1px; background: var(--portfolio-accent); content: ''; transform: scaleX(.18); transform-origin: inline-start; transition: transform var(--motion-content) var(--ease-enter); }
.selected-work-heading__link:hover::after, .selected-work-heading__link:focus-visible::after { transform: scaleX(1); }
.selected-work-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(1rem, 2vw, 1.75rem); margin-top: clamp(2.5rem, 4vw, 4rem); }
.selected-work-grid :deep(.project-card) { position: relative; min-width: 0; padding: .55rem .55rem 1.1rem; overflow: clip; border: 1px solid color-mix(in srgb, var(--portfolio-line) 88%, transparent); border-radius: 1.55rem; background: color-mix(in srgb, var(--portfolio-surface) 82%, transparent); box-shadow: 0 1.5rem 4rem rgb(0 0 0 / 8%); transition: border-color var(--motion-content) var(--ease-standard), box-shadow var(--motion-content) var(--ease-standard), transform var(--motion-content) var(--ease-enter); backdrop-filter: blur(12px); }
.selected-work-grid :deep(.project-card::after) { position: absolute; inset-inline: 1.5rem; bottom: -.08rem; height: .18rem; border-radius: 999px; background: var(--portfolio-accent); content: ''; opacity: 0; transform: scaleX(.35); transition: opacity var(--motion-control), transform var(--motion-content) var(--ease-enter); }
.selected-work-grid :deep(.project-card:hover), .selected-work-grid :deep(.project-card:focus-within) { border-color: color-mix(in srgb, var(--portfolio-accent) 42%, var(--portfolio-line)); box-shadow: 0 2rem 5rem rgb(0 0 0 / 14%); transform: translateY(-.35rem); }
.selected-work-grid :deep(.project-card:hover::after), .selected-work-grid :deep(.project-card:focus-within::after) { opacity: 1; transform: scaleX(1); }
.selected-work-grid :deep(.project-link) { width: 100%; min-width: 0; height: 100%; }
.selected-work-grid :deep(.project-card[data-layout='cinematic'] .project-media) { aspect-ratio: 16 / 10; overflow: hidden; border-radius: 1.15rem; box-shadow: none; }
.selected-work-grid :deep(.project-media img) { object-fit: cover; }
.selected-work-grid :deep(.project-media), .selected-work-grid :deep(.project-card:hover .project-media), .selected-work-grid :deep(.project-card:focus-within .project-media) { transform: none; }
.selected-work-grid :deep(.project-card:hover .project-media img), .selected-work-grid :deep(.project-card:focus-within .project-media img), .selected-work-grid :deep(.project-card:hover .project-placeholder), .selected-work-grid :deep(.project-card:focus-within .project-placeholder) { transform: none; }
.selected-work-grid :deep(.project-glow) { border-radius: inherit; }
.selected-work-grid :deep(.project-placeholder) { background: radial-gradient(circle at 22% 18%, color-mix(in srgb, var(--portfolio-accent) 34%, transparent), transparent 30%), linear-gradient(140deg, color-mix(in srgb, var(--portfolio-surface) 84%, #151922), color-mix(in srgb, var(--portfolio-accent) 18%, var(--portfolio-bg))); }
.selected-work-grid :deep(.project-placeholder::before) { position: absolute; inset: 0; background-image: linear-gradient(color-mix(in srgb, var(--portfolio-line) 45%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--portfolio-line) 45%, transparent) 1px, transparent 1px); background-size: 3rem 3rem; content: ''; opacity: .55; -webkit-mask-image: linear-gradient(135deg, #000, transparent 76%); mask-image: linear-gradient(135deg, #000, transparent 76%); }
.selected-work-grid :deep(.project-placeholder-label) { color: color-mix(in srgb, var(--portfolio-text) 68%, transparent); }
.selected-work-grid :deep(.project-placeholder-number) { color: color-mix(in srgb, var(--portfolio-accent) 14%, transparent); font-size: clamp(7rem, 11vw, 10rem); }
.selected-work-grid :deep(.project-copy) { padding: 1.2rem 1rem .2rem; }
.selected-work-grid :deep(.project-title) { overflow: hidden; font-size: clamp(1.3rem, 1.7vw, 1.75rem); font-weight: 800; text-overflow: ellipsis; white-space: nowrap; }
.selected-work-grid :deep(.project-description) { display: -webkit-box; min-height: 3.6em; margin-top: .55rem; overflow: hidden; color: var(--portfolio-muted); font-size: clamp(.82rem, .9vw, .94rem); line-height: 1.8; white-space: normal; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
.selected-work-grid :deep(.project-role) { display: block; width: fit-content; margin-top: 1rem; padding-top: .75rem; border-top: 1px solid var(--portfolio-line); color: var(--portfolio-accent); font-size: .68rem; font-weight: 750; }
.decision-showcase, .working-method { position: relative; padding-block: clamp(4rem, 7vw, 7rem); overflow: hidden; }
.home-section-heading { width: min(100%, 55rem); margin-inline-start: auto; }
.home-section-heading--wide { width: min(100%, 64rem); }
.home-section-heading .eyebrow { color: var(--portfolio-accent); font-size: .78rem; font-weight: 700; }
.home-section-heading h2 { margin-top: .75rem; font-family: var(--font-display); font-size: clamp(2.15rem, 4vw, 4.5rem); font-weight: 700; letter-spacing: -.045em; line-height: 1.08; text-wrap: balance; }
.home-section-heading > p:last-child { max-width: 48rem; margin-top: .85rem; color: var(--portfolio-muted); font-size: clamp(.92rem, 1.05vw, 1.08rem); line-height: 1.8; }
.decision-showcase { padding-block: clamp(3.25rem, 4.75vw, 5rem); background: linear-gradient(180deg, color-mix(in srgb, var(--portfolio-surface) 72%, var(--portfolio-bg)), color-mix(in srgb, var(--portfolio-surface) 42%, var(--portfolio-bg))); isolation: isolate; }
.decision-showcase::before { position: absolute; inset: 0; z-index: -1; pointer-events: none; background-image: radial-gradient(circle, color-mix(in srgb, var(--portfolio-line) 82%, transparent) 1px, transparent 1.25px), radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--portfolio-accent) 9%, transparent), transparent 45%); background-size: 1.5rem 1.5rem, 100% 100%; content: ''; -webkit-mask-image: linear-gradient(90deg, transparent 2%, #000 24%, #000 76%, transparent 98%); mask-image: linear-gradient(90deg, transparent 2%, #000 24%, #000 76%, transparent 98%); opacity: .62; }
.decision-showcase .home-section-heading { display: block; width: min(100%, 72rem); margin-inline: auto; text-align: center; }
.decision-showcase .home-section-heading h2 { font-size: clamp(2.15rem, 3.15vw, 3.65rem); white-space: nowrap; }
.decision-showcase .home-section-heading > p:last-child { max-width: 48rem; margin: .8rem auto 0; }
.decision-stories { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: clamp(2rem, 3vw, 3rem); border-block: 1px solid var(--portfolio-line); }
.decision-story { min-width: 0; padding: clamp(1.5rem, 2.3vw, 2.4rem); }
.decision-story + .decision-story { border-inline-start: 1px solid var(--portfolio-line); }
.decision-story__copy { max-width: 25rem; margin-inline: auto; text-align: center; }
.decision-story__number { display: inline-flex; align-items: center; justify-content: center; gap: .65rem; color: var(--portfolio-accent); font-family: var(--font-display); font-size: .82rem; font-weight: 700; }
.decision-story__number::after { width: 1.5rem; height: 1px; background: var(--portfolio-accent); content: ''; opacity: .75; }
.decision-story h3 { margin-top: 1rem; font-family: var(--font-display); font-size: clamp(1.25rem, 1.55vw, 1.7rem); font-weight: 700; letter-spacing: -.025em; line-height: 1.25; text-wrap: balance; }
.decision-story__copy > p { margin-top: .7rem; color: var(--portfolio-muted); font-size: clamp(.82rem, .9vw, .94rem); line-height: 1.75; }
.working-method { padding-block: clamp(3.5rem, 5vw, 5.5rem); background: var(--portfolio-working-bg); isolation: isolate; }
.working-method .home-section-heading { width: 100%; max-width: 72rem; margin-inline: auto; text-align: center; }
.working-method .home-section-heading h2 { font-size: clamp(2.25rem, 3.4vw, 4rem); white-space: nowrap; }
.working-method__steps { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: clamp(1.5rem, 2.4vw, 2.25rem); border-block: 1px solid var(--portfolio-line); list-style: none; }
.working-method__steps li { position: relative; display: grid; min-width: 0; min-height: clamp(13rem, 17vw, 16rem); place-items: center; align-content: center; padding: clamp(1.25rem, 2vw, 2rem); overflow: hidden; text-align: center; isolation: isolate; }
.working-method__steps li + li { border-inline-start: 1px solid var(--portfolio-line); }
.working-method__number { position: absolute; inset: 50% auto auto 50%; z-index: -1; color: transparent; font-family: var(--font-display); font-size: clamp(9rem, 14vw, 14rem); font-weight: 900; letter-spacing: -.09em; line-height: .8; opacity: .82; transform: translate(-50%, -52%); animation: working-number-drift 7s ease-in-out infinite; -webkit-text-stroke: 1px color-mix(in srgb, var(--portfolio-text) 30%, transparent); user-select: none; }
.working-method__steps li:nth-child(2) .working-method__number { animation-delay: -2.3s; }
.working-method__steps li:nth-child(3) .working-method__number { animation-delay: -4.6s; }
.working-method__icon { display: grid; width: 3.5rem; height: 3.5rem; place-items: center; border-radius: 50%; color: var(--portfolio-accent); background: color-mix(in srgb, var(--portfolio-accent) 13%, var(--portfolio-surface)); box-shadow: 0 .85rem 2rem color-mix(in srgb, var(--portfolio-accent) 14%, transparent); transition: transform var(--motion-content) var(--ease-enter), background-color var(--motion-content) var(--ease-standard); }
.working-method__icon :deep(svg) { width: 1.35rem; height: 1.35rem; stroke-width: 1.8; }
.working-method__steps h3 { max-width: 18rem; margin-top: 1.15rem; font-family: var(--font-display); font-size: clamp(1.2rem, 1.45vw, 1.6rem); font-weight: 700; letter-spacing: -.025em; line-height: 1.3; text-wrap: balance; }
.working-method__steps li:hover .working-method__icon { background: color-mix(in srgb, var(--portfolio-accent) 20%, var(--portfolio-surface)); transform: translateY(-.25rem); }
.working-method__steps li:hover .working-method__number { opacity: .9; -webkit-text-stroke-color: color-mix(in srgb, var(--portfolio-accent) 25%, var(--portfolio-line)); }
@keyframes working-number-drift { 0%, 100% { opacity: .78; translate: 0 0; } 50% { opacity: .9; translate: 0 -.28rem; } }
@keyframes working-number-drift-mobile { 0%, 100% { opacity: .46; translate: 0 0; } 50% { opacity: .56; translate: 0 -.18rem; } }
[lang='fa'] .selected-work-heading__title { font-weight: 900; letter-spacing: -.01em; line-height: 1.25; }
[lang='fa'] .selected-work-grid :deep(.project-title) { font-weight: 900; }
[lang='fa'] .selected-work-heading__description { line-height: 1.85; }
[lang='fa'] .home-section-heading h2, [lang='fa'] .decision-story h3, [lang='fa'] .working-method__steps h3 { font-weight: 900; letter-spacing: -.012em; }
[lang='fa'] .home-section-heading h2 { line-height: 1.3; }
[lang='fa'] .decision-story h3 { line-height: 1.4; }
.about-preview { position: relative; overflow: hidden; padding-block: clamp(2rem, 3vw, 3rem); isolation: isolate; }
.about-preview::before { position: absolute; inset: 0; z-index: -1; background: radial-gradient(circle at 15% 20%, color-mix(in srgb, var(--portfolio-accent) 7%, transparent), transparent 30%); content: ''; }
.about-preview__layout { display: grid; grid-template-columns: minmax(15rem, 19rem) minmax(0, 1fr); align-items: center; gap: clamp(2rem, 4vw, 4.5rem); }
.about-preview__visual { position: relative; height: clamp(17rem, 22vw, 20rem); padding: .45rem; border: 1px solid color-mix(in srgb, var(--portfolio-accent) 52%, var(--portfolio-line)); border-radius: 1.25rem; background: color-mix(in srgb, var(--portfolio-surface) 86%, transparent); box-shadow: 0 1.25rem 3rem rgb(0 0 0 / 12%); }
.about-preview__visual::before { position: absolute; inset: -.5rem .75rem .75rem -.5rem; z-index: -1; border: 1px solid color-mix(in srgb, var(--portfolio-accent) 30%, transparent); border-radius: inherit; content: ''; }
.about-preview__visual::after { position: absolute; inset-inline-end: -.22rem; bottom: 2.25rem; width: .45rem; height: 3.25rem; border-radius: 999px; background: var(--portfolio-accent); content: ''; }
.about-preview__portrait { width: 100%; height: 100%; border-radius: .9rem; object-fit: cover; object-position: center top; transition: transform var(--motion-cinematic) var(--ease-enter), filter var(--motion-content) var(--ease-standard); }
.about-preview__visual:hover .about-preview__portrait { filter: saturate(1.05); transform: scale(1.025); }
.about-preview__content { min-width: 0; }
.about-preview__label { color: var(--portfolio-accent); font-size: clamp(.9rem, 1vw, 1rem); font-weight: 700; }
.about-preview__title { width: 100%; max-width: 21ch; margin-top: .65rem; font-family: var(--font-display); font-size: clamp(2.25rem, 3.4vw, 3.65rem); font-weight: 700; letter-spacing: -.045em; line-height: 1.08; text-wrap: balance; }
.about-preview__summary { max-width: 49rem; margin-top: clamp(.85rem, 1.4vw, 1.25rem); color: var(--portfolio-muted); font-size: clamp(.98rem, 1.05vw, 1.1rem); line-height: 1.75; }
.about-preview__link { position: relative; display: inline-flex; min-height: 2.75rem; align-items: center; gap: .65rem; margin-top: clamp(1rem, 1.5vw, 1.5rem); font-size: clamp(.92rem, 1vw, 1.02rem); font-weight: 700; }
.about-preview__link::after { position: absolute; inset-inline: 0; bottom: .05rem; height: 1px; background: var(--portfolio-accent); content: ''; transform: scaleX(.2); transform-origin: inline-start; transition: transform var(--motion-content) var(--ease-enter); }
.about-preview__link:hover::after, .about-preview__link:focus-visible::after { transform: scaleX(1); }
[lang='fa'] .about-preview__title { max-width: 18em; font-weight: 900; letter-spacing: -.012em; line-height: 1.22; }
[lang='fa'] .about-preview__summary { line-height: 1.85; }
@media (max-width: 1100px) { .selected-work-heading__description { white-space: normal; } }
@media (max-width: 900px) { .hero-positioning { white-space: normal; } .working-method .home-section-heading h2 { white-space: normal; } .about-preview__layout { grid-template-columns: minmax(13rem, 16rem) minmax(0, 1fr); gap: 2rem; } .about-preview__visual { height: 17rem; } .about-preview__title { font-size: clamp(2rem, 4.8vw, 2.8rem); } }
@media (max-width: 767px) {
  .home-hero { --hero-height: max(44rem, 80svh); min-height: var(--hero-height); }
  .home-hero__mast { display: flex; min-height: var(--hero-height); flex-direction: column; justify-content: center; padding-top: 6.5rem; padding-bottom: 2.5rem; }
  .hero-intro { align-items: center; justify-content: center; padding: 0; text-align: center; }
  .hero-meta { flex-direction: column; justify-content: center; gap: 0; font-size: .9rem; line-height: 1.6; text-align: center; }
  .hero-meta__ornament { display: none; }
  .hero-meta__role { padding-bottom: .38rem; border-bottom: 1px solid color-mix(in srgb, var(--portfolio-accent) 72%, transparent); color: color-mix(in srgb, var(--portfolio-text) 92%, var(--portfolio-accent)); font-size: 1.05rem; font-weight: 800; letter-spacing: -.01em; }
  .hero-meta__separator { display: none; }
  .hero-meta__location { display: none; }
  .hero-name-stage { position: relative; display: grid; width: min(82vw, 20rem); aspect-ratio: 1; place-items: center; overflow: visible; margin-top: 1rem; border-radius: 50%; background: transparent; isolation: isolate; }
  .hero-name-stage::before, .hero-name-stage::after { position: absolute; z-index: 0; border-radius: 50%; content: ''; pointer-events: none; will-change: transform; }
  .hero-name-stage::before { inset: -.55rem; background: conic-gradient(from 20deg, transparent 0 14%, color-mix(in srgb, var(--portfolio-accent) 62%, transparent) 18%, transparent 25% 59%, color-mix(in srgb, var(--portfolio-text) 30%, transparent) 64%, transparent 71% 88%, color-mix(in srgb, var(--portfolio-accent) 45%, transparent) 92%, transparent 98%); mask: radial-gradient(farthest-side, transparent calc(100% - 1.2px), #000 calc(100% - .8px)); animation: hero-seal-orbit 17s linear infinite; }
  .hero-name-stage::after { inset: -.48rem; background: radial-gradient(circle at 50% 0, var(--portfolio-accent) 0 2px, color-mix(in srgb, var(--portfolio-accent) 34%, transparent) 2.4px, transparent 4.8px); opacity: .82; animation: hero-seal-orbit 9s linear infinite reverse; filter: drop-shadow(0 0 .28rem color-mix(in srgb, var(--portfolio-accent) 38%, transparent)); }
  .hero-name-stage__art { position: relative; z-index: 1; display: block; width: 100%; height: 100%; border-radius: 50%; object-fit: contain; }
  :global(.light .hero-name-stage__art) { filter: brightness(0); }
  :global(.dark .hero-name-stage__art) { filter: none; }
  .hero-title { position: absolute; width: 1px; height: 1px; padding: 0; border: 0; margin: -1px; clip: rect(0, 0, 0, 0); overflow: hidden; white-space: nowrap; }
  [lang='fa'] .hero-title { font-size: 1px; line-height: 1; }
  .hero-name-stage__location { display: none; }
  .hero-positioning { width: min(100%, 22rem); max-width: none; margin-top: 1.35rem; color: color-mix(in srgb, var(--portfolio-text) 76%, var(--portfolio-muted)); font-size: clamp(.88rem, 4vw, 1rem); font-weight: 500; line-height: 1.9; text-align: center; text-wrap: balance; }
  [lang='fa'] .hero-positioning { line-height: 1.85; }
  .home-hero__bottom { display: flex; width: 100%; flex-direction: column; align-items: center; gap: 1.65rem; margin-top: 2rem; padding-top: 1.35rem; border-top-color: color-mix(in srgb, var(--portfolio-line) 66%, transparent); }
  .hero-services { width: 100%; align-items: center; gap: .75rem; text-align: center; }
  .hero-services__head { display: flex; align-items: center; justify-content: center; gap: .6rem; }
  .hero-services__label { color: var(--portfolio-muted); font-size: .82rem; font-weight: 600; letter-spacing: .01em; text-align: center; }
  .hero-services__icon { display: block; width: 1.45rem; height: 1.45rem; padding: .28rem; border-radius: .45rem; background: var(--portfolio-accent-soft); box-shadow: 0 .45rem 1rem color-mix(in srgb, var(--portfolio-accent) 12%, transparent); color: var(--portfolio-accent-hover); }
  .hero-services :deep(.morph-text) { display: inline-grid; width: 100%; min-height: 1.75em; place-items: center; color: var(--portfolio-text); font-size: clamp(1rem, 4.7vw, 1.18rem); font-weight: 900; text-align: center; }
  .hero-services :deep(.morph-text__measure), .hero-services :deep(.morph-text__word) { white-space: nowrap; text-align: center; }
  .hero-actions { align-self: center; justify-content: center; gap: .5rem 2rem; }
  .hero-action { min-height: 2.5rem; gap: .4rem; font-size: .84rem; }
  .hero-action svg { width: .9rem; height: .9rem; }
  .selected-work-section { padding-block: 3.5rem; }
  .selected-work-heading { grid-template-areas: 'count' 'title' 'description' 'link'; grid-template-columns: minmax(0, 1fr); gap: .65rem; }
  .selected-work-heading__title { font-size: clamp(1.85rem, 8.5vw, 2.45rem); }
  .selected-work-heading__description { font-size: .88rem; line-height: 1.75; }
  .selected-work-heading__link { justify-self: start; }
  .selected-work-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.5rem .75rem; margin-top: 1.5rem; }
  .selected-work-grid :deep(.project-card[data-layout='cinematic'] .project-media) { aspect-ratio: 4 / 3; }
  .selected-work-grid :deep(.project-title) { font-size: 1rem; }
  .decision-showcase, .working-method { padding-block: 3.5rem; }
  .home-section-heading { margin-inline: 0; }
  .home-section-heading h2 { font-size: clamp(1.9rem, 7vw, 2.7rem); }
  .decision-showcase { padding-block: 2.75rem; }
  .decision-showcase .home-section-heading { display: block; }
  .decision-showcase .home-section-heading h2 { font-size: clamp(1.9rem, 7vw, 2.7rem); white-space: normal; }
  .decision-showcase .home-section-heading > p:last-child { margin-top: .7rem; }
  .decision-stories { grid-template-columns: 1fr; margin-top: 1.75rem; }
  .decision-story { padding: 1.35rem .25rem; }
  .decision-story + .decision-story { border-top: 1px solid var(--portfolio-line); border-inline-start: 0; }
  .decision-story__copy { max-width: 38rem; }
  .working-method::after { display: none; }
  .working-method__steps { grid-template-columns: 1fr; }
  .working-method__steps li { min-height: 8.75rem; padding: 1.25rem 1rem; }
  .working-method__steps li + li { border-top: 1px solid var(--portfolio-line); border-inline-start: 0; }
  .working-method__number { inset: 50% auto auto 50%; font-size: clamp(6.5rem, 30vw, 9rem); opacity: .5; transform: translate(-50%, -52%); animation-name: working-number-drift-mobile; -webkit-text-stroke-color: color-mix(in srgb, var(--portfolio-text) 22%, transparent); }
  .working-method__icon { width: 2.65rem; height: 2.65rem; }
  .working-method__steps h3 { margin-top: .75rem; }
  .about-preview { padding-block: 1.5rem 1.75rem; }
  .about-preview__layout { position: relative; grid-template-columns: 1fr; align-items: start; gap: 1rem; }
  .about-preview__visual { width: 100%; height: auto; aspect-ratio: auto; align-self: start; justify-self: stretch; padding: .25rem; border: 0; border-radius: 1.2rem; background: color-mix(in srgb, var(--portfolio-surface) 88%, transparent); box-shadow: 0 1.2rem 3rem rgb(0 0 0 / 18%); }
  .about-preview__visual::before { display: none; }
  .about-preview__visual::after { inset-inline-end: 1rem; bottom: -.12rem; width: 3rem; height: .25rem; }
  .about-preview__portrait { display: block; width: 100%; height: auto; border-radius: .95rem; object-fit: contain; object-position: center; }
  .about-preview__content { position: relative; padding-inline: .25rem; text-align: center; }
  .about-preview__label { position: absolute; inset-inline-start: .9rem; top: -3.7rem; padding: .42rem .7rem; border-radius: .7rem; color: #fff; background: rgb(10 13 18 / 78%); box-shadow: 0 .65rem 1.5rem rgb(0 0 0 / 20%); backdrop-filter: blur(12px); }
  .about-preview__title { max-width: 17ch; margin: 0 auto; font-size: clamp(1.45rem, 5.8vw, 2.1rem); line-height: 1.35; text-align: center; }
  .about-preview__summary { display: block; max-width: 38rem; max-height: 3.5em; overflow: hidden; margin: .6rem auto 0; font-size: .82rem; line-height: 1.75; text-align: center; }
  .about-preview__link { min-height: 2rem; justify-content: center; gap: .4rem; margin-top: .55rem; font-size: .8rem; }
}
@media (max-width: 480px) {
  .selected-work-section { padding-block: 1.35rem 1.75rem; }
  .selected-work-heading { grid-template-areas: 'count' 'title' 'description' 'link'; grid-template-columns: minmax(0, 1fr); justify-items: center; gap: .35rem; text-align: center; }
  .selected-work-heading__count::before { width: 2.5rem; height: 1px; background: var(--portfolio-accent); content: ''; opacity: .7; }
  .selected-work-heading__title { font-size: clamp(1.65rem, 8vw, 2rem); }
  .selected-work-heading__description { display: -webkit-box; width: 100%; max-width: none; overflow: hidden; font-size: .78rem; line-height: 1.65; text-align: center; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
  .selected-work-heading__link { min-height: 2rem; justify-self: center; margin-top: .1rem; font-size: .78rem; }
  .selected-work-grid { display: grid; width: 100%; grid-template-columns: minmax(0, 1fr); margin-top: 1rem; overflow: visible; }
  .selected-work-grid :deep(.project-card) { width: 100%; min-width: 0; }
  .selected-work-grid :deep(.project-media) { width: 100%; aspect-ratio: 1637 / 960; box-shadow: 0 .85rem 2rem rgb(0 0 0 / 10%); }
  .selected-work-grid :deep(.project-media img) { object-fit: cover; object-position: center; }
  .selected-work-grid :deep(.project-copy) { padding-top: .7rem; }
  .selected-work-grid :deep(.project-title) { font-size: .92rem; }
  .selected-work-grid :deep(.project-placeholder-label) { inset-block-start: 1rem; inset-inline-start: 1rem; font-size: .62rem; }
  .selected-work-grid :deep(.project-placeholder-number) { font-size: 5rem; }
  .selected-work-grid :deep(.project-reveal) { display: none; }
  .decision-showcase, .working-method { padding-block: 2.75rem; }
  .decision-showcase { padding-block: 2.25rem; }
  .home-section-heading { text-align: start; }
  .working-method .home-section-heading { text-align: center; }
  .home-section-heading .eyebrow { font-size: .68rem; }
  .home-section-heading h2 { margin-top: .5rem; font-size: clamp(1.55rem, 7.8vw, 2.05rem); }
  .home-section-heading > p:last-child { margin-top: .6rem; font-size: .8rem; line-height: 1.75; }
  .decision-stories { margin-top: 1.35rem; }
  .decision-story { padding: 1.1rem 0; }
  .decision-story__number { font-size: .7rem; }
  .decision-story h3 { margin-top: .55rem; font-size: 1.1rem; }
  .decision-story__copy > p { margin-top: .4rem; font-size: .78rem; line-height: 1.7; }
  .working-method__steps { margin-top: 1.75rem; }
  .working-method__steps h3 { font-size: 1.05rem; }
  .about-preview { padding-block: 1.15rem 1.5rem; }
  .about-preview__layout { gap: .85rem; }
  .about-preview__title { max-width: 18ch; overflow: visible; font-size: 1.08rem; line-height: 1.6; }
  .about-preview__summary { max-height: 3.4em; font-size: .76rem; line-height: 1.7; }
  .about-preview__label { top: -3.35rem; font-size: .72rem; }
  .about-preview__link { font-size: .75rem; }
}
@media (max-width: 380px) { .hero-name-stage { width: min(80vw, 18.5rem); } .hero-actions { gap: .5rem 1.35rem; } }
@keyframes hero-seal-orbit { to { transform: rotate(1turn); } }
@media (prefers-reduced-motion: reduce) { .hero-action::after, .hero-action svg, .selected-work-heading__link::after, .about-preview__portrait, .about-preview__link::after, .working-method__icon { transition: none; } .working-method__number, .hero-name-stage::before, .hero-name-stage::after { animation: none; } .hero-action:hover svg, .hero-action:focus-visible svg, .about-preview__visual:hover .about-preview__portrait, .working-method__steps li:hover .working-method__icon { transform: none; } }
</style>
