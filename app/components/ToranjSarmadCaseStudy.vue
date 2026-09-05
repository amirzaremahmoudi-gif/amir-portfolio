<script setup lang="ts">
import { toranjSarmadContent } from '~/data/toranjSarmad'

defineProps<{
  previous?: { path: string, title: string } | null
  next?: { path: string, title: string } | null
}>()

const { locale } = useI18n()
const content = computed(() => toranjSarmadContent[locale.value === 'fa' ? 'fa' : 'en'])
const activeSection = ref(1)
const outlineList = useTemplateRef<HTMLOListElement>('outlineList')
let sectionObserver: IntersectionObserver | undefined
const heroMedia = computed(() => content.value.media[0])
const finalMedia = computed(() => content.value.media.slice(1, 7))
const stateMedia = computed(() => content.value.media[7])
const motionMedia = computed(() => content.value.media.slice(8))
onMounted(() => {
  sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
    const id = visible[0]?.target.id.match(/section-(\d+)/)?.[1]
    if (id) activeSection.value = Number(id)
  }, { rootMargin: '-18% 0px -68% 0px' })

  document.querySelectorAll<HTMLElement>('.sarmad-case .case-section[id^="section-"]').forEach(section => sectionObserver?.observe(section))
})

watch(activeSection, async (section) => {
  await nextTick()
  outlineList.value?.querySelector<HTMLElement>(`[data-section="${section}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
})

onBeforeUnmount(() => sectionObserver?.disconnect())
</script>

<template>
  <article class="sarmad-case">
    <CaseStudyHero
      :title="content.hero.title"
      :summary="content.hero.summary"
      :meta="content.hero.meta"
    />

    <div class="portfolio-container">
      <CaseStudyMediaPlaceholder
        v-if="heroMedia"
        :index="1"
        v-bind="heroMedia"
      />
    </div>

    <div class="portfolio-container case-shell py-[var(--portfolio-section)]">
      <aside class="case-outline">
        <p class="eyebrow">
          {{ locale === 'fa' ? 'در این مطالعه' : 'In this study' }}
        </p>
        <ol ref="outlineList">
          <li
            v-for="(item, index) in content.outline"
            :key="item"
          >
            <a
              :href="`#section-${index + 1}`"
              :data-section="index + 1"
              :class="{ 'is-active': activeSection === index + 1 }"
              :aria-current="activeSection === index + 1 ? 'location' : undefined"
              @click="activeSection = index + 1"
            ><span>{{ String(index + 1).padStart(2, '0') }}</span>{{ item }}</a>
          </li>
        </ol>
      </aside>

      <main class="case-main">
        <section
          id="section-1"
          class="case-section case-section--context reveal-section"
        >
          <SectionHeading
            :index="content.context.kicker"
            :title="content.context.title"
          />
          <p class="case-lead">
            {{ content.context.lead }}
          </p>
          <div class="context-grid">
            <article
              v-for="item in content.context.complexity"
              :key="item[0]"
            >
              <h3>{{ item[0] }}</h3><p>{{ item[1] }}</p>
            </article>
          </div>
        </section>

        <section
          id="section-2"
          class="case-section reveal-section"
        >
          <SectionHeading
            :index="content.challenge.kicker"
            :title="content.challenge.title"
          />
          <p class="case-lead">
            {{ content.challenge.lead }}
          </p>
          <ul class="principle-list">
            <li
              v-for="(item, index) in content.challenge.principles"
              :key="item"
              :data-index="String(index + 1).padStart(2, '0')"
            >
              <UIcon name="i-lucide-sparkles" />{{ item }}
            </li>
          </ul>
        </section>

        <section
          id="section-3"
          class="case-section case-section--wide reveal-section"
        >
          <SectionHeading
            :index="content.architecture.kicker"
            :title="content.architecture.title"
          />
          <figure
            class="ia-map"
            :aria-label="content.architecture.caption"
          >
            <div
              v-for="(group, index) in content.architecture.groups"
              :key="group.title"
              class="ia-group"
            >
              <div class="ia-group__head">
                <span>{{ String(index + 1).padStart(2, '0') }}</span>
                <strong>{{ group.title }}</strong>
              </div>
              <ul>
                <li
                  v-for="item in group.items"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </figure>
        </section>

        <section
          id="section-4"
          class="case-section case-section--wide reveal-section"
        >
          <SectionHeading
            :index="content.primaryFlow.kicker"
            :title="content.primaryFlow.title"
          />
          <div class="primary-flow">
            <article
              v-for="(step, index) in content.primaryFlow.steps"
              :key="step.label"
              class="flow-node"
              :data-kind="step.kind"
            >
              <div class="flow-node__top">
                <span>{{ String(index + 1).padStart(2, '0') }}</span><small>{{ step.kind }}</small>
              </div>
              <div class="flow-node__copy">
                <h3>{{ step.label }}</h3><p>{{ step.detail }}</p>
              </div>
            </article>
          </div>
        </section>

        <section
          id="section-5"
          class="case-section reveal-section"
        >
          <SectionHeading
            :index="content.supporting.kicker"
            :title="content.supporting.title"
          />
          <div class="supporting-flows">
            <article
              v-for="(flow, flowIndex) in content.supporting.flows"
              :key="flow.title"
            >
              <div class="supporting-flows__head">
                <div class="supporting-flows__identity">
                  <UIcon :name="['i-lucide-log-in', 'i-lucide-circle-dollar-sign', 'i-lucide-undo-2', 'i-lucide-chart-line'][flowIndex]" />
                  <h3>{{ flow.title }}</h3>
                </div>
                <span class="supporting-flows__index">{{ String(flowIndex + 1).padStart(2, '0') }}</span>
              </div>
              <ol>
                <li
                  v-for="(step, index) in flow.steps"
                  :key="step"
                >
                  <span>{{ index + 1 }}</span><p>{{ step }}</p>
                </li>
              </ol>
            </article>
          </div>
        </section>

        <section
          id="section-6"
          class="case-section case-section--wide reveal-section"
        >
          <SectionHeading
            :index="content.wireframes.kicker"
            :title="content.wireframes.title"
          />
          <div class="wireframe-grid">
            <figure
              v-for="screen in content.wireframes.screens"
              :key="screen.n"
              class="wireframe-card"
            >
              <div class="wireframe-phone">
                <div class="wireframe-status">
                  <span>9:41</span><i /><i />
                </div>
                <div class="wireframe-page">
                  <small>{{ screen.eyebrow }}</small><h3>{{ screen.title }}</h3>
                  <div
                    v-for="(block, index) in screen.blocks"
                    :key="block"
                    class="wireframe-block"
                    :data-priority="index === screen.blocks.length - 1 ? 'action' : index === 0 ? 'lead' : 'body'"
                  >
                    <span>{{ block }}</span>
                  </div>
                </div>
              </div>
              <figcaption><span>{{ screen.n }}</span>{{ screen.title }}</figcaption>
            </figure>
          </div>
        </section>

        <section
          id="section-7"
          class="case-section reveal-section"
        >
          <SectionHeading
            :index="content.decisions.kicker"
            :title="content.decisions.title"
          />
          <div class="decision-list">
            <article
              v-for="(item, index) in content.decisions.items"
              :key="item[0]"
            >
              <span>{{ String(index + 1).padStart(2, '0') }}</span><h3>{{ item[0] }}</h3>
            </article>
          </div>
        </section>

        <section
          id="section-8"
          class="case-section case-section--wide reveal-section"
        >
          <SectionHeading
            :index="content.finalUi.kicker"
            :title="content.finalUi.title"
          />
          <div class="media-grid media-grid--editorial">
            <CaseStudyMediaPlaceholder
              v-for="(media, index) in finalMedia"
              :key="media.asset"
              :index="index + 2"
              v-bind="media"
            />
          </div>
        </section>

        <section
          id="section-9"
          class="case-section reveal-section"
        >
          <SectionHeading
            :index="content.interaction.kicker"
            :title="content.interaction.title"
          />
          <div class="interaction-layout">
            <ul class="interaction-list">
              <li
                v-for="(item, index) in content.interaction.items"
                :key="item"
              >
                <span>{{ String(index + 1).padStart(2, '0') }}</span><p>{{ item }}</p>
              </li>
            </ul>
            <div class="motion-slots">
              <CaseStudyMediaPlaceholder
                v-for="(media, index) in motionMedia"
                :key="media.asset"
                :index="index + 9"
                v-bind="media"
                compact
              />
            </div>
          </div>
        </section>

        <section
          id="section-10"
          class="case-section reveal-section"
        >
          <SectionHeading
            :index="content.system.kicker"
            :title="content.system.title"
          />
          <div class="system-grid">
            <article
              v-for="(item, index) in content.system.items"
              :key="item[0]"
              :data-tone="index"
            >
              <span>{{ String(index + 1).padStart(2, '0') }}</span><h3>{{ item[0] }}</h3><p>{{ item[1] }}</p>
            </article>
          </div>
        </section>

        <section
          id="section-11"
          class="case-section case-section--wide reveal-section"
        >
          <SectionHeading
            :index="content.states.kicker"
            :title="content.states.title"
          />
          <div class="state-layout">
            <div class="state-grid">
              <article
                v-for="(state, index) in content.states.items"
                :key="state"
                :data-state="index"
              >
                <UIcon :name="['i-lucide-loader-circle', 'i-lucide-panels-top-left', 'i-lucide-inbox', 'i-lucide-circle-alert', 'i-lucide-wifi-off', 'i-lucide-triangle-alert', 'i-lucide-circle-check', 'i-lucide-clock-3'][index]" /><span>{{ state }}</span>
              </article>
            </div>
            <CaseStudyMediaPlaceholder
              v-if="stateMedia"
              :index="8"
              v-bind="stateMedia"
              compact
            />
          </div>
        </section>

        <section
          id="section-12"
          class="case-section case-section--wide reveal-section"
        >
          <SectionHeading
            :index="content.review.kicker"
            :title="content.review.title"
          />
          <div class="review-grid">
            <article
              v-for="(column, index) in content.review.columns"
              :key="column.title"
              :data-column="index"
            >
              <h3>{{ column.title }}</h3><ul>
                <li
                  v-for="item in column.items"
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

    <div class="portfolio-container pb-[var(--portfolio-section)]">
      <ProjectNavigation
        :previous="previous"
        :next="next"
      />
    </div>
  </article>
</template>

<style scoped>
.sarmad-case { --rose: #a75f55; --afran: #8b7541; }
.evidence-pill { display: inline-flex; align-items: center; gap: .55rem; padding: .55rem .75rem; background: var(--portfolio-surface); color: var(--portfolio-muted); font-size: .68rem; font-weight: 700; }
.evidence-dot { display: inline-block; width: .5rem; height: .5rem; flex: 0 0 auto; border-radius: 50%; background: var(--portfolio-muted); }
.evidence-dot--fact { background: #62806b; }.evidence-dot--reconstructed { background: var(--portfolio-accent); }.evidence-dot--todo { background: #b18a43; }
.case-shell { display: block; }
.case-outline { position: sticky; top: 4.75rem; z-index: 20; display: flex; width: 100vw; align-items: stretch; overflow: hidden; margin-inline: calc(50% - 50vw); margin-bottom: clamp(4rem, 7vw, 7rem); padding-inline: max(var(--portfolio-gutter), calc((100vw - var(--portfolio-max)) / 2)); border-block: 1px solid var(--portfolio-line); background: color-mix(in srgb, var(--portfolio-bg) 94%, transparent); box-shadow: 0 .75rem 2rem rgb(0 0 0 / 5%); backdrop-filter: blur(18px); }
.case-outline > p { display: flex; min-height: 4.75rem; flex: none; align-items: center; padding-inline: .75rem 1.25rem; border-inline-end: 1px solid var(--portfolio-line); color: var(--portfolio-text); font-size: .92rem; white-space: nowrap; }
.case-outline ol { display: flex; flex: 1; gap: .25rem; min-width: 0; margin: 0; overflow-x: auto; scrollbar-width: none; }
.case-outline ol::-webkit-scrollbar { display: none; }
.case-outline li { min-width: 0; flex: 1 1 0; }
.case-outline li + li { border-top: 0; }
.case-outline a { position: relative; display: flex; min-height: 4.75rem; align-items: center; justify-content: center; gap: .4rem; padding-inline: .45rem; border-inline-end: 1px solid color-mix(in srgb, var(--portfolio-line) 65%, transparent); color: var(--portfolio-muted); font-size: clamp(.72rem, .78vw, .9rem); font-weight: 650; white-space: nowrap; transition: color var(--motion-control) var(--ease-standard), background-color var(--motion-control) var(--ease-standard); }
.case-outline a::after { position: absolute; inset-inline: 1rem; bottom: 0; height: 2px; background: var(--portfolio-accent); content: ''; opacity: 0; transform: scaleX(.35); transition: opacity var(--motion-control), transform var(--motion-control) var(--ease-enter); }
.case-outline a.is-active { color: var(--portfolio-text); }.case-outline a.is-active::after { opacity: 1; transform: scaleX(1); }.case-outline a span { color: var(--portfolio-accent); font-size: .8rem; font-weight: 800; font-variant-numeric: tabular-nums; }
.case-main { min-width: 0; max-width: 76rem; margin-inline: auto; counter-reset: case-section; }
.case-section { position: relative; isolation: isolate; max-width: 66rem; margin-top: clamp(8rem, 13vw, 13rem); text-align: center; counter-increment: case-section; }
.case-section::before { position:absolute; z-index:1; inset-block-start:-4.75rem; inset-inline-start:auto; inset-inline-end:auto; right:auto; left:50%; display:block; width:auto; height:auto; padding:.15rem .8rem .55rem; border:0; border-radius:0; background:transparent; color:var(--portfolio-accent); font-size:1.75rem; font-weight:850; letter-spacing:-.04em; line-height:1; content:counter(case-section, decimal-leading-zero); pointer-events:none; transform:translateX(-50%); }
.case-section:nth-child(even)::before { inset-inline-start:auto; inset-inline-end:auto; right:auto; left:50%; }
.case-section:first-child { margin-top: 0; }.case-section--wide { max-width: 66rem; }
.case-section--context { max-width: 66rem; text-align: center; }
.case-section :deep(.section-heading) { align-items: center; text-align: center; }
.case-section :deep(.section-heading__kicker) { display: flex; align-items: center; gap: .8rem; }
.case-section :deep(.section-heading__kicker::before),.case-section :deep(.section-heading__kicker::after) { width: 2rem; height: 1px; background: var(--portfolio-line); content: ''; }
.case-section :deep(.section-heading h2) { max-width: 34ch; margin-inline: auto; font-size: clamp(2rem, 2.4vw, 2.8rem); line-height: 1.25; }
.case-section :deep(.section-heading h2::after) { display: none; }
.case-section--context .case-lead { width: 100%; max-width: 66rem; margin: 2rem auto 0; color: color-mix(in srgb, var(--portfolio-accent) 62%, var(--portfolio-text)); font-size: clamp(1.15rem, 1.3vw, 1.4rem); font-weight: 650; line-height: 1.75; text-align: center; white-space: nowrap; }
.case-section--context .case-copy { width: 100%; max-width: 58rem; margin: .85rem auto 0; color: var(--portfolio-muted); font-size: clamp(1.02rem, 1.1vw, 1.15rem); line-height: 1.85; text-align: center; }
.case-lead { max-width: 54rem; margin: 2rem auto 0; color: color-mix(in srgb, var(--portfolio-accent) 58%, var(--portfolio-text)); font-size: clamp(1.15rem, 1.45vw, 1.5rem); font-weight: 650; line-height: 1.75; text-align: center; text-wrap: balance; }
.case-copy { max-width: 48rem; margin: 1.2rem auto 0; color: var(--portfolio-muted); font-size: clamp(.95rem, 1vw, 1.05rem); line-height: 1.9; text-align: center; text-wrap: pretty; }
.artifact-caption { display: inline-flex; align-items: center; gap: .6rem; margin-top: 1.35rem; color: var(--portfolio-muted); font-size: .78rem; font-weight: 650; letter-spacing: .02em; }.artifact-caption::before { width: 1.75rem; height: 1px; background: var(--portfolio-accent); content: ''; }
.context-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0; margin-top: 2rem; border-block: 1px solid var(--portfolio-line); background: transparent; text-align: center; }
.context-grid article { position: relative; display: flex; min-height: 8.25rem; overflow: hidden; flex-direction: column; align-items: center; justify-content: center; padding: 1.2rem; border: 0; background: transparent; text-align: center; }
.context-grid article + article { border-inline-start: 1px solid var(--portfolio-line); }
.context-grid h3 { position: relative; z-index: 1; margin-top: 0; color: var(--portfolio-accent); font-size: clamp(1.05rem, 1.15vw, 1.2rem); font-weight: 800; }
.context-grid p { position: relative; z-index: 1; margin-top: .65rem; color: var(--portfolio-muted); font-size: clamp(.92rem, .95vw, 1rem); line-height: 1.7; }
.system-grid span { color: var(--portfolio-accent); font-size: 1.35rem; font-weight: 600; }
.system-grid h3 { margin-top: 2.5rem; font-size: 1rem; }.system-grid p { margin-top: .75rem; color: var(--portfolio-muted); font-size: .82rem; line-height: 1.65; }
.principle-list { display:grid; grid-template-columns:repeat(4,1fr); gap:.75rem; margin-top:2rem; border:0; }.principle-list li { position:relative; display:flex; min-height:7rem; flex-direction:column; align-items:flex-start; justify-content:flex-end; gap:.8rem; overflow:hidden; padding:1.1rem; border:1px solid var(--portfolio-line); background:color-mix(in srgb,var(--portfolio-surface) 55%,transparent); font-size:.9rem; line-height:1.5; text-align:start; }.principle-list li::before { position:absolute; inset-block-start:.75rem; inset-inline-end:.85rem; color:color-mix(in srgb,var(--portfolio-accent) 42%,transparent); font-size:1.45rem; font-weight:800; content:attr(data-index); }.principle-list svg { color:var(--portfolio-accent); }
.ia-map { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:.75rem; margin-top:3rem; overflow:visible; background:transparent; }.ia-group { position:relative; min-width:0; min-height:14rem; overflow:hidden; padding:1.25rem; border:1px solid var(--portfolio-line); background:color-mix(in srgb,var(--portfolio-surface) 58%,transparent); text-align:start; }.ia-group::after { position:absolute; inset-block-end:-1.7rem; inset-inline-end:-.2rem; color:color-mix(in srgb,var(--portfolio-accent) 10%,transparent); font-size:6rem; font-weight:900; content:attr(data-index); }.ia-group__head { position:relative; z-index:1; display:flex; flex-direction:column; align-items:flex-start; gap:.45rem; padding-bottom:1.1rem; }.ia-group__head span { color:var(--portfolio-accent); font-size:.78rem; font-weight:800; }.ia-group__head strong { color:var(--portfolio-text); font-size:1.05rem; }.ia-group ul { position:relative; z-index:1; }.ia-group li { padding-block:.55rem; border-top:1px solid var(--portfolio-line); color:var(--portfolio-muted); font-size:.82rem; line-height:1.5; }
.primary-flow { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:.75rem; margin-top:3rem; overflow:visible; padding-bottom:0; background:transparent; }.flow-node { position:relative; display:flex; min-height:12.5rem; flex-direction:column; padding:1.2rem; border:1px solid var(--portfolio-line); background:color-mix(in srgb,var(--portfolio-surface) 58%,transparent); text-align:start; }.flow-node::before { position:absolute; inset-block-start:0; inset-inline:0; height:2px; background:var(--portfolio-accent); content:''; opacity:.45; }.flow-node[data-kind='decision'],.flow-node[data-kind='external'],.flow-node[data-kind='success'] { background:color-mix(in srgb,var(--portfolio-surface) 58%,transparent); }.flow-node__top { display:flex; justify-content:space-between; color:var(--portfolio-muted); }.flow-node__top span { color:var(--portfolio-accent); font-size:1rem; font-weight:800; }.flow-node__top small { display:none; }.flow-node h3 { margin-top:auto; color:var(--portfolio-text); font-size:1.05rem; }.flow-node p { margin-top:.65rem; color:var(--portfolio-muted); font-size:.82rem; line-height:1.65; }.flow-arrow { position:absolute; inset-inline-end:-1.15rem; top:50%; z-index:2; width:1.45rem; height:1.45rem; padding:.25rem; border:1px solid var(--portfolio-line); border-radius:50%; background:var(--portfolio-bg); color:var(--portfolio-accent); }.flow-node:nth-child(4) .flow-arrow { display:none; }
.supporting-flows { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:.75rem; margin-top:3rem; border:0; background:transparent; }.supporting-flows article { min-height:10rem; padding:1.25rem; border:1px solid var(--portfolio-line); background:color-mix(in srgb,var(--portfolio-surface) 58%,transparent); text-align:start; }.supporting-flows h3 { color:var(--portfolio-accent); font-size:1.05rem; }.supporting-flows ol { display:flex; flex-wrap:wrap; align-items:center; gap:.75rem 0; margin-top:1.5rem; }.supporting-flows li { display:flex; align-items:center; gap:.55rem; color:var(--portfolio-text); font-size:.82rem; }.supporting-flows li span { display:grid; width:1.65rem; height:1.65rem; flex:none; place-items:center; margin-inline-end:.15rem; border:1px solid var(--portfolio-line); border-radius:50%; background:transparent; color:var(--portfolio-accent); font-size:.68rem; }.supporting-flows li svg { width:1rem; margin-inline:.45rem; color:var(--portfolio-muted); }
.wireframe-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:3rem 1.5rem; margin-top:3rem; }.wireframe-phone { width:100%; aspect-ratio:9/16; overflow:hidden; padding:.65rem; border-radius:1.4rem; background:#d4d0c9; color:#34312d; }.dark .wireframe-phone { background:#777169; color:#181614; }.wireframe-status { display:flex; align-items:center; gap:.25rem; height:1.5rem; padding-inline:.5rem; font-size:.5rem; }.wireframe-status span { margin-inline-end:auto; }.wireframe-status i { width:.8rem; height:.3rem; border-radius:1rem; background:currentColor; opacity:.45; }.wireframe-page { display:flex; flex-direction:column; height:calc(100% - 1.5rem); padding:.75rem; border-radius:1rem; background:#efede8; }.wireframe-page small { font-size:.45rem; letter-spacing:.08em; text-transform:uppercase; opacity:.6; }.wireframe-page h3 { margin-top:.35rem; font-size:.75rem; }.wireframe-block { display:flex; align-items:center; min-height:3.2rem; margin-top:.65rem; padding:.6rem; border-radius:.35rem; background:#d7d4ce; font-size:.48rem; line-height:1.35; }.wireframe-block[data-priority='lead'] { min-height:4.8rem; }.wireframe-block[data-priority='action'] { min-height:2.4rem; margin-top:auto; background:#403d38; color:#f3f0ea; justify-content:center; }.wireframe-card figcaption { display:flex; justify-content:space-between; gap:1rem; padding-top:1rem; font-size:.74rem; }.wireframe-card figcaption span { color:var(--portfolio-accent); }
.decision-list { margin-top:3rem; }.decision-list article { display:grid; grid-template-columns:3rem 1fr; gap:1rem; padding-block:1.5rem; border-top:1px solid var(--portfolio-line); }.decision-list article:last-child { border-bottom:1px solid var(--portfolio-line); }.decision-list > article > span { color:var(--portfolio-accent); font-size:1.15rem; font-weight:600; }.decision-list h3 { font-size:1rem; }.decision-list p { margin-top:.6rem; color:var(--portfolio-muted); font-size:.84rem; line-height:1.7; }
.media-grid { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:3.5rem 1.5rem; margin-top:3rem; }.media-grid__wide { grid-column:1/-1; }
.interaction-layout { display:grid; grid-template-columns:minmax(0,1fr) minmax(14rem,.8fr); gap:3rem; margin-top:3rem; }.interaction-list li { display:flex; gap:.75rem; padding-block:1rem; border-top:1px solid var(--portfolio-line); font-size:.84rem; }.interaction-list li:last-child { border-bottom:1px solid var(--portfolio-line); }.interaction-list svg { flex:none; color:var(--portfolio-accent); }.motion-slots { display:grid; grid-template-columns:repeat(2,1fr); gap:1rem; }
.system-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; margin-top:3rem; background:var(--portfolio-line); }.system-grid article { min-height:12rem; padding:1.25rem; background:var(--portfolio-surface); }.system-grid article[data-tone='4'] { background:color-mix(in srgb,var(--rose) 18%,var(--portfolio-surface)); }.system-grid article[data-tone='5'] { background:color-mix(in srgb,var(--afran) 20%,var(--portfolio-surface)); }
.state-layout { display:grid; grid-template-columns:1.1fr .9fr; gap:2rem; margin-top:3rem; align-items:start; }.state-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1px; background:var(--portfolio-line); }.state-grid article { display:flex; align-items:center; gap:.75rem; min-height:6rem; padding:1rem; background:var(--portfolio-surface); font-size:.78rem; }.state-grid svg { color:var(--portfolio-muted); }.state-grid article[data-state='3'] svg,.state-grid article[data-state='4'] svg,.state-grid article[data-state='5'] svg { color:#b26745; }.state-grid article[data-state='6'] svg { color:#62806b; }.state-grid article[data-state='7'] svg { color:#b18a43; }
.review-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; margin-top:3rem; background:var(--portfolio-line); }.review-grid article { min-height:20rem; padding:1.5rem; background:var(--portfolio-surface); }.review-grid article[data-column='0'] { background:color-mix(in srgb,#62806b 15%,var(--portfolio-surface)); }.review-grid article[data-column='1'] { background:color-mix(in srgb,var(--portfolio-accent) 12%,var(--portfolio-surface)); }.review-grid h3 { font-size:1.4rem; font-weight:600; }.review-grid ul { margin-top:2rem; }.review-grid li { padding-block:.8rem; border-top:1px solid var(--portfolio-line); color:var(--portfolio-muted); font-size:.78rem; line-height:1.5; }
.outcome-section { max-width:64rem; padding:clamp(2rem,5vw,4.5rem); background:var(--portfolio-footer-bg); color:var(--portfolio-footer-text); }.outcome-section h2 { margin-top:2rem; max-width:50rem; font-size:clamp(3rem,6vw,6rem); line-height:.98; }.outcome-section p:last-child { max-width:40rem; margin-top:2rem; color:var(--portfolio-footer-muted); line-height:1.8; }
.evidence-ledger { display:grid; grid-template-columns:.8fr 1.2fr; gap:3rem; margin-top:5rem; padding-top:2rem; border-top:1px solid var(--portfolio-line); }.evidence-ledger > div > p:last-child { margin-top:1rem; color:var(--portfolio-muted); font-size:.8rem; line-height:1.6; }.evidence-ledger li { display:flex; gap:1rem; padding-block:1rem; border-top:1px solid var(--portfolio-line); }.evidence-ledger li:first-child { border-top:0; }.evidence-ledger strong { font-size:.72rem; }.evidence-ledger li p { margin-top:.3rem; color:var(--portfolio-muted); font-size:.72rem; line-height:1.55; }
.case-section > :is(.evidence-pill,.principle-list,.ia-map,.primary-flow,.supporting-flows,.wireframe-grid,.decision-list,.media-grid,.interaction-layout,.system-grid,.state-layout,.review-grid) { margin-top: clamp(2rem, 3.6vw, 3rem); }
.evidence-pill { padding: 0; background: transparent; color: var(--portfolio-muted); }
.principle-list { justify-content: center; gap: 0; border-block: 1px solid var(--portfolio-line); }
.principle-list li { flex: 1 1 12rem; justify-content: center; min-height: 5rem; padding: 1rem 1.25rem; border-inline-start: 1px solid var(--portfolio-line); background: transparent; color: var(--portfolio-text); font-size: .9rem; line-height: 1.65; }
.principle-list li:last-child { border-inline-end: 1px solid var(--portfolio-line); }
.ia-map,.system-grid,.state-grid,.review-grid,.supporting-flows { gap: 1px; border-block: 1px solid var(--portfolio-line); background: var(--portfolio-line); }
.ia-group,.system-grid article,.state-grid article,.review-grid article,.supporting-flows article,.flow-node { border-radius: 0; background: var(--portfolio-bg); box-shadow: none; transition: none; }
.ia-group { text-align: start; }.ia-group__head strong,.ia-group li { font-size: .82rem; }.ia-group li { line-height: 1.6; }
.primary-flow { gap: 1px; border-block: 1px solid var(--portfolio-line); background: var(--portfolio-line); }
.flow-node { min-height: 11.5rem; text-align: start; }.flow-node[data-kind='decision'],.flow-node[data-kind='external'],.flow-node[data-kind='success'] { background: var(--portfolio-bg); }.flow-node__top span { color: var(--portfolio-accent); }.flow-node h3 { color: var(--portfolio-text); font-size: 1rem; }.flow-node p { font-size: .8rem; }
.supporting-flows article { text-align: start; }.supporting-flows h3 { color: var(--portfolio-accent); font-size: 1.05rem; }.supporting-flows li { font-size: .8rem; }
.decision-list { border-block: 1px solid var(--portfolio-line); }.decision-list article { grid-template-columns: 3.5rem 1fr; padding: 1.4rem 1rem; border-top: 0; text-align: start; }.decision-list article + article { border-top: 1px solid var(--portfolio-line); }.decision-list article:last-child { border-bottom: 0; }.decision-list h3 { color: var(--portfolio-accent); font-size: 1.05rem; }.decision-list p { font-size: .9rem; }
.interaction-layout { padding-block: 1px; border-block: 1px solid var(--portfolio-line); text-align: start; }.interaction-list li { font-size: .9rem; line-height: 1.7; }
.system-grid article { display: flex; min-height: 10rem; flex-direction: column; align-items: center; justify-content: center; padding: 1.25rem; text-align: center; }.system-grid article[data-tone='4'],.system-grid article[data-tone='5'] { background: var(--portfolio-bg); }.system-grid span { color: color-mix(in srgb, var(--portfolio-accent) 32%, transparent); font-size: 1rem; }.system-grid h3 { margin-top: .8rem; color: var(--portfolio-accent); font-size: 1.05rem; }.system-grid p { font-size: .86rem; }
.state-grid article { justify-content: center; min-height: 5.5rem; font-size: .86rem; text-align: center; }
.review-grid article,.review-grid article[data-column='0'],.review-grid article[data-column='1'] { min-height: 17rem; background: var(--portfolio-bg); text-align: start; }.review-grid h3 { color: var(--portfolio-accent); font-size: 1.2rem; }.review-grid li { font-size: .86rem; }
.context-grid article:hover,.system-grid article:hover,.state-grid article:hover,.review-grid article:hover,.supporting-flows article:hover,.flow-node:hover { background: var(--portfolio-bg); box-shadow: none; transform: none; }
.primary-flow { scroll-snap-type: inline mandatory; }
.flow-node { scroll-snap-align: start; }
.wireframe-phone { border-radius: 1rem; box-shadow: none; transition: none; }.wireframe-card:hover .wireframe-phone { box-shadow: none; transform: none; }
.outcome-section { border-block: 1px solid var(--portfolio-line); border-radius: 0; background: transparent; box-shadow: none; color: var(--portfolio-text); text-align: center; }.outcome-section .eyebrow { color: var(--portfolio-accent); }.outcome-section h2 { max-width: 18ch; margin-inline: auto; font-size: clamp(2.5rem, 4.4vw, 4.75rem); text-wrap: balance; }.outcome-section p:last-child { margin-inline: auto; color: var(--portfolio-muted); }
.evidence-ledger { max-width: 66rem; margin-inline: auto; text-align: start; }

/* Distinct, scan-friendly visual modules */
.principle-list { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:.75rem; border:0; }
.principle-list li,.principle-list li:last-child { position:relative; display:flex; min-height:7.5rem; flex-direction:column; align-items:flex-start; justify-content:flex-end; gap:.75rem; padding:1.1rem; border:1px solid var(--portfolio-line); background:color-mix(in srgb,var(--portfolio-surface) 58%,transparent); text-align:start; }
.principle-list li::before { position:absolute; inset-block-start:.9rem; inset-inline-end:1rem; color:color-mix(in srgb,var(--portfolio-accent) 55%,transparent); font-size:1rem; font-weight:800; content:attr(data-index); }
.principle-list li svg { width:1.15rem; color:var(--portfolio-accent); }
.ia-map { display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:.75rem; overflow:visible; padding:0; border:0; background:transparent; }
.ia-group { position:relative; min-width:0; min-height:14rem; overflow:hidden; padding:1.25rem; border:1px solid var(--portfolio-line); background:color-mix(in srgb,var(--portfolio-surface) 58%,transparent); }
.ia-group::after { position:absolute; inset-block-end:-1.6rem; inset-inline-end:-.25rem; color:color-mix(in srgb,var(--portfolio-accent) 10%,transparent); font-size:6rem; font-weight:900; content:attr(data-index); }
.ia-group__head { position:relative; z-index:1; align-items:flex-start; }.ia-group__head strong { color:var(--portfolio-text); font-size:1.05rem; }.ia-group ul { position:relative; z-index:1; }
.primary-flow { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:.75rem; overflow:visible; padding:0; border:0; background:transparent; scroll-snap-type:none; }
.flow-node,.flow-node[data-kind='decision'],.flow-node[data-kind='external'],.flow-node[data-kind='success'] { min-height:12.5rem; padding:1.2rem; border:1px solid var(--portfolio-line); background:color-mix(in srgb,var(--portfolio-surface) 58%,transparent); }
.flow-node::before { opacity:.5; }.flow-node h3 { margin-top:auto; font-size:1.05rem; }.flow-node p { font-size:.82rem; }.flow-node:nth-child(4) .flow-arrow,.flow-node:last-child .flow-arrow { display:none; }
.supporting-flows { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:.75rem; border:0; background:transparent; }
.supporting-flows article { min-height:10.5rem; padding:1.3rem; border:1px solid var(--portfolio-line); background:color-mix(in srgb,var(--portfolio-surface) 58%,transparent); }.supporting-flows ol { margin-top:1.5rem; }.supporting-flows li { color:var(--portfolio-text); font-size:.84rem; line-height:1.5; }
.wireframe-grid { gap:1rem; }.wireframe-card { padding:1rem; border:1px solid var(--portfolio-line); background:color-mix(in srgb,var(--portfolio-surface) 58%,transparent); }.wireframe-phone { border-radius:.75rem; }.wireframe-card figcaption { align-items:center; justify-content:flex-start; padding-top:1rem; color:var(--portfolio-text); font-size:.9rem; font-weight:700; text-align:start; }.wireframe-card figcaption span { display:grid; width:2rem; height:2rem; flex:none; place-items:center; border:1px solid var(--portfolio-line); border-radius:50%; color:var(--portfolio-accent); font-size:.68rem; }
.decision-list { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:.75rem; border:0; }.decision-list article,.decision-list article + article,.decision-list article:last-child { display:flex; min-height:8.5rem; flex-direction:column; justify-content:space-between; gap:1rem; padding:1.1rem; border:1px solid var(--portfolio-line); background:color-mix(in srgb,var(--portfolio-surface) 58%,transparent); text-align:start; }.decision-list > article > span { font-size:.78rem; font-weight:800; }.decision-list h3 { color:var(--portfolio-text); font-size:1rem; line-height:1.6; }
.media-grid { grid-template-columns:repeat(2,minmax(0,1fr)); gap:1rem; }.media-grid > * { padding:1rem; border:1px solid var(--portfolio-line); background:color-mix(in srgb,var(--portfolio-surface) 58%,transparent); }.media-grid :deep(.media-slot__visual) { min-height:0; aspect-ratio:16/10!important; }.media-grid :deep(figcaption p) { display:-webkit-box; overflow:hidden; font-size:1.05rem; -webkit-box-orient:vertical; -webkit-line-clamp:2; }.media-grid :deep(figcaption small) { display:none; }
.interaction-layout { display:grid; grid-template-columns:1fr; gap:1.25rem; padding:0; border:0; }.interaction-list { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:.75rem; }.interaction-list li,.interaction-list li:last-child { align-items:center; justify-content:flex-start; min-height:4.5rem; padding:1rem; border:1px solid var(--portfolio-line); background:color-mix(in srgb,var(--portfolio-surface) 58%,transparent); font-size:.88rem; text-align:start; }.motion-slots { max-width:none; grid-template-columns:repeat(2,minmax(0,1fr)); gap:1rem; }.motion-slots > * { padding:1rem; border:1px solid var(--portfolio-line); background:color-mix(in srgb,var(--portfolio-surface) 58%,transparent); }.motion-slots :deep(.media-slot__visual) { aspect-ratio:16/10!important; min-height:0; }.motion-slots :deep(figcaption small) { display:none; }
.principle-list li,.principle-list li:last-child { font-size:clamp(1rem,1.1vw,1.12rem); font-weight:700; }
#section-3 :deep(.section-heading h2) { max-width:none; font-size:clamp(1.9rem,2.25vw,2.6rem); white-space:nowrap; }
.ia-group { display:flex; min-height:10rem; flex-direction:column; align-items:center; justify-content:center; padding:1rem; text-align:center; }.ia-group::after { display:none; }.ia-group__head { align-items:center; padding-bottom:.65rem; }.ia-group__head strong { font-size:clamp(1.05rem,1.15vw,1.18rem); }.ia-group li { padding-block:.45rem; font-size:clamp(.9rem,.95vw,1rem); line-height:1.45; text-align:center; }
.flow-node,.flow-node[data-kind='decision'],.flow-node[data-kind='external'],.flow-node[data-kind='success'] { min-height:9.5rem; padding:1rem; }.flow-node h3 { font-size:clamp(1.05rem,1.15vw,1.18rem); }.flow-node p { font-size:clamp(.86rem,.92vw,.96rem); line-height:1.55; }.flow-node__top span { font-size:.9rem; }
#section-5 :deep(.section-heading h2) { max-width:none; font-size:clamp(1.9rem,2.25vw,2.6rem); white-space:nowrap; }
.supporting-flows article { position:relative; min-height:12rem; overflow:hidden; padding:1.5rem; border:0; background:color-mix(in srgb,var(--portfolio-surface) 72%,transparent); }.supporting-flows article::before { position:absolute; inset-block-start:0; inset-inline-start:1.5rem; width:3rem; height:2px; background:var(--portfolio-accent); content:''; }.supporting-flows__head { display:flex; align-items:center; gap:.9rem; }.supporting-flows__head > svg { width:2.6rem; height:2.6rem; padding:.65rem; border-radius:50%; background:var(--portfolio-accent-soft); color:var(--portfolio-accent); }.supporting-flows h3 { color:var(--portfolio-text); font-size:clamp(1.15rem,1.25vw,1.3rem); }.supporting-flows ol { gap:.65rem .2rem; margin-top:1.5rem; }.supporting-flows li { padding:.45rem .25rem; color:var(--portfolio-text); font-size:clamp(.92rem,1vw,1.05rem); font-weight:650; }.supporting-flows li span { width:1.8rem; height:1.8rem; border-color:color-mix(in srgb,var(--portfolio-accent) 38%,var(--portfolio-line)); font-size:.75rem; }.supporting-flows li svg { width:1.05rem; margin-inline:.3rem; }
.supporting-flows { grid-template-columns:1fr; gap:1rem; }.supporting-flows article { display:grid; grid-template-columns:12rem 1fr; min-height:9.5rem; overflow:visible; padding:0; border:1px solid var(--portfolio-line); background:transparent; }.supporting-flows article::before { display:none; }.supporting-flows__head { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:.85rem; padding:1.25rem; background:color-mix(in srgb,var(--portfolio-surface) 76%,transparent); text-align:center; }.supporting-flows__head > svg { width:2.85rem; height:2.85rem; padding:.7rem; }.supporting-flows h3 { font-size:clamp(1.12rem,1.2vw,1.25rem); }.supporting-flows ol { display:flex; align-items:stretch; gap:0; margin:0; padding:1rem; }.supporting-flows li { position:relative; display:flex; min-width:0; flex:1; flex-direction:column; align-items:center; justify-content:center; gap:.7rem; padding:.65rem; color:var(--portfolio-text); font-size:clamp(.92rem,1vw,1.05rem); font-weight:700; text-align:center; }.supporting-flows li span { width:2rem; height:2rem; margin:0; background:var(--portfolio-bg); font-size:.78rem; }.supporting-flows li p { line-height:1.55; }.supporting-flows li svg { position:absolute; z-index:2; inset-block-start:50%; inset-inline-end:-.55rem; width:1.1rem; margin:0; color:var(--portfolio-accent); transform:translateY(-50%); }
#section-9 :deep(.section-heading h2) { max-width:none; font-size:clamp(1.9rem,2.25vw,2.6rem); white-space:nowrap; }
.interaction-list { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:0 2rem; border-block:1px solid var(--portfolio-line); }
.interaction-list li,.interaction-list li:last-child { display:grid; grid-template-columns:2.25rem 1fr; gap:.75rem; min-height:5rem; align-items:center; justify-content:initial; padding:1rem .25rem; border:0; border-bottom:1px solid var(--portfolio-line); background:transparent; text-align:start; }.interaction-list li:nth-last-child(-n+2) { border-bottom:0; }.interaction-list li > span { color:var(--portfolio-accent); font-size:.8rem; font-weight:850; }.interaction-list li > p { color:var(--portfolio-text); font-size:clamp(.95rem,1.05vw,1.08rem); font-weight:650; line-height:1.65; }
.state-layout { display:grid; grid-template-columns:1fr; gap:1rem; }.state-grid { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:.75rem; border:0; background:transparent; }.state-grid article { display:flex; min-height:7rem; flex-direction:column; align-items:center; justify-content:center; gap:.8rem; padding:1rem; border:0; background:color-mix(in srgb,var(--portfolio-surface) 68%,transparent); color:var(--portfolio-text); font-size:clamp(.95rem,1.05vw,1.08rem); font-weight:700; text-align:center; }.state-grid svg { width:1.45rem; height:1.45rem; color:var(--portfolio-accent); }.state-grid article[data-state='3'] svg,.state-grid article[data-state='4'] svg,.state-grid article[data-state='5'] svg { color:#b26745; }.state-grid article[data-state='6'] svg { color:#62806b; }.state-layout > :deep(.media-slot) { display:grid; grid-template-columns:1.2fr .8fr; gap:1rem; margin-top:1rem; padding:1rem; border:1px solid var(--portfolio-line); background:color-mix(in srgb,var(--portfolio-surface) 48%,transparent); }.state-layout > :deep(.media-slot__visual) { min-height:0; aspect-ratio:16/7!important; }.state-layout > :deep(.media-slot figcaption) { align-content:center; padding:1.25rem; text-align:start; }.state-layout > :deep(.media-slot figcaption p) { font-size:1.05rem; }.state-layout > :deep(.media-slot figcaption small) { display:none; }
.review-grid { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:1rem; border:0; background:transparent; }.review-grid article,.review-grid article[data-column='0'],.review-grid article[data-column='1'] { --review-tone:var(--portfolio-accent); position:relative; min-height:0; padding:1.5rem; border:0; border-top:2px solid var(--review-tone); background:color-mix(in srgb,var(--portfolio-surface) 62%,transparent); text-align:start; }.review-grid article[data-column='0'] { --review-tone:#62806b; }.review-grid article[data-column='2'] { --review-tone:#b26745; }.review-grid article::before { display:block; margin-bottom:1.5rem; color:var(--review-tone); font-size:.8rem; font-weight:850; content:'0' counter(list-item); }.review-grid h3 { color:var(--portfolio-text); font-size:clamp(1.3rem,1.5vw,1.55rem); font-weight:800; }.review-grid ul { margin-top:1.25rem; }.review-grid li { position:relative; padding:.8rem 1rem .8rem 0; border-top:1px solid var(--portfolio-line); color:var(--portfolio-muted); font-size:clamp(.95rem,1vw,1.05rem); line-height:1.65; }.review-grid li::before { position:absolute; inset-block-start:1.35rem; inset-inline-start:0; width:.35rem; height:.35rem; border-radius:50%; background:var(--review-tone); content:''; }
.state-layout :deep(.media-slot__visual) { min-height:0; aspect-ratio:16/7!important; }.state-layout :deep(.media-slot figcaption) { align-content:center; padding:1.25rem; text-align:start; }.state-layout :deep(.media-slot figcaption p) { font-size:1.05rem; }.state-layout :deep(.media-slot figcaption small) { display:none; }
.review-grid article::before { content:'01'; }.review-grid article[data-column='1']::before { content:'02'; }.review-grid article[data-column='2']::before { content:'03'; }.review-grid li { padding-block:.8rem; padding-inline:1rem 0; }
#section-1 :deep(.section-heading h2),#section-8 :deep(.section-heading h2) { width:100%; max-width:none!important; font-size:clamp(1.9rem,2.25vw,2.6rem); white-space:nowrap; }

/* Editorial refinements */
.supporting-flows article { grid-template-columns: 11rem minmax(0, 1fr); min-height: 7.75rem; }
.supporting-flows__head { gap: .65rem; padding: 1rem; }
.supporting-flows__head > svg { width: 2.35rem; height: 2.35rem; padding: .58rem; }
.supporting-flows ol { display: grid; grid-auto-columns: minmax(0, 1fr); grid-auto-flow: column; align-items: stretch; padding: .75rem; }
.supporting-flows li { position: relative; min-height: 4.75rem; flex-direction: row; gap: .55rem; padding: .65rem .45rem; font-size: clamp(.98rem, 1.05vw, 1.1rem); white-space: nowrap; }
.supporting-flows li + li { border-inline-start: 1px solid color-mix(in srgb, var(--portfolio-line) 72%, transparent); }
.supporting-flows li span { width: 1.8rem; height: 1.8rem; flex: none; background: var(--portfolio-accent-soft); font-size: .76rem; }
.supporting-flows li p { line-height: 1.35; }
.supporting-flows li svg { inset-block-start: 50%; inset-inline-end: -.58rem; width: 1rem; height: 1rem; padding: .18rem; border-radius: 50%; background: var(--portfolio-bg); }

/* Supporting routes — compact bento timelines */
#section-5 { max-width: 76rem; }
.supporting-flows { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; border: 0; background: transparent; }
.supporting-flows article { display: flex; min-height: 12rem; flex-direction: column; padding: 1.35rem; border: 1px solid color-mix(in srgb, var(--portfolio-line) 85%, transparent); border-radius: 1.15rem; background: linear-gradient(145deg, color-mix(in srgb, var(--portfolio-surface) 82%, transparent), color-mix(in srgb, var(--portfolio-bg) 96%, transparent)); }
.supporting-flows article::before { display: none; }
.supporting-flows article:nth-child(2), .supporting-flows article:nth-child(3) { background: linear-gradient(145deg, color-mix(in srgb, var(--portfolio-accent-soft) 38%, var(--portfolio-surface)), color-mix(in srgb, var(--portfolio-bg) 96%, transparent)); }
.supporting-flows__head { display: flex; flex-direction: row; align-items: center; justify-content: space-between; gap: 1rem; padding: 0 0 1.25rem; border-bottom: 1px solid var(--portfolio-line); background: transparent; text-align: start; }
.supporting-flows__identity { display: flex; align-items: center; gap: .75rem; }
.supporting-flows__identity > svg { width: 2.35rem; height: 2.35rem; padding: .58rem; border-radius: .7rem; background: var(--portfolio-accent-soft); color: var(--portfolio-accent); }
.supporting-flows h3 { color: var(--portfolio-text); font-size: clamp(1.1rem, 1.25vw, 1.3rem); }
.supporting-flows__index { color: color-mix(in srgb, var(--portfolio-accent) 72%, var(--portfolio-muted)); font-family: var(--font-display); font-size: 1.35rem; font-weight: 800; }
.supporting-flows ol { position: relative; display: flex; flex: 1; flex-wrap: nowrap; align-items: center; justify-content: space-between; gap: .35rem; margin: 0; padding: 1.25rem 0 0; }
.supporting-flows ol::before { position: absolute; z-index: 0; inset-inline: .9rem; inset-block-start: calc(50% + .625rem); display: block; height: 1px; background: color-mix(in srgb, var(--portfolio-accent) 42%, var(--portfolio-line)); content: ''; }
.supporting-flows li { position: relative; z-index: 1; display: flex; min-width: 0; min-height: 3.25rem; flex: 0 1 auto; flex-direction: row; align-items: center; justify-content: center; gap: .4rem; padding: .25rem .32rem; background: color-mix(in srgb, var(--portfolio-surface) 88%, var(--portfolio-bg)); color: var(--portfolio-text); font-size: clamp(.8rem, .8vw, .9rem); font-weight: 700; text-align: center; white-space: nowrap; }
.supporting-flows li + li { border: 0; }
.supporting-flows li span { width: 2rem; height: 2rem; margin: 0; border: 1px solid color-mix(in srgb, var(--portfolio-accent) 45%, var(--portfolio-line)); background: var(--portfolio-bg); color: var(--portfolio-accent); font-size: .76rem; }
.supporting-flows li p { max-width: none; line-height: 1.35; white-space: nowrap; }
.supporting-flows li svg { display: none; }

/* Alternating route labels around a centered number line */
.supporting-flows ol { min-height: 7.25rem; align-items: stretch; gap: 0; padding: .75rem 0 0; }
.supporting-flows ol::before { inset-block-start: calc(50% + .75rem); inset-inline: 1rem; }
.supporting-flows li { min-height: 7.25rem; flex: 1 1 0; padding: 0; background: transparent; }
.supporting-flows li span { position: absolute; top: calc(50% + .375rem); left: 50%; z-index: 2; transform: translate(-50%, -50%); }
.supporting-flows li p { position: absolute; left: 50%; width: max-content; max-width: 9rem; font-size: clamp(.82rem, .85vw, .94rem); font-weight: 500; line-height: 1.35; text-align: center; transform: translateX(-50%); }
.supporting-flows li:nth-child(odd) p { bottom: calc(50% + 1.45rem); }
.supporting-flows li:nth-child(even) p { top: calc(50% + 1.8rem); }

/* Architecture — one continuous lifecycle, not a card grid */
.ia-map { position: relative; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 0; padding-top: 0; border: 0; background: transparent; }
.ia-map::before { position: absolute; inset-block-start: 1.75rem; inset-inline: 10%; height: 1px; background: linear-gradient(90deg, transparent, var(--portfolio-accent), var(--portfolio-accent), transparent); content: ''; opacity: .45; }
.ia-group { position: relative; display: flex; min-height: 0; overflow: visible; flex-direction: column; align-items: center; justify-content: flex-start; padding: 0 .75rem; border: 0; border-radius: 0; background: transparent; text-align: center; }
.ia-group::after { display: none; }
.ia-group__head { z-index: 1; display: flex; flex-direction: column; align-items: center; gap: .8rem; padding: 0 0 1.25rem; }
.ia-group__head span { display: grid; width: 3.5rem; height: 3.5rem; place-items: center; border: 1px solid color-mix(in srgb, var(--portfolio-accent) 58%, var(--portfolio-line)); border-radius: 50%; background: var(--portfolio-bg); color: var(--portfolio-accent); font-size: .82rem; font-weight: 850; }
.ia-group__head strong { color: var(--portfolio-text); font-size: clamp(1.05rem, 1.15vw, 1.2rem); }
.ia-group ul { width: 100%; padding-top: .2rem; }
.ia-group li { position: relative; padding: .35rem .65rem; border: 0; color: var(--portfolio-muted); font-size: clamp(.9rem, .95vw, 1rem); line-height: 1.55; text-align: center; }
.ia-group li + li::before { position: absolute; inset-block-start: 0; left: 50%; width: 1.25rem; height: 1px; background: var(--portfolio-line); content: ''; transform: translateX(-50%); }

/* One quiet frame for the information below each lifecycle station */
.ia-group ul { position: relative; display: grid; width: min(100%, 9.5rem); height: 11.5rem; grid-auto-rows: 1fr; gap: 0; margin-top: .2rem; padding: .55rem .75rem; border: 1px solid color-mix(in srgb, var(--portfolio-line) 86%, transparent); border-radius: .75rem; background: color-mix(in srgb, var(--portfolio-surface) 52%, transparent); }
.ia-group ul::before { display: none; }
.ia-group li { position: relative; display: block; padding: .42rem .2rem; border: 0; color: var(--portfolio-muted); font-size: clamp(.88rem, .92vw, .98rem); line-height: 1.45; text-align: center; }
.ia-group li::before { display: none; }
.ia-group li + li { border-top: 1px solid color-mix(in srgb, var(--portfolio-line) 72%, transparent); }
.ia-group li + li::before { display: none; content: none; }

/* Principles — a single editorial rail rather than four cards */
.principle-list { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0; padding-block: .55rem; border-block: 1px solid var(--portfolio-line); background: transparent; }
.principle-list li,
.principle-list li:last-child { display: grid; min-height: 4.5rem; grid-template-columns: auto auto auto; align-items: center; justify-content: center; gap: .65rem; overflow: visible; padding: .75rem 1rem; border: 0; border-radius: 0; background: transparent; color: var(--portfolio-text); font-size: clamp(1rem, 1.05vw, 1.12rem); font-weight: 700; line-height: 1.5; text-align: center; }
.principle-list li + li { border-inline-start: 1px solid var(--portfolio-line); }
.principle-list li::before { position: static; color: color-mix(in srgb, var(--portfolio-accent) 60%, var(--portfolio-muted)); font-size: .72rem; font-weight: 850; content: attr(data-index); }
.principle-list li svg { width: 1rem; height: 1rem; color: var(--portfolio-accent); }
.principle-list li + li { border-inline-start: 0; }
.principle-list li:not(:first-child)::after { position: absolute; inset-block: .65rem; inset-inline-start: 0; width: 1px; background: var(--portfolio-line); content: ''; }

/* Respect the card curvature with an inset accent stroke */
.flow-node::before { inset-inline: .7rem; border-radius: 999px; }

/* UX decisions — editorial index, no card grid */
.decision-list { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0 2rem; padding-block: .4rem; border-block: 1px solid var(--portfolio-line); }
.decision-list article,
.decision-list article + article,
.decision-list article:last-child { display: grid; min-height: 5.75rem; grid-template-columns: 2.75rem minmax(0, 1fr); align-items: center; gap: 1rem; padding: 1rem .25rem; border: 0; border-bottom: 1px solid var(--portfolio-line); border-radius: 0; background: transparent; text-align: start; }
.decision-list article:nth-last-child(-n+2) { border-bottom: 0; }
.decision-list > article > span { display: grid; width: 2.5rem; height: 2.5rem; place-items: center; border: 1px solid color-mix(in srgb, var(--portfolio-accent) 42%, var(--portfolio-line)); border-radius: 50%; color: var(--portfolio-accent); font-size: .72rem; font-weight: 850; }
.decision-list h3 { color: var(--portfolio-text); font-size: clamp(1rem, 1.12vw, 1.18rem); font-weight: 650; line-height: 1.65; }

/* A restrained radius shared by every remaining card surface */
.flow-node,
.supporting-flows article,
.wireframe-card,
.media-grid > *,
.motion-slots > *,
.system-grid article,
.state-grid article,
.state-layout > :deep(.media-slot),
.review-grid article { border-radius: .75rem; }
.supporting-flows article { border-radius: .75rem; }
.supporting-flows__identity > svg { border-radius: .5rem; }

.system-grid h3 { font-size: clamp(1.12rem, 1.25vw, 1.3rem); }
.system-grid p { max-width: 18rem; margin-top: .65rem; font-size: clamp(1rem, 1.08vw, 1.12rem); line-height: 1.75; }

[dir='rtl'] .flow-arrow,[dir='rtl'] .interaction-list svg { transform:scaleX(-1); }[dir='rtl'] .supporting-flows li svg { transform:translateY(-50%) scaleX(-1); }
[lang='fa'] .case-lead { font-weight:600; line-height:1.85; }[lang='fa'] .artifact-caption,[lang='fa'] .wireframe-page small,[lang='fa'] .flow-node__top small { letter-spacing:0; text-transform:none; }
@supports (animation-timeline: view()) { .reveal-section { animation:case-reveal var(--motion-major) var(--ease-enter) both; animation-timeline:view(); animation-range:entry 5% cover 22%; } }
@keyframes case-reveal { from { opacity:0; transform:translateY(1.25rem); } to { opacity:1; transform:none; } }
@media (max-width:1023px) { .case-outline { top:4.25rem; padding-inline:var(--portfolio-gutter); }.case-outline > p,.case-outline a { min-height:4.25rem; }.case-outline li { min-width:auto; flex:none; }.case-outline a { justify-content:flex-start; padding-inline:1rem; font-size:.9rem; }.case-main { max-width:none; }.case-section { max-width:50rem; }.case-section--wide { max-width:none; }.ia-map { grid-template-columns:repeat(3,minmax(0,1fr)); margin-inline:0; padding:0; }.primary-flow { grid-template-columns:repeat(2,minmax(0,1fr)); margin-inline:0; padding:0; }.flow-node:nth-child(even) .flow-arrow { display:none; }.wireframe-grid { grid-template-columns:repeat(3,1fr); } }
@media (max-width:1023px) and (min-width:768px) { .context-grid { grid-template-columns:repeat(2,1fr); }.context-grid article:nth-child(3) { border-inline-start:0; border-top:1px solid var(--portfolio-line); }.context-grid article:nth-child(4) { border-top:1px solid var(--portfolio-line); } }
@media (max-width:767px) { .case-section::before,.case-section:nth-child(even)::before { inset-block-start:-4.25rem; inset-inline-start:auto; inset-inline-end:auto; right:auto; left:50%; width:auto; height:auto; padding:.1rem .65rem .45rem; font-size:1.4rem; transform:translateX(-50%); }.case-section :deep(.section-heading h2),#section-3 :deep(.section-heading h2),#section-5 :deep(.section-heading h2),#section-9 :deep(.section-heading h2) { font-size:clamp(1.8rem,8vw,2.6rem); white-space:normal; }.case-section--context .case-lead { white-space:normal; }.context-grid,.system-grid { grid-template-columns:1fr; }.context-grid article { min-height:9rem; }.context-grid article + article { border-inline-start:0; border-top:1px solid var(--portfolio-line); }.principle-list { grid-template-columns:repeat(2,minmax(0,1fr)); }.principle-list li,.principle-list li:last-child { min-height:6.5rem; border:1px solid var(--portfolio-line); }.ia-map { grid-template-columns:repeat(2,minmax(0,1fr)); }.ia-group { min-height:10rem; }.supporting-flows,.decision-list,.interaction-list { grid-template-columns:1fr; }.supporting-flows article { min-height:0; }.interaction-list li:nth-last-child(2) { border-bottom:1px solid var(--portfolio-line); }.wireframe-grid { grid-template-columns:repeat(2,1fr); }.interaction-layout,.state-layout,.evidence-ledger { grid-template-columns:1fr; }.review-grid { grid-template-columns:1fr; }.review-grid article { min-height:0; }.media-grid { grid-template-columns:1fr; }.media-grid__wide { grid-column:auto; }.motion-slots { max-width:none; margin-inline:auto; }.case-lead { font-size:1.15rem; }.flow-node { min-height:10rem; } }
@media (max-width:479px) { .wireframe-grid { grid-template-columns:1fr 1fr; gap:2rem .75rem; }.wireframe-phone { padding:.45rem; border-radius:1rem; }.wireframe-page { padding:.55rem; }.wireframe-block { min-height:2.5rem; }.motion-slots { grid-template-columns:1fr 1fr; }.state-grid { grid-template-columns:1fr; }.outcome-section { margin-inline:calc(var(--portfolio-gutter) * -1); }.decision-list article { grid-template-columns:2.25rem 1fr; } }
@media (max-width:767px) { .state-grid { grid-template-columns:repeat(2,minmax(0,1fr)); }.state-layout > :deep(.media-slot) { grid-template-columns:1fr; }.state-layout > :deep(.media-slot figcaption) { padding:.5rem; }.review-grid article { padding:1.25rem; } }
@media (max-width:767px) { .supporting-flows article { grid-template-columns:1fr; }.supporting-flows__head { flex-direction:row; justify-content:flex-start; text-align:start; }.supporting-flows ol { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:.5rem; }.supporting-flows li { min-height:5.5rem; background:color-mix(in srgb,var(--portfolio-surface) 45%,transparent); }.supporting-flows li svg { display:none; } }
@media (max-width:767px) { #section-1 :deep(.section-heading h2),#section-8 :deep(.section-heading h2) { max-width:18em!important; white-space:normal; } }
@media (max-width:767px) { #section-5 { max-width: 100%; }.supporting-flows { grid-template-columns: 1fr; }.supporting-flows article { min-height: 0; padding: 1.1rem; }.supporting-flows__head { padding-bottom: 1rem; }.supporting-flows ol { justify-content: flex-start; overflow-x: auto; padding-top: 1rem; scrollbar-width: none; }.supporting-flows ol::before { inset-block-start: calc(50% + .5rem); min-width: calc(100% - 1.8rem); }.supporting-flows ol::-webkit-scrollbar { display: none; }.supporting-flows li { min-width: max-content; min-height: 3.25rem; white-space: nowrap; } }
@media (max-width:1023px) { .ia-map { grid-template-columns: repeat(5, minmax(9rem, 1fr)); overflow-x: auto; padding-bottom: .75rem; scrollbar-width: none; }.ia-map::-webkit-scrollbar { display: none; }.ia-group { min-height: 0; }.ia-map::before { inset-inline: 4.5rem; min-width: 36rem; } }
@media (max-width:767px) { .principle-list { grid-template-columns: repeat(2, minmax(0, 1fr)); padding-block: 0; border: 0; }.principle-list li,.principle-list li:last-child { min-height: 4.25rem; padding: .75rem .5rem; border: 0; border-bottom: 1px solid var(--portfolio-line); font-size: .95rem; }.principle-list li:nth-child(even) { border-inline-start: 1px solid var(--portfolio-line); } }
@media (max-width:767px) { .principle-list li:not(:first-child)::after { display: none; }.decision-list { grid-template-columns: 1fr; }.decision-list article,.decision-list article + article,.decision-list article:last-child,.decision-list article:nth-last-child(-n+2) { min-height: 5.25rem; border-bottom: 1px solid var(--portfolio-line); }.decision-list article:last-child { border-bottom: 0; } }
@media (max-width:767px) { .supporting-flows ol { min-height: 7.25rem; align-items: stretch; padding-top: .5rem; }.supporting-flows ol::before { inset-block-start: calc(50% + .5rem); min-width: calc(100% - 2rem); }.supporting-flows li { width: 8.5rem; min-width: 8.5rem; min-height: 7.25rem; }.supporting-flows li span { top: calc(50% + .25rem); }.supporting-flows li p { max-width: 8rem; font-size: .84rem; }.supporting-flows li:nth-child(odd) p { bottom: calc(50% + 1.35rem); }.supporting-flows li:nth-child(even) p { top: calc(50% + 1.7rem); } }
@media (max-width:479px) { .state-grid { grid-template-columns:1fr; } }

/* Interaction index — open editorial rhythm instead of boxed rows */
.interaction-list { display: grid; grid-template-columns: repeat(12, minmax(0, 1fr)); gap: 1rem 1.25rem; padding: 0; border: 0; }
.interaction-list li,
.interaction-list li:last-child { position: relative; display: flex; min-height: 7rem; grid-column: span 3; flex-direction: column; align-items: flex-start; justify-content: space-between; gap: 1rem; padding: 1rem .25rem; border: 0; border-top: 1px solid var(--portfolio-line); background: transparent; text-align: start; }
.interaction-list li:nth-child(n+5) { grid-column: span 4; }
.interaction-list li > span { color: color-mix(in srgb, var(--portfolio-accent) 72%, var(--portfolio-muted)); font-family: var(--font-display); font-size: 1.45rem; font-weight: 800; line-height: 1; }
.interaction-list li > p { max-width: none; color: var(--portfolio-text); font-size: clamp(.78rem, .78vw, .92rem); font-weight: 500; line-height: 1.5; white-space: nowrap; }
.interaction-list li::after { position: absolute; inset-block-start: -2px; inset-inline-start: 0; width: 2.75rem; height: 3px; border-radius: 999px; background: var(--portfolio-accent); content: ''; opacity: .72; }

/* Interface system — one open matrix, no individual cards */
.system-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 0; padding-block: .5rem; border-block: 1px solid var(--portfolio-line); background: transparent; }
.system-grid article,
.system-grid article[data-tone='4'],
.system-grid article[data-tone='5'] { display: grid; min-height: 11.5rem; grid-template-rows: auto auto 1fr; align-content: center; justify-items: start; padding: 1.35rem 1.5rem; border: 0; border-radius: 0; background: transparent; text-align: start; }
.system-grid article:not(:nth-child(3n + 1)) { border-inline-start: 1px solid var(--portfolio-line); }
.system-grid article:nth-child(n + 4) { border-top: 1px solid var(--portfolio-line); }
.system-grid span { color: color-mix(in srgb, var(--portfolio-accent) 70%, var(--portfolio-muted)); font-size: .75rem; font-weight: 850; }
.system-grid h3 { margin-top: 1rem; color: var(--portfolio-text); font-size: clamp(1.15rem, 1.3vw, 1.35rem); }
.system-grid p { max-width: 19rem; margin-top: .6rem; color: var(--portfolio-muted); font-size: clamp(1rem, 1.06vw, 1.1rem); line-height: 1.75; }

/* Primary journey — a continuous alternating path, not cards */
#section-4 { max-width: 76rem; }
.primary-flow { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0; padding: 0; border: 0; border-radius: 0; background: transparent; }
.flow-node,
.flow-node[data-kind='decision'],
.flow-node[data-kind='external'],
.flow-node[data-kind='success'] { position: relative; display: flex; min-width: 0; min-height: 11.5rem; flex-direction: column; padding: 1.35rem 1.5rem; border: 0; border-inline-end: 1px solid var(--portfolio-line); border-radius: 0; background: transparent; text-align: start; }
.flow-node:nth-child(4n) { border-inline-end: 0; }
.flow-node:nth-child(-n+4) { border-bottom: 1px solid var(--portfolio-line); }
.flow-node::before { display: none; }
.flow-node__top { position: static; display: flex; width: auto; height: auto; align-items: center; justify-content: space-between; border: 0; border-radius: 0; background: transparent; transform: none; }
.flow-node__top span { color: var(--portfolio-accent); font-family: var(--font-display); font-size: .82rem; font-weight: 800; line-height: 1; }
.flow-node__top small { display: none; }
.flow-node__copy { position: static; width: auto; margin-top: auto; transform: none; }
.flow-node h3 { margin: 0; color: var(--portfolio-text); font-size: clamp(1.02rem, 1.08vw, 1.14rem); font-weight: 650; line-height: 1.45; }
.flow-node p { max-width: 15rem; margin-top: .6rem; color: var(--portfolio-muted); font-size: clamp(.82rem, .86vw, .92rem); line-height: 1.65; }
.flow-arrow { display: none; }

@media (max-width:767px) { .interaction-list { grid-template-columns: 1fr; gap: .75rem; }.interaction-list li,.interaction-list li:last-child,.interaction-list li:nth-child(n+5) { min-height: 5.5rem; grid-column: span 1; }.interaction-list li > p { font-size: clamp(.72rem, 3vw, .84rem); }.system-grid { grid-template-columns: 1fr; }.system-grid article,.system-grid article[data-tone='4'],.system-grid article[data-tone='5'] { min-height: 0; padding: 1.25rem .5rem; border: 0; border-bottom: 1px solid var(--portfolio-line); }.system-grid article:not(:nth-child(3n + 1)) { border-inline-start: 0; }.system-grid article:last-child { border-bottom: 0; } }
@media (max-width:1023px) { .primary-flow { grid-template-columns: repeat(2, minmax(0, 1fr)); }.flow-node:nth-child(4n) { border-inline-end: 1px solid var(--portfolio-line); }.flow-node:nth-child(2n) { border-inline-end: 0; }.flow-node:nth-child(-n+6) { border-bottom: 1px solid var(--portfolio-line); } }
@media (max-width:767px) { #section-4 { max-width: 100%; }.primary-flow { grid-template-columns: 1fr; }.flow-node,.flow-node[data-kind='decision'],.flow-node[data-kind='external'],.flow-node[data-kind='success'] { min-height: 9.5rem; padding: 1.25rem; border-inline-end: 0; border-bottom: 1px solid var(--portfolio-line); }.flow-node:last-child { border-bottom: 0; }.flow-node p { max-width: none; } }

@media (prefers-reduced-motion:reduce) { .reveal-section { animation:none!important; transform:none!important; }.case-outline a, .context-grid article, .system-grid article, .state-grid article, .review-grid article, .supporting-flows article, .flow-node, .wireframe-phone { transition:none; }.context-grid article:hover, .system-grid article:hover, .state-grid article:hover, .review-grid article:hover, .supporting-flows article:hover, .flow-node:hover, .wireframe-card:hover .wireframe-phone { transform:none; } }
</style>
