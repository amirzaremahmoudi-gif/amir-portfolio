<script setup lang="ts">
import { vistaCaseStudyContent } from '~/data/vistaCaseStudy'

const { locale } = useI18n()
const content = computed(() => vistaCaseStudyContent[locale.value === 'fa' ? 'fa' : 'en'])
const outlineSectionIds = ['project-context', 'challenge', 'role-scope', 'users-needs', 'ux-decisions', 'risk-assessment', 'service-pages', 'design-foundations', 'outcome-reflection']
const outlineSections = computed(() => content.value.sections.filter(section => outlineSectionIds.includes(section[0] || '')))
const activeSection = ref('project-context')
const outlineList = useTemplateRef<HTMLOListElement>('outlineList')
const mediaDialog = useTemplateRef<HTMLDialogElement>('mediaDialog')
const expandedMedia = ref<{ src: string, alt: string, height: number } | null>(null)
let sectionObserver: IntersectionObserver | undefined

function openMedia(src: string, alt: string, height: number) {
  expandedMedia.value = { src, alt, height }
  mediaDialog.value?.showModal()
}

function closeMedia() {
  mediaDialog.value?.close()
}

function heading(id: string) {
  const item = content.value.sections.find(section => section[0] === id)
  return { index: item?.[1] || '', title: item?.[2] || '' }
}

function setActiveSection(id?: string) {
  if (id) activeSection.value = id
}

onMounted(() => {
  sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
    const id = visible[0]?.target.id
    if (id) activeSection.value = id
  }, { rootMargin: '-18% 0px -68% 0px' })
  outlineSectionIds.forEach((id) => {
    const section = document.getElementById(id)
    if (section) sectionObserver?.observe(section)
  })
})

watch(activeSection, async (section) => {
  await nextTick()
  const list = outlineList.value
  const link = list?.querySelector<HTMLElement>(`[data-section="${section}"]`)
  if (!list || !link) return
  const listRect = list.getBoundingClientRect()
  const linkRect = link.getBoundingClientRect()
  list.scrollBy({ left: linkRect.left + linkRect.width / 2 - listRect.left - listRect.width / 2, behavior: 'smooth' })
})

onBeforeUnmount(() => sectionObserver?.disconnect())
</script>

<template>
  <article class="vista-case">
    <CaseStudyHero
      :eyebrow="locale === 'fa' ? 'مطالعه موردی · طراحی محصول مالی' : 'Case study · Fintech product design'"
      :title="content.hero.title"
      :summary="content.hero.description"
      :meta="content.hero.meta"
      :media="content.hero.media"
    />

    <div class="portfolio-container method-wrap">
      <aside class="method-note">
        <span class="method-note__icon">
          <UIcon
            name="i-lucide-badge-check"
            aria-hidden="true"
          />
        </span>
        <div>
          <strong>{{ locale === 'fa' ? 'درباره این مطالعه' : 'About this case study' }}</strong>
          <p>{{ content.methodNote }}</p>
        </div>
      </aside>
    </div>

    <div class="portfolio-container case-shell py-[var(--portfolio-section)]">
      <nav
        class="case-outline"
        :aria-label="content.outlineLabel"
      >
        <p class="eyebrow">
          {{ content.outlineLabel }}
        </p>
        <ol ref="outlineList">
          <li
            v-for="section in outlineSections"
            :key="section[0]"
          >
            <a
              :href="`#${section[0]}`"
              :data-section="section[0]"
              :class="{ 'is-active': activeSection === section[0] }"
              :aria-current="activeSection === section[0] ? 'location' : undefined"
              @click="setActiveSection(section[0])"
            ><span>{{ section[1] }}</span>{{ section[2] }}</a>
          </li>
        </ol>
      </nav>

      <main class="case-main">
        <section
          id="project-context"
          class="case-section reveal-section"
        >
          <SectionHeading v-bind="heading('project-context')" />
          <div class="split-copy">
            <p class="case-lead">
              {{ content.overview.intro }}
            </p><p>{{ content.overview.body }}</p>
          </div>
          <figure class="vista-media vista-media--overview">
            <div class="vista-window">
              <div class="vista-window__bar">
                <i /><span>{{ content.overview.visual.label }}</span>
              </div>
              <NuxtImg
                :src="content.overview.visual.src"
                :alt="content.overview.visual.alt"
                width="3456"
                height="12680"
                sizes="xs:360px sm:640px md:768px lg:1216px"
                format="webp"
                :quality="86"
                loading="lazy"
                decoding="async"
              />
              <button
                type="button"
                class="vista-media-expand"
                :aria-label="content.labels.openImage"
                @click="openMedia(content.overview.visual.src, content.overview.visual.alt, 12680)"
              >
                <UIcon name="i-lucide-maximize-2" />
              </button>
            </div>
            <figcaption>{{ content.overview.visual.caption }}</figcaption>
          </figure>
        </section>

        <section
          id="challenge"
          class="case-section reveal-section"
        >
          <SectionHeading v-bind="heading('challenge')" /><p class="case-intro">
            {{ content.challenge.intro }}
          </p>
          <div class="card-grid card-grid--three">
            <article
              v-for="(card, index) in content.challenge.cards"
              :key="card[0]"
            >
              <span>{{ String(index + 1).padStart(2, '0') }}</span><h3>{{ card[0] }}</h3><p>{{ card[1] }}</p>
            </article>
          </div>
          <blockquote class="problem-statement">
            <small>{{ content.challenge.label }}</small><p>{{ content.challenge.statement }}</p>
          </blockquote>
        </section>

        <section
          id="role-scope"
          class="case-section reveal-section"
        >
          <SectionHeading v-bind="heading('role-scope')" /><p class="case-intro">
            {{ content.role.intro }}
          </p>
          <div class="role-layout">
            <article>
              <h3>{{ content.labels.responsibilities }}</h3><ul class="check-list">
                <li
                  v-for="item in content.role.responsibilities"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ul>
            </article><article>
              <h3>{{ content.labels.scope }}</h3><dl class="scope-list">
                <div
                  v-for="item in content.role.scope"
                  :key="item[0]"
                >
                  <dt>{{ item[0] }}</dt><dd>{{ item[1] }}</dd>
                </div>
              </dl>
            </article>
          </div>
        </section>

        <section
          id="ecosystem"
          class="case-section case-section--wide reveal-section"
        >
          <SectionHeading v-bind="heading('ecosystem')" /><p class="case-intro">
            {{ content.ecosystem.intro }}
          </p>
          <div class="ecosystem-map">
            <article
              v-for="(group, index) in content.ecosystem.groups"
              :key="group[0]"
            >
              <span>{{ String(index + 1).padStart(2, '0') }}</span><h3>{{ group[0] }}</h3><ul>
                <li
                  v-for="item in group[1]"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ul>
            </article>
          </div>
          <aside class="insight">
            <small>{{ content.labels.guiding }}</small><p>{{ content.ecosystem.insight }}</p>
          </aside>
        </section>

        <section
          id="users-needs"
          class="case-section reveal-section"
        >
          <SectionHeading v-bind="heading('users-needs')" /><p class="case-intro">
            {{ content.audiences.intro }}
          </p>
          <div class="needs-list">
            <article
              v-for="(group, index) in content.audiences.groups"
              :key="group[0]"
            >
              <span>{{ String(index + 1).padStart(2, '0') }}</span><div><h3>{{ group[0] }}</h3><p>{{ group[1] }}</p></div>
            </article>
          </div>
        </section>

        <section
          id="user-flows"
          class="case-section case-section--wide reveal-section"
        >
          <SectionHeading v-bind="heading('user-flows')" /><p class="case-intro">
            {{ content.flows.intro }}
          </p>
          <div class="flow-list">
            <article
              v-for="(flow, flowIndex) in content.flows.items"
              :key="flow[0]"
            >
              <header><span>{{ String(flowIndex + 1).padStart(2, '0') }}</span><h3>{{ flow[0] }}</h3></header><ol>
                <li
                  v-for="(step, index) in flow[1]"
                  :key="step"
                >
                  <i>{{ index + 1 }}</i><span>{{ step }}</span>
                </li>
              </ol>
            </article>
          </div>
        </section>

        <section
          id="ux-decisions"
          class="case-section case-section--wide reveal-section"
        >
          <SectionHeading v-bind="heading('ux-decisions')" />
          <div class="decision-list">
            <article
              v-for="(decision, index) in content.decisions.items"
              :key="decision[0]"
            >
              <header><span>{{ String(index + 1).padStart(2, '0') }}</span><h3>{{ decision[0] }}</h3></header><dl>
                <div
                  v-for="(value, itemIndex) in decision.slice(1)"
                  :key="content.decisions.labels[itemIndex]"
                >
                  <dt>{{ content.decisions.labels[itemIndex] }}</dt><dd>{{ value }}</dd>
                </div>
              </dl>
            </article>
          </div>
        </section>

        <section
          id="risk-assessment"
          class="case-section case-section--wide reveal-section"
        >
          <SectionHeading v-bind="heading('risk-assessment')" /><p class="disclaimer">
            {{ content.risk.intro }}
          </p>
          <div class="risk-framing">
            <article><small>{{ content.labels.challenge }}</small><p>{{ content.risk.challenge }}</p></article><article><small>{{ content.labels.approach }}</small><p>{{ content.risk.approach }}</p></article>
          </div>
          <ol class="journey">
            <li
              v-for="(step, index) in content.risk.journey"
              :key="step"
            >
              <span>{{ index + 1 }}</span>{{ step }}
            </li>
          </ol>
          <ul class="pill-list">
            <li
              v-for="item in content.risk.principles"
              :key="item"
            >
              {{ item }}
            </li>
          </ul>
          <figure class="vista-result-stage">
            <figcaption><span>{{ content.risk.result.label }}</span><h3>{{ content.risk.result.title }}</h3><p>{{ content.risk.result.caption }}</p></figcaption>
            <div class="vista-window vista-window--result">
              <div class="vista-window__bar">
                <i /><span>{{ content.risk.result.title }}</span>
              </div>
              <NuxtImg
                :src="content.risk.result.src"
                :alt="content.risk.result.alt"
                width="3456"
                height="5716"
                sizes="xs:360px sm:640px md:768px lg:1056px"
                format="webp"
                :quality="86"
                loading="lazy"
                decoding="async"
              />
              <button
                type="button"
                class="vista-media-expand"
                :aria-label="content.labels.openImage"
                @click="openMedia(content.risk.result.src, content.risk.result.alt, 5716)"
              >
                <UIcon name="i-lucide-maximize-2" />
              </button>
            </div>
          </figure>
        </section>

        <section
          id="service-pages"
          class="case-section case-section--wide reveal-section"
        >
          <SectionHeading v-bind="heading('service-pages')" /><p class="case-intro">
            {{ content.services.intro }}
          </p>
          <ol
            class="system-flow"
            :aria-label="heading('service-pages').title"
          >
            <li
              v-for="(step, index) in content.services.pattern"
              :key="step"
            >
              <span>{{ String(index + 1).padStart(2, '0') }}</span>{{ step }}
            </li>
          </ol>
          <div class="service-grid">
            <article
              v-for="(item, index) in content.services.examples"
              :key="item[0]"
            >
              <span>{{ String(index + 1).padStart(2, '0') }}</span><h3>{{ item[0] }}</h3><p>{{ item[1] }}</p>
            </article>
          </div><p class="system-note">
            {{ content.services.note }}
          </p>
          <p class="media-bridge media-bridge--services">
            {{ content.services.visualIntro }}
          </p>
          <div class="vista-media-pair vista-media-pair--services">
            <figure
              v-for="(visual, index) in content.services.visuals"
              :key="visual.src"
              class="vista-media"
            >
              <div class="vista-window">
                <div class="vista-window__bar">
                  <i /><span>{{ visual.label }}</span>
                </div>
                <NuxtImg
                  :src="visual.src"
                  :alt="visual.alt"
                  width="3456"
                  :height="index === 0 ? 8622 : 8682"
                  sizes="100vw md:50vw lg:592px"
                  format="webp"
                  :quality="86"
                  loading="lazy"
                  decoding="async"
                />
                <button
                  type="button"
                  class="vista-media-expand"
                  :aria-label="content.labels.openImage"
                  @click="openMedia(visual.src, visual.alt, index === 0 ? 8622 : 8682)"
                >
                  <UIcon name="i-lucide-maximize-2" />
                </button>
              </div>
              <figcaption><h3>{{ visual.title }}</h3><p>{{ visual.caption }}</p></figcaption>
            </figure>
          </div>
        </section>

        <section
          id="ui-pages"
          class="case-section case-section--wide reveal-section"
        >
          <SectionHeading v-bind="heading('ui-pages')" /><p class="case-intro">
            {{ content.uiPages.intro }}
          </p>
          <div class="vista-media-pair vista-media-pair--products">
            <figure
              v-for="(visual, index) in content.uiPages.visuals"
              :key="visual.src"
              class="vista-media"
            >
              <div class="vista-window">
                <div class="vista-window__bar">
                  <i /><span>{{ visual.label }}</span>
                </div>
                <NuxtImg
                  :src="visual.src"
                  :alt="visual.alt"
                  width="3456"
                  :height="index === 0 ? 14216 : 14274"
                  sizes="100vw md:50vw lg:592px"
                  format="webp"
                  :quality="86"
                  loading="lazy"
                  decoding="async"
                />
                <button
                  type="button"
                  class="vista-media-expand"
                  :aria-label="content.labels.openImage"
                  @click="openMedia(visual.src, visual.alt, index === 0 ? 14216 : 14274)"
                >
                  <UIcon name="i-lucide-maximize-2" />
                </button>
              </div>
              <figcaption><h3>{{ visual.title }}</h3><p>{{ visual.caption }}</p></figcaption>
            </figure>
          </div>
        </section>

        <section
          id="design-foundations"
          class="case-section case-section--wide reveal-section"
        >
          <SectionHeading v-bind="heading('design-foundations')" /><p class="case-intro">
            {{ content.foundations.intro }}
          </p>
          <div class="foundation-specs">
            <article class="foundation-type-spec">
              <span class="foundation-type">Aa</span>
              <div><h3>{{ content.foundations.font.title }}</h3><p>{{ content.foundations.font.family }}</p><small>{{ content.foundations.font.weights.join(' · ') }}</small></div>
            </article>
            <article class="foundation-colour-spec">
              <div>
                <h3>{{ content.foundations.coloursTitle }}</h3><ul class="colour-list">
                  <li
                    v-for="colour in content.foundations.colours"
                    :key="colour"
                  >
                    <i :style="{ backgroundColor: colour }" /><span>{{ colour }}</span>
                  </li>
                </ul>
              </div>
            </article>
          </div>
          <div class="card-grid foundation-grid">
            <article
              v-for="(item, index) in content.foundations.cards"
              :key="item[0]"
            >
              <span>{{ String(index + 1).padStart(2, '0') }}</span><h3>{{ item[0] }}</h3><p>{{ item[1] }}</p>
            </article>
          </div><ul class="component-cloud">
            <li
              v-for="item in content.foundations.components"
              :key="item"
            >
              {{ item }}
            </li>
          </ul>
        </section>

        <section
          id="accessibility"
          class="case-section reveal-section"
        >
          <SectionHeading v-bind="heading('accessibility')" /><p class="case-intro">
            {{ content.accessibility.intro }}
          </p>
          <div class="access-grid">
            <article
              v-for="(item, index) in content.accessibility.items"
              :key="item[0]"
            >
              <span>{{ String(index + 1).padStart(2, '0') }}</span><div><h3>{{ item[0] }}</h3><p>{{ item[1] }}</p></div>
            </article>
          </div>
        </section>

        <section
          id="evaluation"
          class="case-section reveal-section"
        >
          <SectionHeading v-bind="heading('evaluation')" /><p class="disclaimer">
            {{ content.evaluation.intro }}
          </p><ul class="component-cloud">
            <li
              v-for="(item, index) in content.evaluation.criteria"
              :key="item"
            >
              <span>{{ String(index + 1).padStart(2, '0') }}</span>{{ item }}
            </li>
          </ul>
          <div class="evaluation-grid">
            <article>
              <h3>{{ content.labels.strengths }}</h3><ol>
                <li
                  v-for="item in content.evaluation.strengths"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ol>
            </article><article>
              <h3>{{ content.labels.improvements }}</h3><ol>
                <li
                  v-for="item in content.evaluation.improvements"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ol>
            </article>
          </div>
        </section>

        <section
          id="outcome-reflection"
          class="case-section outcome-section reveal-section"
        >
          <SectionHeading v-bind="heading('outcome-reflection')" /><p class="case-intro">
            {{ content.outcome.intro }}
          </p>
          <div class="outcome-grid">
            <article>
              <h3>{{ content.labels.lessons }}</h3><ol>
                <li
                  v-for="item in content.outcome.lessons"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ol>
            </article><article>
              <h3>{{ content.labels.revisit }}</h3><ul>
                <li
                  v-for="item in content.outcome.nextSteps"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ul>
            </article>
          </div>
        </section>
      </main>
    </div>

    <dialog
      ref="mediaDialog"
      class="vista-media-dialog"
      @click.self="closeMedia"
      @close="expandedMedia = null"
    >
      <div class="vista-media-dialog__head">
        <p>{{ expandedMedia?.alt }}</p>
        <button
          type="button"
          :aria-label="content.labels.closeImage"
          @click="closeMedia"
        >
          <UIcon name="i-lucide-x" />
        </button>
      </div>
      <NuxtImg
        v-if="expandedMedia"
        :src="expandedMedia.src"
        :alt="expandedMedia.alt"
        width="3456"
        :height="expandedMedia.height"
        sizes="xs:360px sm:640px md:768px lg:1472px"
        format="webp"
        :quality="90"
        loading="eager"
        decoding="async"
      />
    </dialog>
  </article>
</template>

<style scoped>
.vista-case :deep(.case-hero) { padding-top: clamp(7rem,8vw,8.5rem); padding-bottom: clamp(1.5rem,2.5vw,2.5rem); }
.vista-case :deep(.case-hero__surface--with-media) { display: grid; min-height: clamp(29rem,35vw,32rem); grid-template-areas: 'media copy' 'media meta'; grid-template-columns: minmax(0,1.16fr) minmax(23rem,.84fr); grid-template-rows: 1fr auto; gap: 0; padding: 1rem; overflow: hidden; border: 0; border-radius: clamp(1.5rem,2.4vw,2rem); background: radial-gradient(circle at 92% 8%,color-mix(in srgb,var(--portfolio-accent) 12%,transparent),transparent 17rem),color-mix(in srgb,var(--portfolio-surface) 78%,var(--portfolio-bg)); box-shadow: 0 2rem 6rem rgb(0 0 0 / 14%); }
.vista-case :deep(.case-hero__surface--with-media::before) { display: none; }
.vista-case :deep(.case-hero__copy) { grid-area: copy; min-height: 0; align-items: flex-start; justify-content: flex-end; padding: clamp(2rem,3.5vw,3.25rem) clamp(1.75rem,3vw,3rem) 1.25rem; border-radius: 0; background: transparent; box-shadow: none; text-align: start; }
.vista-case :deep(.case-hero__eyebrow) { display: inline-flex; align-items: center; gap: .7rem; margin-bottom: 1.25rem; color: var(--portfolio-accent); font-size: .72rem; font-weight: 800; letter-spacing: .04em; }
.vista-case :deep(.case-hero__eyebrow::before) { width: 1.75rem; height: 1px; background: currentcolor; content: ''; opacity: .7; }
.vista-case :deep(.case-hero__title) { width: 100%; max-width: 18ch; color: var(--portfolio-text); font-size: clamp(2.35rem,3.15vw,3.3rem); font-weight: 900; line-height: 1.18; overflow-wrap: normal; text-wrap: balance; white-space: normal; }
.vista-case :deep(.case-hero__summary) { max-width: 32rem; margin-top: 1rem; color: color-mix(in srgb,var(--portfolio-text) 72%,var(--portfolio-muted)); font-size: clamp(.92rem,1vw,1.02rem); line-height: 1.85; text-align: start; }
.vista-case :deep(.case-hero__meta) { grid-area: meta; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 0; margin: 0; padding: 0 clamp(1.75rem,3vw,3rem) clamp(1.5rem,2.5vw,2.25rem); overflow: visible; border: 0; border-radius: 0; background: transparent; box-shadow: none; }
.vista-case :deep(.case-hero__meta>div),.vista-case :deep(.case-hero__meta>div+div),.vista-case :deep(.case-hero__meta>div:nth-child(3)),.vista-case :deep(.case-hero__meta>div:nth-child(n+3)) { min-height: 4.6rem; align-items: flex-start; padding: .8rem 0; border: 0; border-top: 1px solid color-mix(in srgb,var(--portfolio-line) 70%,transparent); text-align: start; }
.vista-case :deep(.case-hero__meta>div:nth-child(even)) { padding-inline-start: 1rem; border-inline-start: 1px solid color-mix(in srgb,var(--portfolio-line) 70%,transparent); }
.vista-case :deep(.case-hero__meta dt) { color: var(--portfolio-accent); font-size: .68rem; font-weight: 800; }
.vista-case :deep(.case-hero__meta dd) { margin-top: .35rem; color: var(--portfolio-text); font-size: .82rem; font-weight: 700; line-height: 1.55; }
.vista-case :deep(.case-hero__media) { position: relative; grid-area: media; display: block; width: 100%; align-self: center; overflow: hidden; aspect-ratio: 16/9; margin: 0; border-radius: clamp(1.1rem,1.8vw,1.6rem); background: color-mix(in srgb,var(--portfolio-surface) 72%,var(--portfolio-bg)); box-shadow: 0 1.5rem 4rem rgb(0 0 0 / 16%); }
.vista-case :deep(.case-hero__media::before) { position: absolute; z-index: -1; inset: 8% 6% -5%; border-radius: inherit; background: color-mix(in srgb,var(--portfolio-accent) 16%,transparent); content: ''; filter: blur(3rem); }
.vista-case :deep(.case-hero__media picture) { display: block; width: 100%; height: 100%; }
.vista-case :deep(.case-hero__media img) { display: block; width: 100%; height: 100%; object-fit: contain; object-position: center; }
@media(max-width:900px){
  .vista-case :deep(.case-hero__surface--with-media){grid-template-areas:'copy' 'meta' 'media';grid-template-columns:1fr}
  .vista-case :deep(.case-hero__copy){min-height:0;padding:clamp(1.75rem,6vw,3rem) clamp(1.5rem,6vw,3rem) 1rem}
  .vista-case :deep(.case-hero__title){max-width:18ch;font-size:clamp(2.5rem,7vw,4rem)}
  .vista-case :deep(.case-hero__meta){grid-template-columns:repeat(2,minmax(0,1fr));padding:0 clamp(1.5rem,6vw,3rem) 1rem}
  .vista-case :deep(.case-hero__meta>div),.vista-case :deep(.case-hero__meta>div+div),.vista-case :deep(.case-hero__meta>div:nth-child(3)),.vista-case :deep(.case-hero__meta>div:nth-child(n+3)){padding:1rem .5rem;border:0;border-bottom:1px solid color-mix(in srgb,var(--portfolio-line) 70%,transparent)}
  .vista-case :deep(.case-hero__meta>div:nth-child(even)){padding-inline-start:1rem;border-inline-start:1px solid color-mix(in srgb,var(--portfolio-line) 70%,transparent)}
  .vista-case :deep(.case-hero__media){margin-top:.25rem}
}
@media(max-width:639px){
  .vista-case :deep(.case-hero){width:100vw;max-width:none;margin-inline:calc(50% - 50vw);padding:6.5rem 0 2.5rem}
  .vista-case :deep(.case-hero__surface--with-media){min-height:0;gap:0;padding:0;border-radius:0;box-shadow:none}
  .vista-case :deep(.case-hero__copy),.vista-case :deep(.case-hero__meta),.vista-case :deep(.case-hero__media){border-radius:0}
  .vista-case :deep(.case-hero__copy){align-items:center;padding:2rem var(--portfolio-gutter) 1rem;text-align:center}
  .vista-case :deep(.case-hero__eyebrow){margin-bottom:.9rem;font-size:.64rem}
  .vista-case :deep(.case-hero__eyebrow::before){display:none}
  .vista-case :deep(.case-hero__title){max-width:19ch;font-size:clamp(2rem,8vw,2.5rem);line-height:1.2;text-align:center}
  .vista-case :deep(.case-hero__summary){max-width:30rem;margin:1rem auto 0;color:var(--portfolio-muted);font-size:.88rem;font-weight:600;line-height:1.85;text-align:center}
  .vista-case :deep(.case-hero__meta){padding:0 var(--portfolio-gutter) 1.25rem;text-align:center}
  .vista-case :deep(.case-hero__meta>div),.vista-case :deep(.case-hero__meta>div+div),.vista-case :deep(.case-hero__meta>div:nth-child(3)),.vista-case :deep(.case-hero__meta>div:nth-child(n+3)){min-height:4.25rem;align-items:center;padding:.8rem .4rem;border:0;border-bottom:1px solid color-mix(in srgb,var(--portfolio-line) 70%,transparent);border-radius:0;background:transparent;text-align:center}
  .vista-case :deep(.case-hero__meta>div:nth-child(even)){padding-inline-start:.4rem;border-inline-start:1px solid color-mix(in srgb,var(--portfolio-line) 70%,transparent)}
  .vista-case :deep(.case-hero__meta dt){font-size:.64rem}
  .vista-case :deep(.case-hero__meta dd){display:block;margin-top:.28rem;padding:0;overflow:visible;border:0;font-size:.72rem;line-height:1.55;text-align:center;-webkit-line-clamp:unset}
  .vista-case :deep(.case-hero__media){width:100%;margin:0;border-radius:0;box-shadow:none}
  .method-note{grid-template-columns:1fr;justify-items:center;gap:.85rem;text-align:center}
  .method-note__icon{grid-row:auto;margin-inline:auto}
  .method-note strong,.method-note p{text-align:center}
}
.method-wrap { margin-top: clamp(1.25rem,2vw,2rem); }
.method-wrap + .case-shell { padding-top: clamp(2.5rem,4vw,4rem); }
.method-note { display: grid; max-width: 58rem; grid-template-columns: auto 1fr; align-items: start; gap: 1rem; margin-inline: auto; padding: 0; border: 0; background: transparent; color: var(--portfolio-muted); font-size: .84rem; line-height: 1.85; }
.method-note__icon { display: grid; width: 2.5rem; aspect-ratio: 1; place-items: center; border-radius: 50%; background: color-mix(in srgb,var(--portfolio-accent) 12%,var(--portfolio-surface)); color: var(--portfolio-accent); }
.method-note__icon svg { width: 1.05rem; }
.method-note strong { display: block; margin-bottom: .35rem; color: var(--portfolio-text); font-size: .72rem; font-weight: 800; }
.case-shell { width: 100%; max-width: none; padding-inline: 0; }.case-outline { position: sticky; top: 4.75rem; z-index: 20; display: flex; width: 100%; overflow: hidden; margin-bottom: clamp(4rem,7vw,7rem); border-block: 1px solid var(--portfolio-line); background: color-mix(in srgb,var(--portfolio-bg) 94%,transparent); backdrop-filter: blur(18px); }.case-outline>p { display: flex; min-height: 4.75rem; flex: none; align-items: center; padding-inline: .75rem 1.25rem; border-inline-end: 1px solid var(--portfolio-line); white-space: nowrap; }.case-outline ol { display: flex; flex: 1; min-width: 0; overflow-x: auto; scrollbar-width: none; }.case-outline ol::-webkit-scrollbar { display: none; }.case-outline li { flex: 1 0 auto; }.case-outline a { position: relative; display: flex; min-height: 4.75rem; align-items: center; justify-content: center; gap: .4rem; padding-inline: .65rem; border-inline-end: 1px solid color-mix(in srgb,var(--portfolio-line) 65%,transparent); color: var(--portfolio-muted); font-size: clamp(.7rem,.75vw,.85rem); white-space: nowrap; }.case-outline a::after { position: absolute; inset-inline: .75rem; bottom: 0; height: 2px; background: var(--portfolio-accent); content: ''; opacity: 0; }.case-outline a.is-active { color: var(--portfolio-text); }.case-outline a.is-active::after { opacity: 1; }.case-outline a span { color: var(--portfolio-accent); font-weight: 800; }
.case-main { max-width: 76rem; margin-inline: auto; }.case-section { max-width: 66rem; margin: clamp(8rem,13vw,13rem) auto 0; text-align: center; scroll-margin-top: 9rem; }.case-section:first-child { margin-top: 0; }.case-section--wide { max-width: 76rem; }.case-section :deep(.section-heading) { align-items: center; text-align: center; }.case-section :deep(.section-heading__kicker) { display: flex; align-items: center; gap: .8rem; }.case-section :deep(.section-heading__kicker)::before,.case-section :deep(.section-heading__kicker)::after { width: 2rem; height: 1px; background: var(--portfolio-line); content: ''; }.case-section :deep(.section-heading h2) { max-width: 34ch; margin-inline: auto; font-size: clamp(2rem,2.4vw,2.8rem); }.case-section :deep(.section-heading h2)::after { display: none; }.case-intro { max-width: 58rem; margin: 1.75rem auto 0; color: var(--portfolio-muted); font-size: clamp(.98rem,1.1vw,1.12rem); line-height: 1.9; }.case-lead { color: var(--portfolio-text); font-size: clamp(1.15rem,1.4vw,1.4rem); font-weight: 650; line-height: 1.8; }.split-copy { display: grid; width: min(100%,58rem); grid-template-columns: minmax(0,1fr); justify-items: center; gap: .9rem; margin: 2rem auto 0; text-align: center; }.split-copy>p { max-width: 52rem; margin-inline: auto; text-align: center; }.split-copy>p:last-child { color: var(--portfolio-muted); line-height: 1.9; }
.fact-grid,.card-grid,.principle-grid,.service-grid { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: 1px; margin-top: 2.5rem; background: var(--portfolio-line); }.fact-grid>div,.card-grid article,.principle-grid article,.service-grid article { padding: 1.35rem; background: var(--portfolio-bg); text-align: start; }.fact-grid dt,article>span,.insight small,.risk-framing small { color: var(--portfolio-accent); font-size: .72rem; font-weight: 800; }.fact-grid dd { margin-top: .65rem; font-weight: 700; }.card-grid--three { grid-template-columns: repeat(3,minmax(0,1fr)); }.card-grid h3,.principle-grid h3,.service-grid h3 { margin-top: .7rem; font-size: 1.05rem; font-weight: 800; }.card-grid p,.principle-grid p,.service-grid p { margin-top: .55rem; color: var(--portfolio-muted); font-size: .86rem; line-height: 1.75; }
.asset-placeholder { display: grid; min-height: 15rem; place-content: center; gap: 1rem; margin-top: 2.5rem; border: 1px dashed var(--portfolio-line); border-radius: var(--radius-media); background: color-mix(in srgb,var(--portfolio-surface) 48%,transparent); color: var(--portfolio-muted); }.asset-placeholder--hero { min-height: 28rem; }.asset-placeholder svg { width: 1.5rem; margin-inline: auto; }.asset-placeholder figcaption { display: grid; gap: .35rem; }.asset-placeholder strong { color: var(--portfolio-text); }.asset-placeholder span { font-size: .75rem; }.problem-statement,.insight,.system-note { margin-top: 2rem; padding: 1.6rem; border-inline-start: 3px solid var(--portfolio-accent); background: var(--portfolio-surface); text-align: start; }.problem-statement p,.insight p { margin-top: .5rem; font-size: clamp(1.05rem,1.3vw,1.3rem); font-weight: 650; line-height: 1.8; }
.role-layout,.evaluation-grid,.outcome-grid,.risk-framing { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 1rem; margin-top: 2.5rem; text-align: start; }.role-layout { grid-template-columns: 1.15fr .85fr; gap: 1.25rem; }.role-layout>article { padding: clamp(1.35rem,2.3vw,2rem); border-radius: 1.5rem; background: linear-gradient(145deg,color-mix(in srgb,var(--portfolio-surface) 94%,var(--portfolio-accent) 6%),color-mix(in srgb,var(--portfolio-surface) 70%,transparent)); box-shadow: 0 1rem 3rem color-mix(in srgb,#000 10%,transparent); }.evaluation-grid>article,.outcome-grid>article,.risk-framing>article { padding: 1.5rem; border: 1px solid var(--portfolio-line); background: color-mix(in srgb,var(--portfolio-surface) 58%,transparent); }.role-layout h3,.evaluation-grid h3,.outcome-grid h3 { font-size: 1.1rem; font-weight: 800; }.check-list,.evaluation-grid ol,.outcome-grid :is(ol,ul) { display: grid; gap: .7rem; margin-top: 1rem; }.role-layout .check-list { grid-template-columns: repeat(2,minmax(0,1fr)); gap: 0 1.25rem; }.check-list li,.evaluation-grid li,.outcome-grid li { position: relative; padding-inline-start: 1.2rem; color: var(--portfolio-muted); line-height: 1.7; }.role-layout .check-list li { padding-block: .7rem; border-bottom: 1px solid color-mix(in srgb,var(--portfolio-line) 60%,transparent); }.check-list li::before,.evaluation-grid li::before,.outcome-grid li::before { position: absolute; inset-inline-start: 0; color: var(--portfolio-accent); content: '•'; }.role-layout .check-list li::before { inset-block-start: .82rem; content: '✓'; font-size: .72rem; font-weight: 900; }.scope-list { margin-top: 1rem; }.scope-list div { display: grid; grid-template-columns: minmax(7rem,.75fr) 1fr; gap: 1rem; padding-block: .75rem; border-top: 1px solid color-mix(in srgb,var(--portfolio-line) 65%,transparent); }.scope-list dt { color: var(--portfolio-muted); }.scope-list dd { font-weight: 700; text-align: end; }
.ecosystem-map { display: grid; grid-template-columns: repeat(12,minmax(0,1fr)); gap: 1rem; margin-top: 2.5rem; }.ecosystem-map article { position: relative; grid-column: span 4; min-height: 10.5rem; padding: clamp(1.25rem,2vw,1.75rem); overflow: hidden; border-radius: 1.4rem; background: color-mix(in srgb,var(--portfolio-surface) 86%,transparent); box-shadow: 0 .9rem 2.8rem color-mix(in srgb,#000 9%,transparent); text-align: start; }.ecosystem-map article::after { position: absolute; inset-block-start: 0; inset-inline-start: 1.75rem; width: 2.75rem; height: 2px; background: var(--portfolio-accent); content: ''; }.ecosystem-map article:first-child { grid-column: span 7; background: linear-gradient(145deg,color-mix(in srgb,var(--portfolio-accent) 11%,var(--portfolio-surface)),var(--portfolio-surface)); }.ecosystem-map article:nth-child(2) { grid-column: span 5; }.ecosystem-map article:nth-child(3) { grid-column: span 4; }.ecosystem-map article:nth-child(4) { grid-column: span 5; }.ecosystem-map article:nth-child(5) { grid-column: span 3; }.ecosystem-map h3 { margin-top: .65rem; font-size: 1.08rem; font-weight: 800; }.ecosystem-map ul { display: flex; flex-wrap: wrap; gap: .45rem; margin-top: 1rem; }.ecosystem-map li { padding: .42rem .68rem; border-radius: 999px; background: color-mix(in srgb,var(--portfolio-bg) 58%,transparent); color: var(--portfolio-muted); font-size: .75rem; }.pill-list li,.component-cloud li { padding: .45rem .7rem; border: 1px solid var(--portfolio-line); border-radius: 999px; color: var(--portfolio-muted); font-size: .75rem; }
.disclaimer { max-width: 52rem; margin: 1rem auto 0; padding: .85rem 1rem; border: 1px solid var(--portfolio-line); color: var(--portfolio-muted); font-size: .8rem; }.needs-list { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: .85rem; margin-top: 2rem; }.needs-list article { display: grid; grid-template-columns: auto 1fr; align-items: start; gap: 1rem; min-height: 8.5rem; padding: 1.35rem; border-radius: 1.25rem; background: color-mix(in srgb,var(--portfolio-surface) 82%,transparent); box-shadow: 0 .75rem 2.2rem color-mix(in srgb,#000 8%,transparent); text-align: start; }.needs-list article:last-child { grid-column: 1/-1; min-height: auto; }.needs-list article>span { display: grid; width: 2.2rem; aspect-ratio: 1; place-items: center; border-radius: .7rem; background: color-mix(in srgb,var(--portfolio-accent) 13%,transparent); }.access-grid article { display: flex; align-items: flex-start; gap: 1rem; padding: 1.1rem 1.25rem; border: 1px solid var(--portfolio-line); text-align: start; }.needs-list h3,.access-grid h3 { font-weight: 800; }.needs-list p,.access-grid p { margin-top: .35rem; color: var(--portfolio-muted); line-height: 1.7; }
.site-map { margin-top: 2.5rem; }.site-map>strong { display: inline-grid; min-width: 8rem; place-items: center; padding: 1rem; border-radius: 999px; background: var(--portfolio-accent); color: #fff; }.site-map>div { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 1rem; margin-top: 2rem; }.site-map article { padding: 1.2rem; border-top: 2px solid var(--portfolio-accent); background: var(--portfolio-surface); }.site-map h3 { font-weight: 800; }.site-map p { margin-top: .65rem; color: var(--portfolio-muted); font-size: .82rem; line-height: 1.7; }.principle-grid { grid-template-columns: repeat(3,minmax(0,1fr)); }
.flow-list,.decision-list { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 1rem; margin-top: 2.5rem; }.flow-list article,.decision-list article { min-width: 0; padding: clamp(1.25rem,2.2vw,1.8rem); border-radius: 1.5rem; background: linear-gradient(145deg,color-mix(in srgb,var(--portfolio-surface) 92%,var(--portfolio-accent) 4%),color-mix(in srgb,var(--portfolio-surface) 72%,transparent)); box-shadow: 0 1rem 3rem color-mix(in srgb,#000 9%,transparent); text-align: start; }.flow-list header,.decision-list header { display: flex; align-items: center; gap: .85rem; }.flow-list header>span,.decision-list header>span { display: grid; width: 2.3rem; flex: none; aspect-ratio: 1; place-items: center; border-radius: .75rem; background: color-mix(in srgb,var(--portfolio-accent) 14%,transparent); color: var(--portfolio-accent); font-size: .72rem; font-weight: 850; }.flow-list h3,.decision-list h3 { font-size: 1.05rem; font-weight: 800; }.flow-list ol { display: grid; gap: 0; margin-top: 1.35rem; }.flow-list li { position: relative; display: grid; min-height: 2.85rem; grid-template-columns: 1.8rem 1fr; align-items: start; gap: .8rem; padding-block: .3rem .7rem; color: var(--portfolio-muted); font-size: .82rem; font-weight: 650; }.flow-list li:not(:last-child)::after { position: absolute; inset-block-start: 2rem; inset-block-end: -.05rem; inset-inline-start: .87rem; width: 1px; background: color-mix(in srgb,var(--portfolio-accent) 28%,var(--portfolio-line)); content: ''; }.flow-list i { position: relative; z-index: 1; display: grid; width: 1.8rem; aspect-ratio: 1; place-items: center; border-radius: 50%; background: color-mix(in srgb,var(--portfolio-accent) 14%,var(--portfolio-surface)); color: var(--portfolio-accent); font-size: .65rem; font-style: normal; font-weight: 900; }.flow-list li>span { padding-block-start: .3rem; }.flow-list li:last-child { padding-bottom: 0; color: var(--portfolio-text); }.flow-list li:last-child i { background: var(--portfolio-accent); color: #fff; box-shadow: 0 0 0 .3rem color-mix(in srgb,var(--portfolio-accent) 12%,transparent); }.journey,.system-flow { display: flex; align-items: stretch; margin-top: 1.2rem; overflow-x: auto; }.journey li,.system-flow li { display: flex; min-width: 8rem; flex: 1; align-items: center; gap: .5rem; padding: .8rem; background: var(--portfolio-surface); color: var(--portfolio-muted); font-size: .78rem; }.journey li+li,.system-flow li+li { border-inline-start: 1px solid color-mix(in srgb,var(--portfolio-line) 70%,transparent); }.journey span,.system-flow span { display: grid; width: 1.5rem; aspect-ratio: 1; place-items: center; border-radius: 50%; background: var(--portfolio-accent); color: #fff; font-size: .65rem; font-style: normal; }
.decision-list article:nth-child(3) { background: linear-gradient(145deg,color-mix(in srgb,var(--portfolio-accent) 10%,var(--portfolio-surface)),color-mix(in srgb,var(--portfolio-surface) 72%,transparent)); }.decision-list dl { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: .65rem; margin-top: 1.35rem; }.decision-list dl div { min-height: 8.25rem; padding: 1rem; border-radius: 1rem; background: color-mix(in srgb,var(--portfolio-bg) 54%,transparent); }.decision-list dt { display: inline-flex; align-items: center; gap: .4rem; color: var(--portfolio-accent); font-size: .7rem; font-weight: 850; }.decision-list dt::before { width: .35rem; aspect-ratio: 1; border-radius: 50%; background: currentcolor; content: ''; }.decision-list dd { margin-top: .6rem; color: var(--portfolio-muted); font-size: .82rem; line-height: 1.75; }
.risk-framing { grid-template-columns: .9fr 1.1fr; gap: 1rem; }.risk-framing>article { min-height: 10.5rem; padding: clamp(1.35rem,2.4vw,2rem); border: 0; border-radius: 1.5rem; background: color-mix(in srgb,var(--portfolio-surface) 82%,transparent); box-shadow: 0 .9rem 2.8rem color-mix(in srgb,#000 8%,transparent); }.risk-framing>article:last-child { background: linear-gradient(145deg,color-mix(in srgb,var(--portfolio-accent) 11%,var(--portfolio-surface)),color-mix(in srgb,var(--portfolio-surface) 76%,transparent)); }.risk-framing article p { max-width: 34rem; margin-top: .7rem; color: var(--portfolio-text); font-size: clamp(.95rem,1.1vw,1.08rem); font-weight: 650; line-height: 1.9; }.journey { position: relative; gap: .4rem; margin-top: 1.25rem; padding: 1.35rem 1.15rem; overflow: visible; border-radius: 1.5rem; background: color-mix(in srgb,var(--portfolio-surface) 76%,transparent); box-shadow: 0 .9rem 2.8rem color-mix(in srgb,#000 7%,transparent); }.journey li { position: relative; z-index: 1; min-width: 0; flex: 1; flex-direction: column; justify-content: flex-start; gap: .65rem; padding: 0 .35rem; background: transparent; color: var(--portfolio-muted); font-size: .75rem; font-weight: 650; text-align: center; }.journey li+li { border: 0; }.journey li:not(:last-child)::after { position: absolute; z-index: -1; inset-block-start: .92rem; inset-inline-start: calc(50% + 1.15rem); width: calc(100% - 2.3rem); height: 1px; background: color-mix(in srgb,var(--portfolio-accent) 28%,var(--portfolio-line)); content: ''; }.journey span { width: 1.9rem; background: color-mix(in srgb,var(--portfolio-accent) 14%,var(--portfolio-surface)); color: var(--portfolio-accent); font-weight: 850; }.journey li:last-child { color: var(--portfolio-text); }.journey li:last-child span { background: var(--portfolio-accent); color: #fff; box-shadow: 0 0 0 .35rem color-mix(in srgb,var(--portfolio-accent) 12%,transparent); }.pill-list,.component-cloud { display: flex; flex-wrap: wrap; justify-content: center; gap: .5rem; margin-top: 1.5rem; }.asset-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 1rem; }.asset-grid .asset-placeholder { min-height: 18rem; }.system-flow { display: grid; grid-template-columns: repeat(6,minmax(0,1fr)); gap: .65rem; margin-top: 2rem; overflow: visible; }.system-flow li { min-width: 0; min-height: 7.5rem; flex-direction: column; align-items: flex-start; justify-content: space-between; gap: 1rem; padding: 1rem; border-radius: 1.15rem; background: color-mix(in srgb,var(--portfolio-surface) 82%,transparent); color: var(--portfolio-text); font-size: .8rem; font-weight: 700; text-align: start; box-shadow: 0 .7rem 2rem color-mix(in srgb,#000 7%,transparent); }.system-flow li+li { border: 0; }.system-flow span { width: 1.8rem; background: color-mix(in srgb,var(--portfolio-accent) 14%,var(--portfolio-surface)); color: var(--portfolio-accent); font-weight: 850; }.system-flow li:last-child { background: linear-gradient(145deg,color-mix(in srgb,var(--portfolio-accent) 12%,var(--portfolio-surface)),var(--portfolio-surface)); }.system-flow li:last-child span { background: var(--portfolio-accent); color: #fff; }.service-grid { grid-template-columns: repeat(4,minmax(0,1fr)); gap: 1rem; margin-top: 1rem; background: transparent; }.service-grid article { position: relative; min-height: 9.5rem; padding: 1.35rem; overflow: hidden; border-radius: 1.3rem; background: color-mix(in srgb,var(--portfolio-surface) 82%,transparent); box-shadow: 0 .8rem 2.4rem color-mix(in srgb,#000 8%,transparent); }.service-grid article:first-child { background: linear-gradient(145deg,color-mix(in srgb,var(--portfolio-accent) 10%,var(--portfolio-surface)),var(--portfolio-surface)); }.service-grid article>span { display: grid; width: 2rem; aspect-ratio: 1; place-items: center; border-radius: .65rem; background: color-mix(in srgb,var(--portfolio-accent) 13%,transparent); }.service-grid h3 { margin-top: 1rem; }.service-grid p { margin-top: .4rem; }.component-cloud li { background: var(--portfolio-surface); color: var(--portfolio-text); }
.vista-media { min-width: 0; margin-top: 2.5rem; }.vista-window { position: relative; overflow: hidden; border: 1px solid var(--portfolio-line); border-radius: var(--radius-media); background: var(--portfolio-surface); box-shadow: 0 1.5rem 4rem color-mix(in srgb,#000 16%,transparent); }.vista-window__bar { display: flex; min-height: 2.8rem; align-items: center; gap: .75rem; padding-inline: 1rem; border-bottom: 1px solid var(--portfolio-line); background: color-mix(in srgb,var(--portfolio-surface) 86%,var(--portfolio-bg)); color: var(--portfolio-muted); font-size: .72rem; text-align: start; }.vista-window__bar i,.vista-window__bar i::before,.vista-window__bar i::after { width: .45rem; aspect-ratio: 1; border-radius: 50%; background: var(--portfolio-line); }.vista-window__bar i { position: relative; display: block; margin-inline-end: 1.3rem; }.vista-window__bar i::before,.vista-window__bar i::after { position: absolute; inset-block-start: 0; content: ''; }.vista-window__bar i::before { inset-inline-start: .75rem; }.vista-window__bar i::after { inset-inline-start: 1.5rem; }.vista-window img { display: block; width: 100%; height: auto; }.vista-media-expand { position: absolute; z-index: 2; inset-block-start: 3.55rem; inset-inline-end: .75rem; display: grid; width: 2.75rem; aspect-ratio: 1; place-items: center; border: 1px solid rgb(255 255 255 / 28%); border-radius: 50%; background: rgb(10 12 16 / 78%); color: #fff; box-shadow: 0 .5rem 1.5rem rgb(0 0 0 / 25%); backdrop-filter: blur(12px); transition: transform 180ms ease,background 180ms ease; }.vista-media-expand:hover { background: var(--portfolio-accent); transform: scale(1.06); }.vista-media-expand svg { width: 1.1rem; }.vista-media>figcaption { margin-top: 1rem; text-align: start; }.vista-media>figcaption h3 { font-size: 1.05rem; font-weight: 800; }.vista-media>figcaption p,.vista-media--overview>figcaption { margin-top: .35rem; color: var(--portfolio-muted); font-size: .82rem; line-height: 1.75; }.vista-media--overview { margin-top: 3rem; }.vista-media--overview .vista-window { height: clamp(26rem,48vw,42rem); }.vista-media-pair { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); align-items: start; gap: 1rem; margin-top: 2rem; }.vista-media-pair .vista-media { margin-top: 0; }.vista-media-pair .vista-window { height: clamp(28rem,46vw,40rem); }.vista-media-pair--products .vista-window { height: clamp(32rem,52vw,46rem); }.media-bridge { max-width: 48rem; margin: 3rem auto 0; color: var(--portfolio-muted); line-height: 1.85; }.vista-result-stage { display: grid; gap: 1.5rem; margin-top: 2.5rem; padding: clamp(1rem,3vw,2.25rem); border: 1px solid color-mix(in srgb,var(--portfolio-accent) 38%,var(--portfolio-line)); border-radius: var(--radius-media); background: linear-gradient(145deg,color-mix(in srgb,var(--portfolio-accent) 8%,var(--portfolio-surface)),color-mix(in srgb,var(--portfolio-surface) 45%,transparent)); }.vista-result-stage>figcaption { max-width: 44rem; margin-inline: auto; }.vista-result-stage>figcaption span { color: var(--portfolio-accent); font-size: .72rem; font-weight: 800; }.vista-result-stage>figcaption h3 { margin-top: .55rem; font-size: clamp(1.35rem,2vw,2rem); font-weight: 850; }.vista-result-stage>figcaption p { margin-top: .6rem; color: var(--portfolio-muted); line-height: 1.8; }.vista-window--result { width: 100%; max-width: 66rem; height: clamp(28rem,48vw,42rem); margin-inline: auto; }
.vista-media-dialog { width: min(96vw,92rem); max-width: 92rem; height: 92dvh; max-height: 92dvh; margin: auto; padding: 0; overflow: auto; overscroll-behavior: contain; scrollbar-gutter: stable; border: 0; border-radius: 1rem; background: #fff; color: #111317; box-shadow: 0 3rem 10rem rgb(0 0 0 / 55%); }.vista-media-dialog::backdrop { background: rgb(5 7 10 / 80%); backdrop-filter: blur(8px); }.vista-media-dialog__head { position: sticky; top: 0; z-index: 3; display: flex; min-height: 4rem; align-items: center; justify-content: space-between; gap: 1rem; padding-inline: 1rem; background: rgb(17 19 23 / 94%); color: #fff; backdrop-filter: blur(14px); }.vista-media-dialog__head p { overflow: hidden; font-size: .78rem; text-overflow: ellipsis; white-space: nowrap; }.vista-media-dialog__head button { display: grid; width: 2.4rem; flex: none; aspect-ratio: 1; place-items: center; border-radius: 50%; background: #2a2e36; }.vista-media-dialog__head svg { width: 1rem; }.vista-media-dialog>img { display: block; width: 100%; max-width: 100%; height: auto; }
.ui-page-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 1rem; margin-top: 2.5rem; }.ui-page-grid article { border: 1px solid var(--portfolio-line); background: color-mix(in srgb,var(--portfolio-surface) 58%,transparent); text-align: start; }.ui-page-grid article>span { display: block; padding: 1.25rem 1.25rem 0; }.ui-page-grid article>div { padding: .65rem 1.25rem 1.25rem; }.ui-page-grid h3,.foundation-specs h3 { font-size: 1.05rem; font-weight: 800; }.ui-page-grid p,.foundation-specs p { margin-top: .45rem; color: var(--portfolio-muted); font-size: .84rem; line-height: 1.75; }.foundation-specs { display: grid; grid-template-columns: .85fr 1.15fr; gap: 1rem; margin-top: 2.5rem; }.foundation-specs article { display: flex; align-items: center; gap: 1.1rem; padding: 1.25rem; border: 1px solid var(--portfolio-line); background: var(--portfolio-surface); text-align: start; }.foundation-type-spec>span { display: grid; width: 4rem; flex: none; aspect-ratio: 1; place-items: center; border: 1px solid var(--portfolio-line); border-radius: 50%; color: var(--portfolio-muted); font-size: 1.2rem; font-weight: 800; }.foundation-specs small { display: block; margin-top: .55rem; color: var(--portfolio-muted); font-size: .72rem; line-height: 1.6; }.foundation-type { font-family: inherit; }.foundation-colour-spec>div { width: 100%; }.colour-list { display: grid; grid-template-columns: repeat(4,minmax(0,1fr)); gap: .65rem; margin-top: 1rem; direction: ltr; }.colour-list li { display: grid; gap: .45rem; color: var(--portfolio-muted); font-size: .68rem; text-align: center; }.colour-list i { display: block; width: 100%; height: 2.5rem; border: 1px solid color-mix(in srgb,var(--portfolio-line) 75%,transparent); border-radius: .4rem; }.foundation-grid { margin-top: 1rem; }
.comparison-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 1rem; margin-top: 2rem; }.comparison-grid article { padding: 1rem; border: 1px solid var(--portfolio-line); }.comparison-grid h3 { font-weight: 800; }.comparison-grid div { display: grid; grid-template-columns: 1.5fr .75fr; gap: .6rem; min-height: 12rem; margin-top: 1rem; }.comparison-grid div span { display: grid; place-items: center; border: 1px dashed var(--portfolio-line); background: var(--portfolio-surface); color: var(--portfolio-muted); }.comparison-grid small { display: block; margin-top: .7rem; color: var(--portfolio-muted); }.access-grid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: .7rem; margin-top: 2rem; }.access-grid svg { width: 1.1rem; flex: none; color: var(--portfolio-accent); }.outcome-section { padding: clamp(1.5rem,4vw,3rem); border: 1px solid var(--portfolio-line); background: color-mix(in srgb,var(--portfolio-surface) 50%,transparent); }

/* Service-page anatomy: one continuous system, followed by distinct applications. */
.system-flow { position: relative; display: grid; grid-template-columns: repeat(6,minmax(0,1fr)); gap: 0; margin-top: 2.5rem; padding: 0; overflow: visible; }
.system-flow::before { position: absolute; inset-block-start: 1.2rem; inset-inline: 8.333%; height: 1px; background: linear-gradient(90deg,transparent,color-mix(in srgb,var(--portfolio-accent) 52%,var(--portfolio-line)) 12%,color-mix(in srgb,var(--portfolio-accent) 52%,var(--portfolio-line)) 88%,transparent); content: ''; }
.system-flow li { position: relative; z-index: 1; min-width: 0; min-height: 0; flex-direction: column; align-items: center; justify-content: flex-start; gap: .8rem; padding: 0 .65rem; border: 0; border-radius: 0; background: transparent; box-shadow: none; color: var(--portfolio-muted); font-size: .78rem; font-weight: 700; text-align: center; }
.system-flow li+li { border: 0; }
.system-flow span { width: 2.4rem; border: .45rem solid var(--portfolio-bg); background: color-mix(in srgb,var(--portfolio-accent) 14%,var(--portfolio-surface)); color: var(--portfolio-accent); font-size: .62rem; font-weight: 900; box-sizing: content-box; }
.system-flow li:last-child { background: transparent; color: var(--portfolio-text); }
.system-flow li:last-child span { background: var(--portfolio-accent); color: #fff; box-shadow: 0 0 0 .35rem color-mix(in srgb,var(--portfolio-accent) 10%,transparent); }
.service-grid { display: grid; grid-template-columns: repeat(12,minmax(0,1fr)); gap: .85rem; margin-top: 2.75rem; background: transparent; }
.service-grid article { position: relative; min-height: 10.5rem; grid-column: span 3; padding: 1.5rem; overflow: hidden; border: 0; border-radius: 1.5rem; background: color-mix(in srgb,var(--portfolio-surface) 82%,transparent); box-shadow: 0 1rem 3rem color-mix(in srgb,#000 8%,transparent); }
.service-grid article::after { position: absolute; inset-block: 1.4rem; inset-inline-end: 0; width: 2px; border-radius: 2px; background: color-mix(in srgb,var(--portfolio-accent) 32%,transparent); content: ''; }
.service-grid article:first-child { grid-column: span 4; background: linear-gradient(145deg,color-mix(in srgb,var(--portfolio-accent) 14%,var(--portfolio-surface)),color-mix(in srgb,var(--portfolio-surface) 84%,transparent)); }
.service-grid article:nth-child(2) { grid-column: span 3; }
.service-grid article:nth-child(3) { grid-column: span 3; }
.service-grid article:last-child { grid-column: span 2; }
.service-grid article>span { display: grid; width: 2.15rem; aspect-ratio: 1; place-items: center; border-radius: .72rem; background: color-mix(in srgb,var(--portfolio-accent) 13%,transparent); color: var(--portfolio-accent); font-size: .68rem; font-weight: 900; }
.service-grid h3 { max-width: 16rem; margin-top: 1.4rem; font-size: clamp(1rem,1.2vw,1.15rem); }
.service-grid p { margin-top: .45rem; }
.media-bridge--services { max-width: none; white-space: nowrap; }

/* Visual foundations: type specimen, colour field and compact design rules. */
#design-foundations .foundation-specs { grid-template-columns: .82fr 1.18fr; gap: 1rem; margin-top: 2.5rem; }
#design-foundations .foundation-specs article { min-height: 13.5rem; padding: clamp(1.4rem,2.5vw,2rem); border: 0; border-radius: 1.6rem; box-shadow: 0 1rem 3rem color-mix(in srgb,#000 8%,transparent); }
#design-foundations .foundation-type-spec { align-items: flex-end; background: linear-gradient(145deg,color-mix(in srgb,var(--portfolio-accent) 16%,var(--portfolio-surface)),color-mix(in srgb,var(--portfolio-surface) 78%,transparent)); }
#design-foundations .foundation-type-spec>span { width: clamp(5.5rem,8vw,7.5rem); border: 0; border-radius: 1.25rem; background: color-mix(in srgb,var(--portfolio-bg) 62%,transparent); color: var(--portfolio-text); font-size: clamp(2rem,3.4vw,3.2rem); line-height: 1; }
#design-foundations .foundation-colour-spec { background: color-mix(in srgb,var(--portfolio-surface) 82%,transparent); }
#design-foundations .colour-list { gap: .55rem; }
#design-foundations .colour-list li { gap: .65rem; font-weight: 700; }
#design-foundations .colour-list i { height: 6.25rem; border: 0; border-radius: 1rem; box-shadow: inset 0 0 0 1px rgb(255 255 255 / 9%); }
#design-foundations .foundation-grid { grid-template-columns: repeat(4,minmax(0,1fr)); gap: 0; margin-top: 2.5rem; background: transparent; }
#design-foundations .foundation-grid article { position: relative; padding: 1.2rem 1.35rem; border-inline-start: 1px solid color-mix(in srgb,var(--portfolio-line) 72%,transparent); background: transparent; }
#design-foundations .foundation-grid article:first-child { border-inline-start: 0; }
#design-foundations .foundation-grid article>span { display: block; color: color-mix(in srgb,var(--portfolio-accent) 75%,var(--portfolio-muted)); font-size: .65rem; font-weight: 900; }
#design-foundations .foundation-grid h3 { margin-top: 1rem; }
#design-foundations .component-cloud li { border: 0; background: color-mix(in srgb,var(--portfolio-surface) 82%,transparent); }

/* Accessibility: an asymmetric checklist with visible, numbered affordances. */
.access-grid { display: grid; grid-template-columns: repeat(12,minmax(0,1fr)); gap: .8rem; margin-top: 2.5rem; }
.access-grid article { position: relative; display: grid; min-height: 9.5rem; grid-column: span 4; grid-template-columns: 1fr; align-content: center; align-items: start; gap: 1rem; padding: 1.35rem; border: 0; border-radius: 1.4rem; background: color-mix(in srgb,var(--portfolio-surface) 80%,transparent); box-shadow: 0 .8rem 2.5rem color-mix(in srgb,#000 7%,transparent); }
.access-grid article:first-child,.access-grid article:nth-child(6) { grid-column: span 5; background: linear-gradient(145deg,color-mix(in srgb,var(--portfolio-accent) 11%,var(--portfolio-surface)),color-mix(in srgb,var(--portfolio-surface) 78%,transparent)); }
.access-grid article:nth-child(2),.access-grid article:last-child { grid-column: span 7; }
.access-grid article>span { position: absolute; z-index: 0; inset-block-end: -.45rem; inset-inline-end: .8rem; color: var(--portfolio-accent); font-size: clamp(4rem,6vw,6.5rem); font-weight: 900; line-height: 1; opacity: .07; pointer-events: none; }
.access-grid article>div { position: relative; z-index: 1; }
.access-grid h3 { padding-inline-end: 1.5rem; }
#accessibility .disclaimer { margin-top: 1.25rem; padding: 0; border: 0; font-size: .74rem; }

/* Retrospective: evaluation rubric and findings are visually separated. */
#evaluation>.disclaimer { display: inline-block; max-width: 48rem; padding: .9rem 1.2rem; border: 0; border-radius: 999px; background: color-mix(in srgb,var(--portfolio-surface) 74%,transparent); }
#evaluation>.component-cloud { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: .65rem; margin-top: 2rem; }
#evaluation>.component-cloud li { display: flex; align-items: center; justify-content: flex-start; gap: .75rem; padding: .85rem 1rem; border: 0; border-radius: 1rem; background: transparent; color: var(--portfolio-muted); text-align: start; }
#evaluation>.component-cloud li span { display: grid; width: 1.85rem; flex: none; aspect-ratio: 1; place-items: center; border-radius: .6rem; background: color-mix(in srgb,var(--portfolio-accent) 12%,transparent); color: var(--portfolio-accent); font-size: .62rem; font-weight: 900; }
.evaluation-grid { gap: 1rem; margin-top: 2.25rem; }
.evaluation-grid>article { min-height: 18rem; padding: clamp(1.5rem,2.7vw,2.25rem); border: 0; border-radius: 1.6rem; background: color-mix(in srgb,var(--portfolio-surface) 80%,transparent); box-shadow: 0 1rem 3rem color-mix(in srgb,#000 8%,transparent); }
.evaluation-grid>article:last-child { background: linear-gradient(145deg,color-mix(in srgb,var(--portfolio-accent) 12%,var(--portfolio-surface)),color-mix(in srgb,var(--portfolio-surface) 78%,transparent)); }
.evaluation-grid ol { counter-reset: evaluation; gap: 0; margin-top: 1.4rem; list-style: none; }
.evaluation-grid li { counter-increment: evaluation; padding: .9rem 2.7rem .9rem 0; border-bottom: 1px solid color-mix(in srgb,var(--portfolio-line) 58%,transparent); }
[dir='ltr'] .evaluation-grid li { padding: .9rem 0 .9rem 2.7rem; }
.evaluation-grid li::before { inset-inline-start: auto; inset-inline-end: 0; display: grid; width: 1.8rem; aspect-ratio: 1; place-items: center; border-radius: .55rem; background: color-mix(in srgb,var(--portfolio-accent) 12%,transparent); content: counter(evaluation,decimal-leading-zero); font-size: .58rem; font-weight: 900; }
[dir='ltr'] .evaluation-grid li::before { inset-inline-start: 0; inset-inline-end: auto; }

/* Outcome: a calm editorial close rather than another bordered content card. */
.outcome-section { position: relative; max-width: 76rem; padding: clamp(2rem,5vw,4.5rem); overflow: hidden; border: 0; border-radius: 2rem; background: radial-gradient(circle at 12% 0,color-mix(in srgb,var(--portfolio-accent) 18%,transparent),transparent 30rem),color-mix(in srgb,var(--portfolio-surface) 76%,var(--portfolio-bg)); box-shadow: 0 1.5rem 4rem color-mix(in srgb,#000 10%,transparent); }
.outcome-section::before { position: absolute; inset-block-start: 0; inset-inline: 12%; height: 1px; background: linear-gradient(90deg,transparent,var(--portfolio-accent),transparent); content: ''; opacity: .7; }
.outcome-section>.case-intro { max-width: 48rem; }
.outcome-grid { gap: 1rem; margin-top: 2.75rem; }
.outcome-grid>article { padding: clamp(1.4rem,2.6vw,2.1rem); border: 0; border-radius: 1.4rem; background: color-mix(in srgb,var(--portfolio-bg) 58%,transparent); }
.outcome-grid>article:last-child { background: color-mix(in srgb,var(--portfolio-accent) 10%,var(--portfolio-bg)); }
.outcome-grid :is(ol,ul) { gap: 0; margin-top: 1.25rem; list-style: none; }
.outcome-grid li { padding: .8rem 1.35rem .8rem 0; border-bottom: 1px solid color-mix(in srgb,var(--portfolio-line) 55%,transparent); }
[dir='ltr'] .outcome-grid li { padding: .8rem 0 .8rem 1.35rem; }
.outcome-grid li:last-child { border-bottom: 0; }
.outcome-grid li::before { inset-block-start: 1.15rem; width: .38rem; aspect-ratio: 1; border-radius: 50%; background: var(--portfolio-accent); content: ''; }
@media(max-width:900px){.fact-grid,.card-grid,.service-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.ecosystem-map{grid-template-columns:repeat(2,minmax(0,1fr))}.ecosystem-map article,.ecosystem-map article:nth-child(n){grid-column:auto}.ecosystem-map article:first-child{grid-column:1/-1}.system-flow{grid-template-columns:repeat(3,minmax(0,1fr))}.site-map>div{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:767px){.method-wrap{padding-inline:var(--portfolio-gutter)}.method-note{font-size:.76rem}.case-outline{top:4rem;display:block;margin-bottom:4rem}.case-outline>p{min-height:3.5rem;justify-content:center;border-inline-end:0;border-bottom:1px solid var(--portfolio-line)}.case-outline li{flex:none}.case-outline a{min-height:3.75rem}.case-section{margin-top:6rem;padding-inline:var(--portfolio-gutter);scroll-margin-top:8rem}.split-copy,.role-layout,.evaluation-grid,.outcome-grid,.risk-framing{grid-template-columns:1fr}.role-layout .check-list{grid-template-columns:1fr}.fact-grid,.card-grid,.card-grid--three,.principle-grid,.service-grid,.site-map>div,.asset-grid,.comparison-grid,.access-grid,.ui-page-grid,.foundation-specs,.vista-media-pair,.needs-list,.flow-list,.decision-list{grid-template-columns:1fr}.needs-list article:last-child{grid-column:auto}.ecosystem-map{grid-template-columns:1fr}.ecosystem-map article,.ecosystem-map article:nth-child(n){grid-column:auto}.asset-placeholder--hero{min-height:16rem}.decision-list dl{grid-template-columns:1fr}.journey{padding:1rem .7rem;overflow-x:auto;scroll-snap-type:x mandatory}.journey li{min-width:7rem;scroll-snap-align:start}.journey li:not(:last-child)::after{width:calc(100% - 1.4rem);inset-inline-start:calc(50% + .7rem)}.system-flow{grid-template-columns:repeat(2,minmax(0,1fr))}.comparison-grid div{min-height:10rem}.vista-window__bar{min-height:2.4rem}.vista-result-stage{padding:.75rem}.vista-media--overview .vista-window,.vista-media-pair .vista-window,.vista-media-pair--products .vista-window,.vista-window--result{height:24rem}.vista-media-expand{inset-block-start:3rem}.vista-media-dialog{width:100vw;max-width:100vw;height:100dvh;max-height:100dvh;border-radius:0}}
@media(max-width:767px){
  .method-note{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.85rem;text-align:center}
  .method-note__icon{margin-inline:auto}
  .method-note>div{width:100%;text-align:center}
  .method-note strong,.method-note p{text-align:center}
}
@media(max-width:639px){.vista-case :deep(.case-hero__title){max-width:20ch;font-size:clamp(1.75rem,7.8vw,2.25rem)}}
@media(max-width:900px){
  .service-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .service-grid article,.service-grid article:first-child,.service-grid article:nth-child(2),.service-grid article:nth-child(3),.service-grid article:last-child{grid-column:auto}
  #design-foundations .foundation-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  #design-foundations .foundation-grid article:nth-child(3){border-inline-start:0}
  .access-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
  .access-grid article,.access-grid article:first-child,.access-grid article:nth-child(2),.access-grid article:nth-child(6),.access-grid article:last-child{grid-column:auto}
  .access-grid article:last-child{grid-column:1/-1}
}
@media(max-width:767px){
  .system-flow{grid-template-columns:1fr;gap:.4rem;padding-inline:1rem}
  .system-flow::before{inset-block:1.2rem;inset-inline-start:2.18rem;inset-inline-end:auto;width:1px;height:auto;background:linear-gradient(transparent,color-mix(in srgb,var(--portfolio-accent) 48%,var(--portfolio-line)) 10%,color-mix(in srgb,var(--portfolio-accent) 48%,var(--portfolio-line)) 90%,transparent)}
  .system-flow li{min-height:3.4rem;flex-direction:row;align-items:flex-start;gap:1rem;padding:0;text-align:start}
  .system-flow span{width:2.35rem;flex:none}
  .service-grid,#design-foundations .foundation-specs,#design-foundations .foundation-grid,.access-grid,#evaluation>.component-cloud{grid-template-columns:1fr}
  #design-foundations .foundation-grid article,#design-foundations .foundation-grid article:nth-child(3){padding-inline:0;border-inline-start:0;border-bottom:1px solid color-mix(in srgb,var(--portfolio-line) 58%,transparent)}
  #design-foundations .foundation-grid article:last-child{border-bottom:0}
  #design-foundations .foundation-type-spec{align-items:center}
  #design-foundations .colour-list i{height:4.5rem}
  .access-grid article,.access-grid article:last-child{grid-column:auto}
  .evaluation-grid>article{min-height:0}
  .outcome-section{border-radius:1.5rem}
  .media-bridge--services{max-width:48rem;white-space:normal}
}
@media(max-width:639px){
  .vista-case :deep(.case-hero__media){width:calc(100% - (var(--portfolio-gutter) * 2));margin:.75rem var(--portfolio-gutter) 0;border-radius:1.25rem;box-shadow:0 .8rem 2rem rgb(0 0 0 / 14%)}
  #role-scope,#ecosystem,#users-needs{margin-top:4.25rem}
  #role-scope :deep(.section-heading h2),#ecosystem :deep(.section-heading h2),#users-needs :deep(.section-heading h2){font-size:1.85rem;line-height:1.25}
  #role-scope .case-intro,#ecosystem .case-intro,#users-needs .case-intro{margin-top:.8rem;font-size:.88rem;line-height:1.7}
  .role-layout{gap:.7rem;margin-top:1.35rem}
  .role-layout>article{padding:1rem;border-radius:1.1rem;box-shadow:0 .55rem 1.6rem color-mix(in srgb,#000 7%,transparent)}
  .role-layout h3{font-size:.95rem}
  .role-layout .check-list{grid-template-columns:repeat(2,minmax(0,1fr));gap:0 .75rem;margin-top:.65rem}
  .role-layout .check-list li{padding:.48rem 1rem .48rem 0;font-size:.72rem;line-height:1.5}
  .role-layout .check-list li::before{inset-block-start:.57rem}
  .scope-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 .75rem;margin-top:.65rem}
  .scope-list div{display:block;padding:.5rem 0;border-top:1px solid color-mix(in srgb,var(--portfolio-line) 55%,transparent)}
  .scope-list dt{font-size:.68rem}
  .scope-list dd{margin-top:.18rem;font-size:.72rem;text-align:start}
  .ecosystem-map{grid-template-columns:repeat(2,minmax(0,1fr));gap:.65rem;margin-top:1.35rem}
  .ecosystem-map article,.ecosystem-map article:nth-child(n){min-height:0;grid-column:auto;padding:.9rem;border-radius:1rem;box-shadow:0 .55rem 1.6rem color-mix(in srgb,#000 7%,transparent)}
  .ecosystem-map article:first-child{grid-column:1/-1}
  .ecosystem-map article::after{inset-inline-start:1rem;width:2rem}
  .ecosystem-map h3{margin-top:.35rem;font-size:.86rem;line-height:1.45}
  .ecosystem-map ul{gap:.3rem;margin-top:.65rem}
  .ecosystem-map li{padding:.32rem .48rem;font-size:.64rem}
  #ecosystem .insight{margin-top:1rem;padding:1rem}
  #ecosystem .insight p{font-size:.88rem;line-height:1.65}
  .needs-list{grid-template-columns:repeat(2,minmax(0,1fr));gap:.65rem;margin-top:1.35rem}
  .needs-list article{display:block;min-height:0;padding:.95rem;border-radius:1rem;box-shadow:0 .55rem 1.6rem color-mix(in srgb,#000 7%,transparent)}
  .needs-list article:last-child{grid-column:1/-1}
  .needs-list article>span{width:1.8rem;margin-bottom:.65rem;border-radius:.55rem;font-size:.62rem}
  .needs-list h3{font-size:.84rem;line-height:1.5}
  .needs-list p{margin-top:.3rem;font-size:.72rem;line-height:1.55}
  .ecosystem-map article,.needs-list article{position:relative;overflow:hidden}
  .ecosystem-map article>span,.needs-list article>span{position:absolute;z-index:0;inset-block-end:-.55rem;inset-inline-end:.45rem;display:block;width:auto;margin:0;border:0;border-radius:0;background:transparent;color:var(--portfolio-accent);font-size:3.8rem;font-weight:900;line-height:1;opacity:.075;pointer-events:none}
  .ecosystem-map article>*:not(span),.needs-list article>div{position:relative;z-index:1}
  .ecosystem-map article{padding:.8rem .85rem}
  .needs-list article{padding:.85rem}
  #user-flows,#ux-decisions{margin-top:4.25rem}
  #user-flows :deep(.section-heading h2),#ux-decisions :deep(.section-heading h2){font-size:1.85rem;line-height:1.2}
  #user-flows .case-intro{margin-top:.8rem;font-size:.88rem;line-height:1.7}
  .flow-list,.decision-list{display:flex;gap:.7rem;margin-top:1.35rem;margin-inline:calc(var(--portfolio-gutter) * -1);padding:0 var(--portfolio-gutter) .4rem;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}
  .flow-list::-webkit-scrollbar,.decision-list::-webkit-scrollbar{display:none}
  .flow-list article,.decision-list article{min-width:min(84vw,18rem);padding:1rem;border-radius:1.1rem;box-shadow:0 .65rem 1.8rem color-mix(in srgb,#000 8%,transparent);scroll-snap-align:center}
  .flow-list header,.decision-list header{gap:.65rem}
  .flow-list header>span,.decision-list header>span{width:1.9rem;border-radius:.6rem}
  .flow-list h3,.decision-list h3{font-size:.92rem;line-height:1.45}
  .flow-list ol{display:flex;flex-wrap:wrap;gap:.4rem;margin-top:.8rem}
  .flow-list li{display:flex;min-height:0;width:auto;align-items:center;gap:.35rem;padding:.35rem .48rem;border-radius:999px;background:color-mix(in srgb,var(--portfolio-bg) 58%,transparent);font-size:.67rem;line-height:1.25}
  .flow-list li:not(:last-child)::after{display:none}
  .flow-list i{width:1.35rem;flex:none}
  .flow-list li>span{padding:0}
  .flow-list li:last-child{padding-bottom:.35rem}
  .flow-list li:last-child i{box-shadow:none}
  .decision-list dl{grid-template-columns:repeat(2,minmax(0,1fr));gap:.45rem;margin-top:.8rem}
  .decision-list dl div{min-height:0;padding:.7rem;border-radius:.75rem}
  .decision-list dt{font-size:.64rem}
  .decision-list dd{margin-top:.35rem;font-size:.68rem;line-height:1.55}
  #risk-assessment,#service-pages,#ui-pages,#design-foundations,#accessibility{margin-top:4.25rem}
  #risk-assessment :deep(.section-heading h2),#service-pages :deep(.section-heading h2),#ui-pages :deep(.section-heading h2),#design-foundations :deep(.section-heading h2),#accessibility :deep(.section-heading h2){font-size:1.85rem;line-height:1.2}
  #risk-assessment>.disclaimer{margin-top:.8rem;padding:.7rem .85rem;border:0;border-radius:.85rem;background:color-mix(in srgb,var(--portfolio-surface) 68%,transparent);font-size:.68rem;line-height:1.65}
  .risk-framing{grid-template-columns:repeat(2,minmax(0,1fr));gap:.55rem;margin-top:1rem}
  .risk-framing>article{min-height:0;padding:.85rem;border-radius:1rem;box-shadow:0 .55rem 1.6rem color-mix(in srgb,#000 7%,transparent)}
  .risk-framing article p{margin-top:.4rem;font-size:.72rem;line-height:1.6}
  .journey{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.4rem;margin-top:.8rem;padding:.7rem;border-radius:1rem;overflow:visible}
  .journey li{display:flex;min-width:0;min-height:0;flex-direction:row;align-items:center;justify-content:center;gap:.35rem;padding:.4rem .25rem;border-radius:999px;background:color-mix(in srgb,var(--portfolio-bg) 56%,transparent);font-size:.61rem;line-height:1.3;text-align:center}
  .journey li:not(:last-child)::after{display:none}
  .journey span{width:1.35rem;flex:none}
  .journey li:last-child span{box-shadow:none}
  #risk-assessment>.pill-list{gap:.35rem;margin-top:.75rem}
  #risk-assessment>.pill-list li{padding:.35rem .5rem;font-size:.62rem}
  .vista-result-stage{gap:.8rem;margin-top:1.15rem;padding:.85rem;border:0;border-radius:1.1rem}
  .vista-result-stage>figcaption h3{margin-top:.3rem;font-size:1.15rem}
  .vista-result-stage>figcaption p{margin-top:.35rem;font-size:.72rem;line-height:1.6}
  .vista-window--result{height:15rem}
  #service-pages>.case-intro,#ui-pages>.case-intro,#design-foundations>.case-intro,#accessibility>.case-intro{margin-top:.8rem;font-size:.88rem;line-height:1.7}
  .system-flow{grid-template-columns:repeat(3,minmax(0,1fr));gap:.4rem;margin-top:1rem;padding:0}
  .system-flow::before{display:none}
  .system-flow li{min-height:0;flex-direction:row;align-items:center;justify-content:center;gap:.35rem;padding:.48rem .25rem;border-radius:999px;background:color-mix(in srgb,var(--portfolio-surface) 78%,transparent);font-size:.62rem;line-height:1.3;text-align:center}
  .system-flow span{width:1.35rem;flex:none;border:0;box-sizing:border-box}
  .system-flow li:last-child{background:color-mix(in srgb,var(--portfolio-accent) 10%,var(--portfolio-surface))}
  .system-flow li:last-child span{box-shadow:none}
  .service-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:.55rem;margin-top:.8rem}
  .service-grid article,.service-grid article:first-child,.service-grid article:nth-child(2),.service-grid article:nth-child(3),.service-grid article:last-child{min-height:0;grid-column:auto;padding:.8rem;border-radius:.95rem}
  .service-grid article::after{inset-block:.8rem}
  .service-grid article>span{width:1.6rem;border-radius:.5rem;font-size:.58rem}
  .service-grid h3{margin-top:.55rem;font-size:.82rem;line-height:1.45}
  .service-grid p{margin-top:.2rem;font-size:.68rem;line-height:1.45}
  #service-pages>.system-note{margin-top:.8rem;padding:.8rem;font-size:.72rem;line-height:1.55}
  #service-pages>.media-bridge{margin-top:1rem;font-size:.72rem;line-height:1.6}
  .vista-media-pair--services,.vista-media-pair--products{display:flex;gap:.7rem;margin-top:1rem;margin-inline:calc(var(--portfolio-gutter) * -1);padding:0 var(--portfolio-gutter) .4rem;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}
  .vista-media-pair--services::-webkit-scrollbar,.vista-media-pair--products::-webkit-scrollbar{display:none}
  .vista-media-pair--services .vista-media,.vista-media-pair--products .vista-media{min-width:min(84vw,18rem);scroll-snap-align:center}
  .vista-media-pair--services .vista-window,.vista-media-pair--products .vista-window{height:15rem;border-radius:1.1rem}
  .vista-media>figcaption{margin-top:.65rem}
  .vista-media>figcaption h3{font-size:.88rem}
  .vista-media>figcaption p{margin-top:.2rem;font-size:.68rem;line-height:1.55}
  #design-foundations .foundation-specs{gap:.65rem;margin-top:1.1rem}
  #design-foundations .foundation-specs article{min-height:0;padding:1rem;border-radius:1.1rem}
  #design-foundations .foundation-type-spec>span{width:4rem;border-radius:.9rem;font-size:1.7rem}
  #design-foundations .foundation-specs h3{font-size:.9rem}
  #design-foundations .foundation-specs p{font-size:.72rem;line-height:1.5}
  #design-foundations .foundation-specs small{margin-top:.3rem;font-size:.62rem;line-height:1.45}
  #design-foundations .colour-list{margin-top:.65rem}
  #design-foundations .colour-list i{height:2.5rem;border-radius:.65rem}
  #design-foundations .colour-list span{font-size:.58rem}
  #design-foundations .foundation-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:0 .75rem;margin-top:1rem}
  #design-foundations .foundation-grid article,#design-foundations .foundation-grid article:nth-child(3){padding:.7rem 0;border-bottom:1px solid color-mix(in srgb,var(--portfolio-line) 58%,transparent)}
  #design-foundations .foundation-grid h3{margin-top:.35rem;font-size:.78rem}
  #design-foundations .foundation-grid p{margin-top:.25rem;font-size:.66rem;line-height:1.5}
  #design-foundations>.component-cloud{gap:.3rem;margin-top:.8rem}
  #design-foundations>.component-cloud li{padding:.35rem .5rem;font-size:.6rem}
  .access-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:.55rem;margin-top:1.1rem}
  .access-grid article,.access-grid article:last-child{min-height:0;grid-column:auto;align-content:start;padding:.85rem;border-radius:1rem;box-shadow:0 .55rem 1.6rem color-mix(in srgb,#000 7%,transparent)}
  .access-grid article:last-child{grid-column:1/-1}
  .access-grid article>span{inset-block-end:-.4rem;inset-inline-end:.35rem;font-size:3.8rem}
  .access-grid h3{padding:0;font-size:.82rem;line-height:1.45}
  .access-grid p{margin-top:.25rem;font-size:.68rem;line-height:1.5}
  #evaluation,#outcome-reflection{margin-top:4.25rem}
  #evaluation :deep(.section-heading h2),#outcome-reflection :deep(.section-heading h2){font-size:1.85rem;line-height:1.2}
  #evaluation>.disclaimer{margin-top:.8rem;padding:.7rem .85rem;border-radius:.85rem;font-size:.68rem;line-height:1.65}
  #evaluation>.component-cloud{grid-template-columns:repeat(2,minmax(0,1fr));gap:.45rem;margin-top:1rem}
  #evaluation>.component-cloud li{gap:.5rem;padding:.55rem .6rem;border-radius:.75rem;background:color-mix(in srgb,var(--portfolio-surface) 66%,transparent);font-size:.66rem;line-height:1.45}
  #evaluation>.component-cloud li span{width:1.5rem;border-radius:.45rem;font-size:.54rem}
  .evaluation-grid{display:flex;gap:.7rem;margin-top:1rem;margin-inline:calc(var(--portfolio-gutter) * -1);padding:0 var(--portfolio-gutter) .4rem;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}
  .evaluation-grid::-webkit-scrollbar{display:none}
  .evaluation-grid>article{min-width:min(84vw,18rem);min-height:0;padding:.85rem;border-radius:1rem;box-shadow:0 .55rem 1.5rem color-mix(in srgb,#000 7%,transparent);scroll-snap-align:center}
  .evaluation-grid h3{font-size:.88rem}
  .evaluation-grid ol{margin-top:.5rem}
  .evaluation-grid li,.evaluation-grid [dir='ltr'] li{padding:.42rem 1.9rem .42rem 0;font-size:.66rem;line-height:1.4}
  .evaluation-grid li::before,.evaluation-grid [dir='ltr'] li::before{right:0;left:auto;width:1.4rem;border-radius:.42rem;font-size:.5rem}
  #outcome-reflection{padding:1.35rem 1rem;border-radius:0}
  #outcome-reflection>.case-intro{margin-top:.8rem;font-size:.86rem;line-height:1.7}
  .outcome-grid{display:flex;gap:.7rem;margin-top:1.1rem;margin-inline:-1rem;padding:0 1rem .4rem;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}
  .outcome-grid::-webkit-scrollbar{display:none}
  .outcome-grid>article{min-width:min(78vw,17rem);padding:1rem;border-radius:1rem;scroll-snap-align:center}
  .outcome-grid h3{font-size:.92rem}
  .outcome-grid :is(ol,ul){margin-top:.65rem}
  .outcome-grid li{padding:.55rem 1rem .55rem 0;font-size:.7rem;line-height:1.5}
  [dir='ltr'] .outcome-grid li{padding:.55rem 0 .55rem 1rem}
  .outcome-grid li::before{inset-block-start:.82rem}
}
@media(prefers-reduced-motion:reduce){.case-outline a{transition:none}}
</style>
