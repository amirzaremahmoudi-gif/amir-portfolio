<script setup lang="ts">
import { toranjCapitalRedesignContent } from '~/data/toranjCapitalRedesign'

const { locale } = useI18n()
const copy = computed(() => toranjCapitalRedesignContent[locale.value === 'fa' ? 'fa' : 'en'])
const overviewServices = computed(() => locale.value === 'fa'
  ? ['محصولات سرمایه‌گذاری', 'سبدگردانی', 'خدمات سازمانی', 'سنجش ریسک']
  : ['Investment products', 'Portfolio management', 'Institutional services', 'Risk assessment'])
const activeSection = ref(1)
const activeFlow = ref(0)
const activeArchitecture = ref(0)
const homeVideo = ref<HTMLVideoElement | null>(null)
const homeVideoPlaying = ref(false)
const deviceLabels = computed(() => locale.value === 'fa'
  ? [
      { name: 'دسکتاپ', size: '۱۴۴۰ پیکسل', mode: 'نمای کامل', detail: 'جزئیات و مقایسه کنار هم', className: 'device--desktop' },
      { name: 'تبلت', size: '۷۶۸ پیکسل', mode: 'چیدمان تطبیقی', detail: 'محتوا در ستون‌های فشرده', className: 'device--tablet' },
      { name: 'موبایل', size: '۳۹۰ پیکسل', mode: 'اقدام در اولویت', detail: 'مسیر اصلی، سریع و متمرکز', className: 'device--phone' }
    ]
  : [
      { name: 'Desktop', size: '1440 px', mode: 'Full view', detail: 'Details and comparisons side by side', className: 'device--desktop' },
      { name: 'Tablet', size: '768 px', mode: 'Adaptive layout', detail: 'Content in compact columns', className: 'device--tablet' },
      { name: 'Mobile', size: '390 px', mode: 'Action first', detail: 'A fast, focused primary path', className: 'device--phone' }
    ])
const outlineList = useTemplateRef<HTMLOListElement>('outlineList')
const outlineEntries = computed(() => copy.value.outline
  .map((item, index) => ({ item, originalSection: index + 1 }))
  .filter(entry => ![5, 6, 8, 14].includes(entry.originalSection))
  .map((entry, index) => ({ ...entry, section: index + 1 })))
let observer: IntersectionObserver | undefined
const mediaMeta = (asset: string, state: string, page: string, viewport: string, crop: string) => ({
  'data-intended-asset': asset, 'data-media-state': state, 'data-media-page': page, 'data-media-viewport': viewport, 'data-media-crop': crop,
  'data-annotation-review': 'required', 'data-financial-claim-review': 'required', 'data-privacy-review': 'required', 'data-publication-approval': 'required'
})
const comparisonImages: Record<string, { src: string, width: number, height: number }> = {
  'before-2026-09-09-home-desktop.png': {
    src: '/images/case-studies/toranj-capital-redesign/comparisons/before-home-desktop.png',
    width: 1904,
    height: 979
  },
  '01-home-desktop.png': {
    src: '/images/case-studies/toranj-capital-redesign/comparisons/current-home-desktop.png',
    width: 1920,
    height: 919
  },
  'before-2026-09-09-product-sarv-desktop.png': {
    src: '/images/case-studies/toranj-capital-redesign/comparisons/before-product-desktop.png',
    width: 1920,
    height: 919
  },
  '02-product.png': {
    src: '/images/case-studies/toranj-capital-redesign/comparisons/current-product-desktop.png',
    width: 1920,
    height: 919
  },
  'before-2026-09-09-risk-entry-desktop.png': {
    src: '/images/case-studies/toranj-capital-redesign/comparisons/before-risk-desktop.png',
    width: 1920,
    height: 919
  },
  '06-risk.png': {
    src: '/images/case-studies/toranj-capital-redesign/comparisons/current-risk-desktop.png',
    width: 1920,
    height: 919
  }
}

function selectArchitecture(index: number) {
  activeArchitecture.value = index
}

function selectFlow(index: number) {
  activeFlow.value = index
}

async function playHomeVideo() {
  await homeVideo.value?.play()
}

onMounted(() => {
  observer = new IntersectionObserver((entries) => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
    const id = visible[0]?.target.id.match(/capital-section-(\d+)/)?.[1]
    if (id) activeSection.value = Number(id)
  }, { rootMargin: '-18% 0px -68% 0px' })
  document.querySelectorAll<HTMLElement>('.capital-case .case-section[id]').forEach(section => observer?.observe(section))
})
watch(activeSection, async (section) => {
  await nextTick()
  outlineList.value?.querySelector<HTMLElement>(`[data-section="${section}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
})
onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <article class="capital-case">
    <CaseStudyHero
      v-bind="copy.hero"
      :media="{
        src: '/images/case-studies/toranj-capital-redesign/hero-cinematic-desktop-v1.png',
        alt: locale === 'fa' ? 'موکاپ سینمایی دسکتاپ از صفحه اصلی بازطراحی‌شده ترنج کپیتال' : 'Cinematic desktop mockup of the redesigned Toranj Capital homepage',
        width: 1672,
        height: 941
      }"
    />
    <div class="portfolio-container">
      <figure class="hero-poster">
        <img
          class="hero-poster__image"
          src="/images/case-studies/toranj-capital-redesign/hero-cinematic-desktop-v1.png"
          :alt="locale === 'fa' ? 'موکاپ سینمایی دسکتاپ از صفحه اصلی بازطراحی‌شده ترنج کپیتال' : 'Cinematic desktop mockup of the redesigned Toranj Capital homepage'"
          width="1672"
          height="941"
          fetchpriority="high"
        >
      </figure>
    </div>

    <div class="portfolio-container case-shell py-[var(--portfolio-section)]">
      <aside class="case-outline">
        <p class="eyebrow">
          {{ copy.labels.study }}
        </p>
        <ol ref="outlineList">
          <li
            v-for="entry in outlineEntries"
            :key="entry.item"
          >
            <a
              :href="`#capital-section-${entry.section}`"
              :data-section="entry.section"
              :class="{ 'is-active': activeSection === entry.section }"
              :aria-current="activeSection === entry.section ? 'location' : undefined"
              @click="activeSection = entry.section"
            ><span>{{ String(entry.section).padStart(2, '0') }}</span>{{ entry.item }}</a>
          </li>
        </ol>
      </aside>

      <main class="case-main">
        <section
          id="capital-section-1"
          class="case-section case-section--wide overview-section reveal-section"
        >
          <header class="overview-heading">
            <p><span>01</span>{{ copy.outline[0] }}</p>
            <h2>{{ copy.sections.context[0] }}</h2>
          </header>
          <div class="overview-composition">
            <div class="service-map">
              <div
                class="service-map__core"
                aria-hidden="true"
              >
                <span>{{ locale === 'fa' ? 'مسیر خدمت' : 'service paths' }}</span>
              </div>
              <ol>
                <li
                  v-for="(item, index) in overviewServices"
                  :key="item"
                >
                  <span>{{ String(index + 1).padStart(2, '0') }}</span>{{ item }}
                </li>
              </ol>
            </div>
          </div>
        </section>

        <section
          id="capital-section-2"
          class="case-section reveal-section"
        >
          <SectionHeading
            index="02"
            :title="copy.sections.role[0]!"
          /><p class="case-lead">
            {{ copy.sections.role[1] }}
          </p><ul class="matrix-list">
            <li
              v-for="item in copy.sections.role.slice(2)"
              :key="item"
            >
              {{ item }}
            </li>
          </ul>
        </section>

        <section
          id="capital-section-3"
          class="case-section case-section--wide reveal-section"
        >
          <SectionHeading
            index="03"
            :title="copy.sections.beforeAfter[0]!"
          />
          <div class="before-after-list">
            <CaseStudyBeforeAfter
              v-for="(item, index) in copy.comparisons"
              :key="item[0]"
              :index="index + 1"
              :title="item[0]!"
              :before-label="copy.labels.previous"
              :after-label="copy.labels.after"
            >
              <template #before>
                <figure
                  v-if="comparisonImages[item[3]!]"
                  class="comparison-image"
                  v-bind="mediaMeta(item[3]!, 'Before', item[0]!, 'Desktop', 'Matched opening composition')"
                >
                  <img
                    :src="comparisonImages[item[3]!]!.src"
                    :alt="locale === 'fa' ? `${item[0]} در وب‌سایت پیشین ترنج کپیتال` : `${item[0]} page on the previous Toranj Capital website`"
                    :width="comparisonImages[item[3]!]!.width"
                    :height="comparisonImages[item[3]!]!.height"
                    loading="lazy"
                  >
                </figure>
                <CaseStudyMediaPlaceholder
                  v-else
                  :index="index * 2 + 2"
                  :asset="item[3]!"
                  ratio="16:10"
                  :recommendation="item[1]!"
                  :section="copy.labels.previous"
                  presentation="Matched editorial crop"
                  redaction="Keep forms empty; review contact data and people imagery"
                  publication-review="Financial claims, image rights, and company approval required"
                  :caption="copy.reconstructed"
                  v-bind="mediaMeta(item[3]!, 'Before', item[0]!, 'Desktop', 'Matched opening composition')"
                />
              </template>
              <template #after>
                <figure
                  v-if="comparisonImages[item[4]!]"
                  class="comparison-image"
                  v-bind="mediaMeta(item[4]!, 'After', item[0]!, 'Desktop', 'Matched opening composition')"
                >
                  <img
                    :src="comparisonImages[item[4]!]!.src"
                    :alt="locale === 'fa' ? `${item[0]} در بازطراحی فعلی ترنج کپیتال` : `${item[0]} page in the current Toranj Capital redesign`"
                    :width="comparisonImages[item[4]!]!.width"
                    :height="comparisonImages[item[4]!]!.height"
                    loading="lazy"
                  >
                </figure>
                <CaseStudyMediaPlaceholder
                  v-else
                  :index="index * 2 + 3"
                  :asset="item[4]!"
                  ratio="16:10"
                  :recommendation="item[2]!"
                  :section="copy.labels.after"
                  presentation="Matched editorial crop"
                  redaction="Review financial and contact data"
                  publication-review="Financial claims and company approval required"
                  v-bind="mediaMeta(item[4]!, 'After', item[0]!, 'Desktop', 'Matched opening composition')"
                />
              </template>
            </CaseStudyBeforeAfter>
          </div>
        </section>

        <section
          id="capital-section-4"
          class="case-section case-section--wide architecture-section reveal-section"
        >
          <SectionHeading
            index="04"
            :title="copy.sections.architecture[0]!"
          />
          <figure
            class="ia-map"
            :aria-label="copy.sections.architecture[0]"
          >
            <div
              class="ia-map__tabs"
              role="tablist"
              :aria-label="copy.sections.architecture[0]"
            >
              <button
                v-for="(group, index) in copy.architecture"
                :key="group[0]"
                type="button"
                role="tab"
                :aria-selected="activeArchitecture === index"
                :class="{ 'is-active': activeArchitecture === index }"
                @click="selectArchitecture(index)"
              >
                <span>{{ String(index + 1).padStart(2, '0') }}</span>{{ group[0] }}
              </button>
            </div>
            <div
              v-for="(group, index) in copy.architecture"
              :key="group[0]"
              class="ia-group"
              :class="{ 'is-active': activeArchitecture === index }"
              :data-index="String(index + 1).padStart(2, '0')"
            >
              <div class="ia-group__head">
                <strong>{{ group[0] }}</strong>
              </div><ul>
                <li
                  v-for="item in group.slice(1)"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </figure>
        </section>

        <section
          id="capital-section-5"
          class="case-section reveal-section"
        >
          <SectionHeading
            index="05"
            :title="copy.sections.portfolio[0]!"
          /><p class="case-lead">
            {{ copy.sections.portfolio[1] }}
          </p><div class="flow-grid flow-grid--four portfolio-timeline">
            <article
              v-for="(item, index) in copy.portfolioFlow"
              :key="item"
            >
              <span>{{ String(index + 1).padStart(2, '0') }}</span><h3>{{ item }}</h3>
            </article>
          </div>
        </section>
        <section
          id="capital-section-6"
          class="case-section case-section--wide reveal-section"
        >
          <SectionHeading
            index="06"
            :title="copy.sections.risk[0]!"
          /><div class="case-copy">
            <p>{{ copy.sections.risk[1] }}</p>
          </div><p class="risk-group-label">
            {{ locale === 'fa' ? 'مسیر پیشنهاد' : 'Recommendation path' }}
          </p><div class="flow-grid flow-grid--four risk-model-grid">
            <article
              v-for="(item, index) in copy.riskModel"
              :key="item"
              :data-index="String(index + 1).padStart(2, '0')"
            >
              <h3>{{ item }}</h3>
            </article>
          </div><p class="risk-group-label risk-group-label--evidence">
            {{ locale === 'fa' ? 'شواهد رابط' : 'Interface evidence' }}
          </p><ul class="matrix-list risk-evidence-list">
            <li
              v-for="item in copy.riskEvidence"
              :key="item"
            >
              {{ item }}
            </li>
          </ul>
        </section>

        <section
          id="capital-section-7"
          class="case-section case-section--wide reveal-section"
        >
          <SectionHeading
            index="07"
            :title="copy.sections.wireframes[0]!"
          />
          <div
            class="flow-tabs"
            role="tablist"
            :aria-label="copy.sections.wireframes[0]"
          >
            <button
              v-for="(flow, index) in copy.flows"
              :key="flow[0]"
              type="button"
              role="tab"
              :aria-selected="activeFlow === index"
              :class="{ 'is-active': activeFlow === index }"
              @click="selectFlow(index)"
            >
              <span>{{ String(index + 1).padStart(2, '0') }}</span>{{ flow[0] }}
            </button>
          </div>
          <p class="selected-flow-label">
            <span>{{ locale === 'fa' ? 'مسیر انتخاب‌شده' : 'Selected journey' }}</span>
            <strong>{{ copy.flows[activeFlow]![0] }}</strong>
          </p>
          <div class="selected-flow">
            <span
              v-for="(step, index) in copy.flows[activeFlow]!.slice(1)"
              :key="step"
            ><i>{{ String(index + 1).padStart(2, '0') }}</i>{{ step }}</span>
          </div>
          <div class="wireframe-grid">
            <figure
              v-for="(wireframe, index) in copy.wireframes"
              :key="wireframe[0]"
              class="wireframe-card"
            >
              <div class="wireframe-frame">
                <div class="wireframe-page">
                  <small>{{ copy.reconstructed }}</small><h3>{{ wireframe[0] }}</h3><div
                    v-for="(block, blockIndex) in wireframe.slice(1)"
                    :key="block"
                    class="wireframe-block"
                    :data-priority="blockIndex === 0 ? 'lead' : blockIndex === wireframe.length - 2 ? 'action' : 'body'"
                  >
                    <span>{{ block }}</span>
                  </div>
                </div>
              </div><figcaption><span>{{ String(index + 1).padStart(2, '0') }}</span><strong>{{ wireframe[0] }}</strong></figcaption>
            </figure>
          </div>
        </section>

        <section
          id="capital-section-8"
          class="case-section reveal-section"
        >
          <SectionHeading
            index="08"
            :title="copy.sections.decisions[0]!"
          /><div class="decision-list">
            <article
              v-for="(item, index) in copy.decisions"
              :key="item[0]"
              :data-index="String(index + 1).padStart(2, '0')"
            >
              <div class="decision-list__head">
                <h3>{{ item[0] }}</h3>
              </div><p>{{ item[1] }}</p>
            </article>
          </div>
        </section>

        <section
          id="capital-section-9"
          class="case-section case-section--wide reveal-section"
        >
          <SectionHeading
            index="09"
            :title="copy.sections.finalUi[0]!"
          /><figure class="final-ui-showcase">
            <figcaption>{{ copy.labels.selectedUi }}</figcaption>
            <div
              class="interactive-home"
              v-bind="mediaMeta('01-home-desktop.png', 'After', copy.finalAssets[0]![1]!, 'Desktop', 'Interactive homepage walkthrough')"
            >
              <div class="interactive-home__stage">
                <video
                  ref="homeVideo"
                  src="/videos/toranj-capital-redesign/home-interactions.mp4"
                  poster="/images/case-studies/toranj-capital-redesign/comparisons/current-home-desktop.png"
                  controls
                  preload="metadata"
                  playsinline
                  :aria-label="locale === 'fa' ? 'ویدئوی نمایش تعامل‌های صفحهٔ اصلی بازطراحی ترنج کپیتال' : 'Video walkthrough of the redesigned Toranj Capital homepage interactions'"
                  @play="homeVideoPlaying = true"
                  @pause="homeVideoPlaying = false"
                  @ended="homeVideoPlaying = false"
                />
                <button
                  v-if="!homeVideoPlaying"
                  type="button"
                  class="interactive-home__play"
                  :aria-label="locale === 'fa' ? 'پخش دموی تعاملی صفحهٔ اصلی' : 'Play the interactive homepage demo'"
                  @click="playHomeVideo"
                >
                  <span
                    class="interactive-home__play-icon"
                    aria-hidden="true"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    ><path d="M8 5.7v12.6c0 .85.94 1.36 1.65.9l9.45-6.3a1.08 1.08 0 0 0 0-1.8L9.65 4.8A1.08 1.08 0 0 0 8 5.7Z" /></svg>
                  </span>
                </button>
                <span class="interactive-home__duration">00:34</span>
              </div>
              <div class="interactive-home__meta">
                <span>{{ locale === 'fa' ? 'دموی تعاملی صفحهٔ اصلی' : 'Interactive homepage demo' }}</span>
                <p>{{ locale === 'fa' ? 'حرکت، تغییر وضعیت‌ها و مسیرهای اصلی صفحه را در یک نمایش کوتاه ببینید.' : 'See the homepage motion, state changes, and primary paths in a short walkthrough.' }}</p>
              </div>
            </div>
          </figure>
        </section>

        <section
          id="capital-section-10"
          class="case-section reveal-section"
        >
          <SectionHeading
            index="10"
            :title="copy.sections.responsive[0]!"
          /><p class="case-lead">
            {{ copy.sections.responsive[1] }}
          </p><div
            class="device-comparison"
            :aria-label="locale === 'fa' ? 'مقایسه رفتار رابط در سه اندازه نمایشگر' : 'Interface behavior across three viewport sizes'"
          >
            <div
              v-for="device in deviceLabels"
              :key="device.name"
              class="device"
              :class="device.className"
            >
              <div
                class="device__viewport"
                aria-hidden="true"
              >
                <i /><i /><i />
              </div>
              <div class="device__meta">
                <span>{{ device.size }}</span>
                <strong>{{ device.name }}</strong>
              </div>
              <div class="device__behavior">
                <b>{{ device.mode }}</b>
                <small>{{ device.detail }}</small>
              </div>
            </div>
          </div>
        </section>

        <section
          id="capital-section-11"
          class="case-section reveal-section"
        >
          <SectionHeading
            index="11"
            :title="copy.sections.system[0]!"
          /><p class="case-lead system-intro">
            {{ copy.sections.system[1] }}
          </p><div class="system-showcase">
            <figure class="type-specimen">
              <div class="type-specimen__visual">
                <img
                  src="/images/case-studies/toranj-insurance/peyda-weight-specimen.png"
                  :alt="locale === 'fa' ? 'نمونه وزن‌های مختلف تایپ‌فیس Peyda از Thin تا ExtraBlack' : 'Peyda typeface weights from Thin through ExtraBlack'"
                  width="1640"
                  height="960"
                  loading="lazy"
                >
              </div>
              <figcaption>
                <span>{{ locale === 'fa' ? 'تایپوگرافی محصول' : 'Product typography' }}</span>
                <div>
                  <strong>Peyda</strong>
                  <p>{{ locale === 'fa' ? 'طیف وزن‌های Peyda برای ساخت سلسله‌مراتبی روشن و خوانا در رابط فارسی.' : 'Peyda weights support a clear and readable hierarchy across Persian interfaces.' }}</p>
                </div>
              </figcaption>
            </figure><figure class="palette-specimen">
              <header><span>02</span><strong>{{ locale === 'fa' ? 'پالت رابط کاربری' : 'Interface palette' }}</strong></header><ul>
                <li
                  v-for="token in copy.tokens"
                  :key="token[0]"
                  :style="{ '--system-color': token[1] }"
                >
                  <i /><div>
                    <strong>{{ token[0] }}</strong>
                    <small>{{ token[2] }}</small>
                    <code>{{ token[1] }}</code>
                  </div>
                </li>
              </ul>
            </figure>
          </div>
        </section>
        <section
          id="capital-section-12"
          class="case-section case-section--wide reveal-section"
        >
          <SectionHeading
            index="12"
            :title="copy.sections.accessibility[0]!"
          /><div class="review-grid">
            <article data-column="0">
              <h3>{{ copy.labels.strengths }}</h3><ul>
                <li
                  v-for="item in copy.accessibility.strengths"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ul>
            </article><article data-column="1">
              <h3>{{ copy.labels.needs }}</h3><ul>
                <li
                  v-for="item in copy.accessibility.needs"
                  :key="item"
                >
                  {{ item }}
                </li>
              </ul>
            </article>
          </div>
        </section>
        <section
          id="capital-section-13"
          class="case-section retrospective-section reveal-section"
        >
          <SectionHeading
            index="13"
            :title="copy.sections.retrospective[0]!"
          /><div class="retrospective-panel">
            <article>
              <span>{{ locale === 'fa' ? 'خروجی طراحی' : 'Design outcome' }}</span>
              <p>{{ copy.sections.retrospective[1] }}</p>
            </article>
            <article>
              <span>{{ locale === 'fa' ? 'گام اعتبارسنجی' : 'Validation next' }}</span>
              <p>{{ copy.sections.retrospective[2] }}</p>
            </article>
          </div>
        </section>
        <section
          id="capital-section-14"
          class="case-section improvement-section reveal-section"
        >
          <SectionHeading
            index="14"
            :title="copy.sections.improve[0]!"
          /><ol class="improvement-list">
            <li
              v-for="(item, index) in copy.improvements"
              :key="item"
              :data-index="String(index + 1).padStart(2, '0')"
            >
              <p>{{ item }}</p>
            </li>
          </ol>
        </section>
        <section
          id="capital-section-15"
          class="case-section outcome-section reveal-section"
        >
          <SectionHeading
            index="15"
            :title="copy.sections.outcomes[0]!"
          /><p class="outcome-metrics">
            {{ copy.sections.outcomes[1] }}
          </p><p class="case-copy">
            {{ copy.sections.outcomes[2] }}
          </p>
        </section>
        <section
          id="capital-section-16"
          class="case-section reveal-section"
        >
          <SectionHeading
            index="16"
            :title="copy.sections.learnings[0]!"
          /><ul class="learning-list">
            <li
              v-for="(item, index) in copy.learnings"
              :key="item"
              :data-index="String(index + 1).padStart(2, '0')"
            >
              <p>{{ item }}</p>
            </li>
          </ul>
        </section>
      </main>
    </div>
  </article>
</template>

<style scoped>
.selected-flow-label{display:none}
.capital-case{overflow-x:clip}.capital-case :deep(.case-hero__surface){border-block:0}.capital-case :deep(.case-hero__title){max-width:none;font-size:clamp(2.75rem,4.4vw,4.6rem);white-space:nowrap;text-align:center}
.hero-poster{position:relative;overflow:hidden;margin-top:clamp(1rem,2vw,2rem);border:1px solid color-mix(in srgb,var(--portfolio-accent) 18%,transparent);border-radius:1.15rem;background:#030807;box-shadow:0 2.25rem 7rem rgb(0 0 0/28%)}.hero-poster::after{position:absolute;inset:0;border-radius:inherit;box-shadow:inset 0 0 5rem rgb(0 0 0/22%);content:'';pointer-events:none}.hero-poster__image{display:block;width:100%;height:auto;aspect-ratio:16/9;object-fit:cover}
.case-shell{display:block;width:100%;max-width:none;padding-inline:0}.case-outline{position:sticky;top:4.75rem;z-index:20;display:flex;width:100%;align-items:stretch;overflow:hidden;margin-bottom:clamp(4rem,7vw,7rem);border-block:1px solid var(--portfolio-line);background:color-mix(in srgb,var(--portfolio-bg) 94%,transparent);box-shadow:0 .75rem 2rem rgb(0 0 0/5%);backdrop-filter:blur(18px)}.case-outline>p{display:flex;min-height:4.75rem;flex:none;align-items:center;padding-inline:.75rem 1.25rem;border-inline-end:1px solid var(--portfolio-line);color:var(--portfolio-text);font-size:.92rem;white-space:nowrap}.case-outline ol{display:flex;min-width:0;flex:1;gap:.25rem;overflow-x:auto;scrollbar-width:none}.case-outline ol::-webkit-scrollbar{display:none}.case-outline li{flex:1 0 auto}.case-outline a{position:relative;display:flex;min-height:4.75rem;align-items:center;justify-content:center;gap:.4rem;padding-inline:.75rem;border-inline-end:1px solid color-mix(in srgb,var(--portfolio-line) 65%,transparent);color:var(--portfolio-muted);font-size:clamp(.72rem,.78vw,.9rem);font-weight:650;white-space:nowrap;transition:color var(--motion-control),background-color var(--motion-control)}.case-outline a::after{position:absolute;inset-inline:1rem;bottom:0;height:2px;background:var(--portfolio-accent);content:'';opacity:0;transform:scaleX(.35);transition:opacity var(--motion-control),transform var(--motion-control)}.case-outline a.is-active{color:var(--portfolio-text)}.case-outline a.is-active::after{opacity:1;transform:scaleX(1)}.case-outline a span{color:var(--portfolio-accent);font-size:.8rem;font-weight:800}
.case-main{min-width:0;max-width:76rem;margin-inline:auto;counter-reset:case-section}.case-section{position:relative;isolation:isolate;max-width:66rem;margin-top:clamp(8rem,13vw,13rem);text-align:center;counter-increment:case-section}.case-section::before{position:absolute;inset-block-start:-4.75rem;left:50%;color:var(--portfolio-accent);font-size:1.75rem;font-weight:850;content:counter(case-section,decimal-leading-zero);transform:translateX(-50%)}.case-section:first-child{margin-top:0}.case-section--wide{max-width:76rem}.case-section :deep(.section-heading){align-items:center;text-align:center}.case-section :deep(.section-heading__kicker){display:flex;align-items:center;gap:.8rem}.case-section :deep(.section-heading__kicker::before),.case-section :deep(.section-heading__kicker::after){width:2rem;height:1px;background:var(--portfolio-line);content:''}.case-section :deep(.section-heading h2){max-width:34ch;margin-inline:auto;font-size:clamp(2rem,2.4vw,2.8rem);line-height:1.25}.case-section :deep(.section-heading h2::after){display:none}.case-lead{max-width:54rem;margin:2rem auto 0;color:color-mix(in srgb,var(--portfolio-accent) 58%,var(--portfolio-text));font-size:clamp(1.15rem,1.45vw,1.5rem);font-weight:650;line-height:1.75;text-align:center;text-wrap:balance}.case-copy{max-width:48rem;margin:1.2rem auto 0;color:var(--portfolio-muted);font-size:clamp(.95rem,1vw,1.05rem);line-height:1.9;text-align:center;text-wrap:pretty}.case-copy p+p{margin-top:1rem}.challenge-copy{margin-top:2.5rem;padding-top:2rem;border-top:1px solid var(--portfolio-line)}
.overview-section{position:relative;overflow:hidden;padding:clamp(2rem,4vw,4rem);border:1px solid color-mix(in srgb,var(--portfolio-line) 86%,transparent);border-radius:1.5rem;background:linear-gradient(145deg,color-mix(in srgb,var(--portfolio-surface) 78%,transparent),color-mix(in srgb,var(--portfolio-accent) 5%,var(--portfolio-bg)));box-shadow:0 2rem 6rem rgb(0 0 0/8%);text-align:start}.overview-section::after{position:absolute;inset-block-start:-8rem;inset-inline-end:-8rem;width:20rem;aspect-ratio:1;border:1px solid color-mix(in srgb,var(--portfolio-accent) 18%,transparent);border-radius:50%;box-shadow:0 0 0 3rem color-mix(in srgb,var(--portfolio-accent) 3%,transparent),0 0 0 7rem color-mix(in srgb,var(--portfolio-accent) 2%,transparent);content:'';pointer-events:none}.overview-section :deep(.section-heading){position:relative;z-index:1;align-items:flex-start;text-align:start}.overview-section :deep(.section-heading h2){width:100%;max-width:22ch;margin-inline:0;font-size:clamp(2.25rem,3vw,3.4rem)}.overview-stage{position:relative;z-index:1;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(18rem,.85fr);align-items:end;gap:clamp(2rem,5vw,5rem);margin-top:clamp(2rem,3.5vw,3.5rem);padding-block:clamp(1.5rem,2.5vw,2.5rem);border-block:1px solid var(--portfolio-line)}.overview-lead{max-width:28ch;color:var(--portfolio-text);font-size:clamp(1.25rem,1.7vw,1.7rem);font-weight:720;line-height:1.8;text-wrap:balance}.overview-scope{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.55rem}.overview-scope li{display:flex;min-width:0;align-items:center;gap:.65rem;padding:.7rem .8rem;border:1px solid var(--portfolio-line);border-radius:.7rem;background:color-mix(in srgb,var(--portfolio-bg) 55%,transparent);color:var(--portfolio-muted);font-size:.78rem;font-weight:650;line-height:1.45}.overview-scope span{color:var(--portfolio-accent);font-size:.66rem;font-weight:850}.overview-details{position:relative;z-index:1;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;margin-top:1rem}.overview-details article{min-height:12rem;padding:1.5rem;border-radius:1rem;background:color-mix(in srgb,var(--portfolio-bg) 60%,transparent);box-shadow:inset 0 1px color-mix(in srgb,var(--portfolio-text) 4%,transparent)}.overview-details article>span,.challenge-copy span{display:inline-flex;align-items:center;gap:.55rem;color:var(--portfolio-accent);font-size:.7rem;font-weight:850}.overview-details article>span::after,.challenge-copy span::after{width:1.75rem;height:1px;background:var(--portfolio-accent);content:'';opacity:.6}.overview-details article p{margin-top:1.25rem;color:var(--portfolio-muted);font-size:clamp(.9rem,1vw,1rem);line-height:1.9}.overview-note{display:flex;grid-column:1/-1;align-items:flex-start;gap:.85rem;padding:1rem 1.15rem;border-inline-start:2px solid var(--portfolio-accent);border-radius:.35rem;background:color-mix(in srgb,var(--portfolio-accent) 7%,transparent);color:var(--portfolio-text);font-size:.9rem;font-weight:600;line-height:1.8}.overview-note svg{width:1.1rem;height:1.1rem;flex:none;margin-top:.35rem;color:var(--portfolio-accent)}.challenge-copy{position:relative;z-index:1;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;margin-top:1rem}.challenge-copy article{padding:1.25rem 1.5rem;border-top:1px solid var(--portfolio-line);color:var(--portfolio-muted)}.challenge-copy p{margin-top:.75rem;font-size:.88rem;line-height:1.8}.architecture-intro{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.1fr);margin-top:clamp(2.5rem,4vw,4rem);text-align:start}.architecture-intro__lead{padding-inline-end:clamp(2rem,4vw,4rem);color:var(--portfolio-text);font-size:clamp(1.18rem,1.5vw,1.5rem);font-weight:650;line-height:1.85}.architecture-intro p+p{padding-inline-start:clamp(2rem,4vw,4rem);border-inline-start:1px solid var(--portfolio-line);color:var(--portfolio-muted);font-size:clamp(.98rem,1.08vw,1.08rem);line-height:2}.architecture-intro p{color:var(--portfolio-muted);font-size:1.05rem;line-height:1.95}.before-after-list{margin-top:clamp(3rem,5vw,5rem)}
.overview-section{overflow:visible;padding:0;border:0;border-radius:0;background:transparent;box-shadow:none}.overview-section::before,.overview-section::after{display:none}.overview-section :deep(.section-heading h2){max-width:18ch}.overview-stage{grid-template-columns:minmax(0,1.25fr) minmax(18rem,.75fr);align-items:center;margin-top:clamp(2.5rem,4vw,4rem);padding-block:clamp(2rem,3vw,3rem)}.overview-scope{gap:0 1.25rem}.overview-scope li{padding:.85rem 0;border:0;border-bottom:1px solid var(--portfolio-line);border-radius:0;background:transparent}.overview-details{gap:0;margin-top:clamp(2rem,3vw,3rem);border-top:1px solid var(--portfolio-line)}.overview-details article{min-height:0;padding:clamp(1.5rem,2.5vw,2.5rem) 0;border-radius:0;background:transparent;box-shadow:none}.overview-details article+article{padding-inline-start:clamp(1.5rem,3vw,3rem);border-inline-start:1px solid var(--portfolio-line)}.overview-details article:first-child{padding-inline-end:clamp(1.5rem,3vw,3rem)}.overview-note{margin-top:.5rem;border-radius:0;background:transparent}.challenge-copy{gap:0;margin-top:clamp(1.5rem,2.5vw,2.5rem);border-block:1px solid var(--portfolio-line)}.challenge-copy article{padding:clamp(1.25rem,2vw,2rem) 0;border:0}.challenge-copy article+article{padding-inline-start:clamp(1.5rem,3vw,3rem);border-inline-start:1px solid var(--portfolio-line)}.challenge-copy article:first-child{padding-inline-end:clamp(1.5rem,3vw,3rem)}
.overview-heading{display:grid;grid-template-columns:minmax(9rem,.38fr) minmax(0,1.62fr);align-items:end;gap:clamp(2rem,6vw,7rem);padding-bottom:clamp(2rem,3vw,3rem);border-bottom:1px solid var(--portfolio-line)}.overview-heading>p{display:flex;align-items:center;gap:.75rem;color:var(--portfolio-muted);font-size:.75rem;font-weight:750}.overview-heading>p span{color:var(--portfolio-accent);font-weight:850}.overview-heading>p::after{width:2.5rem;height:1px;background:var(--portfolio-accent);content:'';opacity:.65}.overview-heading h2{max-width:18ch;margin:0;color:var(--portfolio-text);font-family:var(--font-display);font-size:clamp(2.6rem,4vw,4.5rem);font-weight:850;letter-spacing:-.045em;line-height:1.15;text-wrap:balance}.overview-feature{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(18rem,.9fr);align-items:start;gap:clamp(2rem,6vw,7rem);padding-block:clamp(2.5rem,4vw,4rem)}.overview-feature .overview-lead{max-width:25ch;margin:0;color:var(--portfolio-text);font-size:clamp(1.35rem,2vw,2rem);font-weight:750;line-height:1.65;text-wrap:balance}.overview-feature>p:last-child{margin:0;padding-inline-start:clamp(1.5rem,3vw,3rem);border-inline-start:1px solid var(--portfolio-line);color:var(--portfolio-muted);font-size:clamp(.9rem,1vw,1rem);line-height:2}.overview-points{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));border-block:1px solid var(--portfolio-line)}.overview-points li{min-width:0;padding:clamp(1.5rem,2.5vw,2.5rem);text-align:start}.overview-points li+li{border-inline-start:1px solid var(--portfolio-line)}.overview-points span{color:var(--portfolio-accent);font-size:.72rem;font-weight:850}.overview-points p{margin:1.15rem 0 0;color:var(--portfolio-muted);font-size:clamp(.84rem,.95vw,.96rem);line-height:1.9}.overview-footnote{display:flex;max-width:55rem;align-items:flex-start;gap:.85rem;margin-block-start:clamp(2rem,3vw,3rem);margin-inline-start:auto;padding-inline-start:1rem;border-inline-start:2px solid var(--portfolio-accent);color:var(--portfolio-muted);font-size:.85rem;line-height:1.85;text-align:start}.overview-footnote svg{width:1.05rem;height:1.05rem;flex:none;margin-top:.35rem;color:var(--portfolio-accent)}[lang=fa] .overview-heading h2{letter-spacing:0}
.overview-composition{display:flex;flex-direction:column;align-items:center;gap:clamp(2.5rem,4vw,4rem);padding-block:clamp(3rem,5vw,5rem)}.overview-statement{display:flex;width:100%;flex-direction:column;align-items:center;text-align:center}.overview-statement span{display:flex;align-items:center;justify-content:center;gap:.75rem;margin:0;color:var(--portfolio-muted);font-size:.78rem;font-weight:750}.overview-statement span::before,.overview-statement span::after{width:2.5rem;height:1px;background:var(--portfolio-accent);content:'';opacity:.65}.overview-statement p{width:min(100%,58ch);max-width:none;margin:1.25rem auto 0;color:var(--portfolio-text);font-size:clamp(1.3rem,1.7vw,1.75rem);font-weight:760;line-height:1.65;text-align:center;text-wrap:balance}.service-map{position:relative;display:flex;width:100%;min-height:0;flex-direction:column;align-items:center;gap:1.25rem}.service-map::before,.service-map::after{display:none}.service-map__core{position:relative;z-index:2;display:flex;width:auto;aspect-ratio:auto;align-items:center;gap:.65rem;padding:.65rem 1rem;border:1px solid color-mix(in srgb,var(--portfolio-accent) 42%,var(--portfolio-line));border-radius:999px;background:color-mix(in srgb,var(--portfolio-accent) 10%,var(--portfolio-bg));color:var(--portfolio-accent);text-align:center;box-shadow:none}.service-map__core strong{font-family:var(--font-display);font-size:1.2rem;font-weight:950;line-height:1}.service-map__core span{margin:0;font-size:.7rem;font-weight:750;opacity:.85}.service-map ol{position:static;display:grid;width:100%;grid-template-columns:repeat(4,minmax(0,1fr));gap:.75rem}.service-map li,.service-map li:nth-child(n){position:relative;inset:auto;display:flex;min-height:6.5rem;align-items:flex-end;justify-content:space-between;gap:1rem;overflow:hidden;padding:1.15rem 1.25rem;border:1px solid var(--portfolio-line);border-radius:1rem;background:linear-gradient(145deg,color-mix(in srgb,var(--portfolio-surface) 88%,transparent),color-mix(in srgb,var(--portfolio-accent) 4%,var(--portfolio-bg)));color:var(--portfolio-text);font-size:clamp(.82rem,.92vw,.95rem);font-weight:720;white-space:normal;transform:none;transition:border-color var(--motion-control),transform var(--motion-control)}.service-map li::after{position:absolute;inset-block-start:0;inset-inline:1.25rem;height:2px;background:var(--portfolio-accent);content:'';opacity:.55}.service-map li:hover{border-color:color-mix(in srgb,var(--portfolio-accent) 48%,var(--portfolio-line));transform:translateY(-3px)}.service-map li span{order:2;color:var(--portfolio-accent);font-family:var(--font-display);font-size:.76rem;font-weight:900}
.overview-section{scroll-margin-top:10rem}.overview-heading{display:flex;flex-direction:column;align-items:center;gap:clamp(1rem,1.8vw,1.5rem);text-align:center}.overview-heading>p{justify-content:center}.overview-heading>p::before{width:2.5rem;height:1px;background:var(--portfolio-accent);content:'';opacity:.65}.overview-heading h2{width:100%;max-width:none;margin-inline:auto;font-size:clamp(2.25rem,3.2vw,3.7rem);line-height:1.18;text-align:center;white-space:nowrap}
.case-section::before{display:none}.overview-composition{gap:0;padding-block:clamp(2.5rem,4vw,4rem)}.service-map{display:grid;width:min(100%,50rem);min-height:29rem;place-items:center}.service-map::before,.service-map::after{position:absolute;display:block;aspect-ratio:1;border:1px solid color-mix(in srgb,var(--portfolio-line) 82%,transparent);border-radius:50%;content:'';pointer-events:none}.service-map::before{width:min(25rem,72%);box-shadow:0 0 0 3.5rem color-mix(in srgb,var(--portfolio-accent) 2.5%,transparent)}.service-map::after{width:min(16.5rem,48%);border-style:dashed;opacity:.7}.service-map__core{display:grid;width:8.25rem;aspect-ratio:1;place-content:center;padding:0;border:1px solid color-mix(in srgb,var(--portfolio-accent) 68%,transparent);border-radius:50%;background:radial-gradient(circle at 35% 28%,color-mix(in srgb,var(--portfolio-accent) 78%,white),var(--portfolio-accent) 65%);color:#fff;box-shadow:0 1.5rem 4.5rem color-mix(in srgb,var(--portfolio-accent) 25%,transparent),inset 0 1px rgb(255 255 255/28%)}.service-map__core span{font-size:.9rem;font-weight:850;color:#fff;opacity:1}.service-map ol{position:absolute;inset:0;display:block}.service-map li,.service-map li:nth-child(n){position:absolute;display:flex;width:13.5rem;min-height:4.25rem;align-items:center;justify-content:flex-start;gap:.75rem;overflow:visible;padding:.75rem 1rem;border:1px solid color-mix(in srgb,var(--portfolio-line) 92%,transparent);border-radius:1rem;background:linear-gradient(145deg,color-mix(in srgb,var(--portfolio-surface) 94%,transparent),color-mix(in srgb,var(--portfolio-accent) 4%,var(--portfolio-bg)));box-shadow:0 1rem 2.5rem rgb(0 0 0/8%);font-size:clamp(.78rem,.9vw,.92rem);white-space:normal;transform:none}.service-map li::after{position:absolute;inset-block:1rem;inset-inline-start:0;display:block;width:2px;height:auto;background:var(--portfolio-accent);content:'';opacity:.8}.service-map li:hover{border-color:color-mix(in srgb,var(--portfolio-accent) 58%,var(--portfolio-line));transform:translateY(-2px)}.service-map li span{order:-1;display:grid;width:2rem;aspect-ratio:1;flex:none;place-items:center;border-radius:50%;background:color-mix(in srgb,var(--portfolio-accent) 12%,transparent);font-size:.67rem}.service-map li:nth-child(1){top:9%;right:1.5%}.service-map li:nth-child(2){right:1.5%;bottom:9%}.service-map li:nth-child(3){bottom:9%;left:1.5%}.service-map li:nth-child(4){top:9%;left:1.5%}[dir=rtl] .service-map li:nth-child(n){transform:none}[dir=rtl] .service-map li:nth-child(n):hover{transform:translateY(-2px)}
.service-map li,.service-map li:nth-child(n){width:9.25rem;min-height:0;aspect-ratio:1;flex-direction:column;justify-content:center;gap:.65rem;padding:1rem;border-radius:50%;background:radial-gradient(circle at 35% 25%,color-mix(in srgb,var(--portfolio-surface) 96%,var(--portfolio-accent)),color-mix(in srgb,var(--portfolio-surface) 88%,var(--portfolio-bg)));text-align:center;box-shadow:0 1.25rem 3rem rgb(0 0 0/10%)}.service-map li::after{inset:.45rem;display:block;width:auto;height:auto;border:1px solid color-mix(in srgb,var(--portfolio-accent) 18%,transparent);border-radius:50%;background:transparent;opacity:1}.service-map li span{z-index:1;width:2.15rem}.service-map li:nth-child(1){top:3%;right:10%}.service-map li:nth-child(2){right:10%;bottom:3%}.service-map li:nth-child(3){bottom:3%;left:10%}.service-map li:nth-child(4){top:3%;left:10%}
.service-map__core{width:10rem}.service-map__core span{font-size:1.05rem}
#capital-section-2 :deep(.section-heading h2),#capital-section-3 :deep(.section-heading h2){width:100%;max-width:none;font-size:clamp(1.9rem,2.2vw,2.6rem);white-space:nowrap}.before-after-list :deep(.media-slot figcaption){display:none}
.matrix-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin-top:2rem;border-block:1px solid var(--portfolio-line);text-align:start}.matrix-list li{display:flex;min-height:4.5rem;align-items:center;justify-content:center;padding:1rem;border-bottom:1px solid var(--portfolio-line);color:var(--portfolio-text);font-size:.92rem;line-height:1.65;text-align:center}.matrix-list li:not(:nth-child(3n+1)){border-inline-start:1px solid var(--portfolio-line)}
.ia-map{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1rem;margin-top:clamp(2.75rem,4vw,4rem)}.ia-map__tabs{display:none}.ia-group{position:relative;min-width:0;min-height:17rem;overflow:hidden;padding:1.35rem;border:1px solid color-mix(in srgb,var(--portfolio-line) 90%,transparent);border-radius:1.25rem;background:linear-gradient(145deg,color-mix(in srgb,var(--portfolio-surface) 92%,transparent),color-mix(in srgb,var(--portfolio-accent) 3.5%,var(--portfolio-bg)));box-shadow:0 1.5rem 4rem rgb(0 0 0/7%);text-align:start;transition:border-color var(--motion-control),transform var(--motion-control)}.ia-group:hover{border-color:color-mix(in srgb,var(--portfolio-accent) 42%,var(--portfolio-line));transform:translateY(-3px)}.ia-group::before{position:absolute;inset-block-start:-4rem;inset-inline-end:-4rem;width:10rem;aspect-ratio:1;border-radius:50%;background:color-mix(in srgb,var(--portfolio-accent) 5%,transparent);content:'';pointer-events:none}.ia-group::after{position:absolute;inset-block-end:-1.1rem;inset-inline-end:.8rem;color:color-mix(in srgb,var(--portfolio-accent) 9%,transparent);font-family:var(--font-display);font-size:5rem;font-weight:950;line-height:1;content:attr(data-index);pointer-events:none}.ia-group__head{position:relative;z-index:1;display:flex;align-items:center;padding-bottom:1.15rem}.ia-group__head strong{color:var(--portfolio-text);font-size:1.05rem;font-weight:800}.ia-group ul{position:relative;z-index:1;display:grid;gap:.4rem}.ia-group li{padding:.65rem .75rem;border:0;border-radius:.65rem;background:light-dark(#ddd0bf,color-mix(in srgb,var(--portfolio-bg) 58%,transparent));color:var(--portfolio-muted);font-size:.8rem;line-height:1.5}.ia-group:nth-child(n+6){border-top:1px solid color-mix(in srgb,var(--portfolio-line) 90%,transparent)}
@media(min-width:1024px){.ia-map{grid-template-columns:repeat(12,minmax(0,1fr))}.ia-group{grid-column:span 4}.ia-group:nth-child(2){grid-column:span 4}.ia-group:nth-child(3){grid-column:span 8}.ia-group:nth-child(3) ul{grid-template-columns:repeat(2,minmax(0,1fr))}}
.flow-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));margin-top:3rem;border-block:1px solid var(--portfolio-line)}.flow-grid--four{grid-template-columns:repeat(4,minmax(0,1fr))}.flow-grid article{display:flex;min-height:11.5rem;flex-direction:column;padding:1.35rem 1.5rem;border-inline-end:1px solid var(--portfolio-line);text-align:start}.flow-grid article:nth-child(3n){border-inline-end:0}.flow-grid article:nth-child(n+4){border-top:1px solid var(--portfolio-line)}.flow-grid--four article:nth-child(3n){border-inline-end:1px solid var(--portfolio-line)}.flow-grid--four article:last-child{border-inline-end:0}.flow-grid--four article:nth-child(n+4){border-top:0}.flow-grid span{color:var(--portfolio-accent);font-size:.82rem;font-weight:800}.flow-grid h3{margin-top:auto;color:var(--portfolio-text);font-size:clamp(1.02rem,1.08vw,1.14rem);font-weight:650;line-height:1.45}
#capital-section-5>.case-lead{width:min(100%,70ch);max-width:none;text-wrap:balance}.portfolio-timeline{position:relative;gap:0;margin-top:3.5rem;padding:1.5rem 1rem 1.25rem;overflow:hidden;border:1px solid color-mix(in srgb,var(--portfolio-line) 86%,transparent);border-radius:1.75rem;background:linear-gradient(145deg,color-mix(in srgb,var(--portfolio-surface) 70%,transparent),color-mix(in srgb,var(--portfolio-accent) 3%,var(--portfolio-bg)));box-shadow:0 1.75rem 5rem rgb(0 0 0/8%)}.portfolio-timeline::before{position:absolute;z-index:0;inset-block-start:3rem;inset-inline:10%;height:2px;background:linear-gradient(90deg,transparent,color-mix(in srgb,var(--portfolio-accent) 72%,var(--portfolio-line)) 12%,color-mix(in srgb,var(--portfolio-accent) 72%,var(--portfolio-line)) 88%,transparent);content:''}.portfolio-timeline article,.portfolio-timeline article:nth-child(3n),.portfolio-timeline article:nth-child(n+4),.portfolio-timeline article:last-child{position:relative;z-index:1;min-height:9rem;align-items:center;padding:0 .55rem;border:0;border-radius:0;background:transparent;box-shadow:none;text-align:center;transition:transform var(--motion-control)}.portfolio-timeline article+article{border-inline-start:1px solid color-mix(in srgb,var(--portfolio-line) 68%,transparent)}.portfolio-timeline article::after{position:absolute;inset-block-start:3.35rem;inset-inline-start:50%;width:1px;height:1.4rem;background:linear-gradient(var(--portfolio-accent),transparent);content:'';opacity:.7}.portfolio-timeline article:hover{transform:translateY(-4px)}.portfolio-timeline span{display:grid;width:3rem;aspect-ratio:1;place-items:center;margin:0;border:1px solid color-mix(in srgb,var(--portfolio-accent) 78%,transparent);border-radius:50%;background:radial-gradient(circle at 35% 25%,color-mix(in srgb,var(--portfolio-accent) 80%,white),var(--portfolio-accent));color:#fff;box-shadow:0 0 0 .45rem var(--portfolio-bg),0 .7rem 2rem color-mix(in srgb,var(--portfolio-accent) 26%,transparent);font-family:var(--font-display);font-size:.72rem;font-weight:900}.portfolio-timeline h3{display:grid;width:100%;min-height:4.5rem;place-items:center;margin-top:1.7rem;padding:.75rem;border:1px solid color-mix(in srgb,var(--portfolio-line) 70%,transparent);border-radius:1rem;background:color-mix(in srgb,var(--portfolio-bg) 58%,transparent);color:var(--portfolio-text);font-size:clamp(.92rem,1vw,1.08rem);font-weight:750;line-height:1.55}
#capital-section-6 :deep(.section-heading h2){width:100%;max-width:none;white-space:nowrap}.risk-model-grid{position:relative;grid-template-columns:repeat(4,minmax(0,1fr));gap:1rem;margin-top:3.25rem;border:0}.risk-model-grid article,.risk-model-grid article:nth-child(3n),.risk-model-grid article:nth-child(n+4),.risk-model-grid article:last-child{position:relative;min-height:8.75rem;overflow:hidden;padding:1.25rem;border:1px solid color-mix(in srgb,var(--portfolio-line) 86%,transparent);border-radius:1.15rem;background:linear-gradient(150deg,color-mix(in srgb,var(--portfolio-surface) 84%,transparent),color-mix(in srgb,var(--portfolio-accent) 4%,var(--portfolio-bg)));box-shadow:0 .85rem 2.25rem rgb(0 0 0/7%);transition:border-color var(--motion-control),transform var(--motion-control)}.risk-model-grid article::before{position:absolute;inset-block-end:-1.3rem;inset-inline-end:.55rem;color:color-mix(in srgb,var(--portfolio-accent) 10%,transparent);content:attr(data-index);font-family:var(--font-display);font-size:5.5rem;font-weight:950;line-height:1}.risk-model-grid article::after{position:absolute;inset-block-start:0;inset-inline:1.25rem;height:2px;background:linear-gradient(90deg,var(--portfolio-accent),transparent);content:''}.risk-model-grid article:hover{border-color:color-mix(in srgb,var(--portfolio-accent) 48%,var(--portfolio-line));transform:translateY(-4px)}.risk-model-grid h3{position:relative;z-index:1;max-width:none;margin-top:auto;color:var(--portfolio-text);font-size:clamp(1rem,1.15vw,1.2rem);font-weight:780;line-height:1.6;white-space:nowrap}
.risk-group-label{display:flex;align-items:center;justify-content:center;gap:.65rem;margin:2rem auto -1.75rem;color:var(--portfolio-accent);font-size:.72rem;font-weight:850}.risk-group-label::before,.risk-group-label::after{width:2rem;height:1px;background:currentColor;content:'';opacity:.45}.risk-group-label--evidence{margin-top:2rem;margin-bottom:-.75rem}
.evidence-pill,.artifact-caption{max-width:50rem;margin:1.5rem auto 0;padding:1rem 1.2rem;border-inline-start:2px solid var(--portfolio-accent);background:var(--portfolio-surface);color:var(--portfolio-muted);font-size:.88rem;line-height:1.75;text-align:start}.flow-tabs{display:flex;gap:.35rem;margin-top:2rem;overflow-x:auto;padding:.3rem;border:1px solid var(--portfolio-line);border-radius:.9rem;background:color-mix(in srgb,var(--portfolio-surface) 58%,transparent)}.flow-tabs button{display:flex;min-width:max-content;flex:1;align-items:center;justify-content:center;gap:.4rem;padding:.7rem;border-radius:.65rem;color:var(--portfolio-muted);font-size:.78rem;font-weight:700}.flow-tabs button span{color:var(--portfolio-accent);font-size:.68rem}.flow-tabs button.is-active{background:var(--portfolio-accent);color:#fff}.flow-tabs button.is-active span{color:rgb(255 255 255/72%)}.selected-flow{display:flex;align-items:stretch;gap:1px;margin-top:.75rem;overflow-x:auto;background:var(--portfolio-line)}.selected-flow>span{display:grid;min-width:8.5rem;min-height:6rem;flex:1;place-content:center;gap:.65rem;padding:1rem;background:var(--portfolio-bg);color:var(--portfolio-text);font-size:.82rem;font-weight:650;text-align:center}.selected-flow i{color:var(--portfolio-accent);font-size:.68rem;font-style:normal}
.wireframe-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem;margin-top:3rem}.wireframe-card{padding:1rem;border:1px solid var(--portfolio-line);border-radius:.75rem;background:color-mix(in srgb,var(--portfolio-surface) 58%,transparent)}.wireframe-frame{overflow:hidden;border-radius:.75rem;background:#d4d0c9;color:#34312d}.wireframe-page{display:flex;min-height:19rem;flex-direction:column;padding:.85rem;background:#efede8}.wireframe-page small{font-size:.48rem;opacity:.6}.wireframe-page h3{margin-top:.35rem;font-size:.78rem}.wireframe-block{display:flex;min-height:3rem;align-items:center;margin-top:.65rem;padding:.6rem;border-radius:.35rem;background:#d7d4ce;font-size:.5rem;line-height:1.35}.wireframe-block[data-priority=lead]{min-height:4.8rem}.wireframe-block[data-priority=action]{min-height:2.4rem;margin-top:auto;justify-content:center;background:#403d38;color:#f3f0ea}.wireframe-card figcaption{display:flex;align-items:center;gap:.75rem;padding-top:1rem;color:var(--portfolio-text);font-size:.9rem;text-align:start}.wireframe-card figcaption>span{display:grid;width:2rem;height:2rem;flex:none;place-items:center;border:1px solid var(--portfolio-line);border-radius:50%;color:var(--portfolio-accent);font-size:.68rem}
.decision-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:0 2rem;margin-top:3rem;padding-block:.4rem;border-block:1px solid var(--portfolio-line)}.decision-list article{min-height:5.75rem;padding:1rem .25rem;border-bottom:1px solid var(--portfolio-line);text-align:start}.decision-list article:nth-last-child(-n+2){border-bottom:0}.decision-list__trigger{display:grid;width:100%;grid-template-columns:2.75rem minmax(0,1fr) auto;align-items:center;gap:1rem;text-align:start;cursor:pointer}.decision-list__trigger>span{display:grid;width:2.5rem;height:2.5rem;place-items:center;border-radius:50%;background:color-mix(in srgb,var(--portfolio-accent) 11%,transparent);color:var(--portfolio-accent);font-size:.72rem;font-weight:850}.decision-list__trigger>svg{display:none}.decision-list h3{color:var(--portfolio-text);font-size:clamp(1rem,1.12vw,1.18rem);font-weight:650;line-height:1.65}.decision-list__detail{margin-inline-start:3.75rem}.decision-list__detail p{margin-top:.55rem;color:var(--portfolio-muted);font-size:.86rem;line-height:1.65}
.final-ui-showcase{margin-top:clamp(3rem,5vw,5rem)}.final-ui-showcase>figcaption{display:flex;align-items:center;gap:1rem;margin-bottom:1.25rem;color:var(--portfolio-text);font-size:clamp(1.15rem,1.35vw,1.4rem);font-weight:700;text-align:start}.final-ui-showcase>figcaption::after{width:4rem;height:2px;background:var(--portfolio-accent);content:'';opacity:.72}.media-grid,.theme-pair{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:2.5rem 1rem}.theme-pair{margin-top:3rem}.media-grid>:first-child{grid-column:1/-1}.media-grid>:deep(.media-slot),.theme-pair>:deep(.media-slot){overflow:hidden;border-radius:.9rem;background:color-mix(in srgb,var(--portfolio-surface) 58%,transparent);box-shadow:0 1.5rem 4rem rgb(0 0 0/9%)}.media-grid>:deep(.media-slot figcaption),.theme-pair>:deep(.media-slot figcaption){padding:1rem}.case-section>:deep(.media-slot){margin-top:2rem}
.interactive-home{position:relative;overflow:hidden;padding:.6rem;border:1px solid color-mix(in srgb,var(--portfolio-accent) 24%,var(--portfolio-line));border-radius:1.5rem;background:linear-gradient(145deg,color-mix(in srgb,var(--portfolio-surface) 92%,transparent),color-mix(in srgb,var(--portfolio-accent) 4%,var(--portfolio-bg)));box-shadow:0 2rem 5rem rgb(0 0 0/14%)}.interactive-home::before{position:absolute;z-index:4;inset-block-start:0;inset-inline:12%;height:2px;background:linear-gradient(90deg,transparent,var(--portfolio-accent),transparent);content:''}.interactive-home__stage{position:relative;overflow:hidden;aspect-ratio:16/9;border-radius:1rem;background:#020807}.interactive-home__stage::after{position:absolute;inset:0;background:linear-gradient(180deg,rgb(0 0 0/8%),transparent 48%,rgb(0 0 0/38%));content:'';pointer-events:none}.interactive-home video{position:relative;z-index:1;display:block;width:100%;height:100%;object-fit:cover;object-position:top center}.interactive-home__play{position:absolute;z-index:3;inset:0;display:grid;width:100%;place-items:center;padding:1.5rem;background:rgb(0 0 0/20%);color:#fff;cursor:pointer;transition:background-color var(--motion-control)}.interactive-home__play:hover{background:rgb(0 0 0/31%)}.interactive-home__play-icon{display:grid;width:clamp(4rem,6vw,5.5rem);aspect-ratio:1;place-items:center;border:1px solid rgb(255 255 255/34%);border-radius:50%;background:color-mix(in srgb,var(--portfolio-accent) 88%,transparent);box-shadow:0 0 0 .7rem rgb(255 255 255/8%),0 1.25rem 3.5rem color-mix(in srgb,var(--portfolio-accent) 40%,transparent);backdrop-filter:blur(12px);transition:transform var(--motion-control)}.interactive-home__play:hover .interactive-home__play-icon{transform:scale(1.06)}.interactive-home__play-icon svg{width:42%;margin-inline-start:.16rem}.interactive-home__duration{position:absolute;z-index:3;inset-inline-end:1rem;inset-block-end:1rem;padding:.35rem .55rem;border:1px solid rgb(255 255 255/14%);border-radius:.45rem;background:rgb(0 0 0/64%);color:#fff;font-size:.68rem;font-weight:750;direction:ltr;pointer-events:none}.interactive-home__meta{display:flex;align-items:center;justify-content:space-between;gap:2rem;padding:1.2rem .8rem .7rem;text-align:start}.interactive-home__meta span{display:inline-flex;align-items:center;gap:.55rem;color:var(--portfolio-accent);font-size:.78rem;font-weight:850;white-space:nowrap}.interactive-home__meta span::before{width:.5rem;aspect-ratio:1;border-radius:50%;background:var(--portfolio-accent);box-shadow:0 0 0 .3rem color-mix(in srgb,var(--portfolio-accent) 12%,transparent);content:''}.interactive-home__meta p{max-width:42rem;color:var(--portfolio-muted);font-size:.84rem;line-height:1.8}
.device-comparison{display:grid;grid-template-columns:2fr 1.15fr .65fr;align-items:end;gap:1rem;margin-top:3rem}.device{display:grid;min-height:10rem;place-items:center;border:1px solid var(--portfolio-line);border-radius:.75rem .75rem 0 0;background:var(--portfolio-surface);color:var(--portfolio-muted)}.device--desktop{min-height:17rem}.device--tablet{min-height:14rem}.system-showcase{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(20rem,.9fr);gap:1rem;margin-top:3rem}.system-showcase>:is(article,figure){padding:1.5rem;border-radius:.9rem;background:color-mix(in srgb,var(--portfolio-surface) 72%,transparent);text-align:start}.system-showcase header{display:flex;justify-content:space-between;gap:1rem}.system-showcase header span{color:var(--portfolio-accent);font-size:.78rem;font-weight:800}.type-specimen__sample{display:grid;min-height:15rem;place-items:center;margin-top:1.5rem;border-radius:.7rem;background:#fff;color:#15181d;font-family:var(--font-display);font-size:clamp(3rem,6vw,6rem);font-weight:850;direction:ltr}.palette-specimen ul{display:grid;grid-template-columns:repeat(2,1fr);gap:.65rem;margin-top:1.5rem}.palette-specimen li{overflow:hidden;border-radius:.8rem;background:var(--portfolio-bg)}.palette-specimen li>i{display:block;min-height:6.25rem;background:var(--system-color)}.palette-specimen li>div{display:grid;gap:.2rem;padding:.75rem .85rem}.palette-specimen code{color:var(--portfolio-muted);font-size:.75rem;direction:ltr}
.review-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1rem;margin-top:3rem}.review-grid article{--review-tone:var(--portfolio-accent);padding:1.5rem;border-top:2px solid var(--review-tone);border-radius:.75rem;background:color-mix(in srgb,var(--portfolio-surface) 62%,transparent);text-align:start}.review-grid article[data-column='0']{--review-tone:#62806b}.review-grid h3{color:var(--portfolio-text);font-size:1.35rem;font-weight:800}.review-grid ul{margin-top:1.25rem}.review-grid li{padding:.8rem 0;border-top:1px solid var(--portfolio-line);color:var(--portfolio-muted);font-size:.95rem;line-height:1.65}.improvement-list{margin-top:2.5rem}.improvement-list li{display:grid;grid-template-columns:3rem 1fr;gap:1rem;padding:1.25rem 0;border-bottom:1px solid var(--portfolio-line);color:var(--portfolio-muted);line-height:1.7;text-align:start}.improvement-list span{color:var(--portfolio-accent);font-size:.8rem}.outcome-section{max-width:76rem;padding:clamp(2rem,5vw,5rem);border:1px solid color-mix(in srgb,var(--portfolio-accent) 45%,var(--portfolio-line));border-radius:.75rem;background:linear-gradient(135deg,var(--portfolio-surface),var(--portfolio-accent-soft))}.outcome-metrics{max-width:42rem;margin:2rem auto 0;color:var(--portfolio-accent);font-size:clamp(1.2rem,1.6vw,1.5rem);font-weight:650;line-height:1.7}
@supports(animation-timeline:view()){.reveal-section{animation:case-reveal var(--motion-major) var(--ease-enter) both;animation-timeline:view();animation-range:entry 5% cover 22%}}@keyframes case-reveal{from{opacity:0;transform:translateY(1.25rem)}to{opacity:1;transform:none}}
@media(max-width:1023px){.case-outline{top:4.25rem}.case-outline>p,.case-outline a{min-height:4.25rem}.case-outline a{padding-inline:1rem;font-size:.9rem}.case-main{max-width:none;padding-inline:var(--portfolio-gutter)}.ia-map{grid-template-columns:repeat(2,minmax(0,1fr));overflow:visible}.wireframe-grid{grid-template-columns:repeat(2,1fr)}.system-showcase{grid-template-columns:1fr}}
@media(max-width:767px){.capital-case :deep(.case-hero__title){white-space:normal;text-align:start}.case-section::before{inset-block-start:-4.25rem;font-size:1.4rem}.case-section :deep(.section-heading h2){font-size:clamp(1.8rem,8vw,2.6rem)}.overview-stage,.overview-details,.challenge-copy,.architecture-intro,.media-grid,.theme-pair,.review-grid{grid-template-columns:1fr}.overview-section{padding:0}.overview-stage{align-items:start;gap:1.25rem;margin-top:1.5rem;padding-block:1.25rem}.overview-lead{max-width:none;font-size:1.05rem}.overview-scope{grid-template-columns:1fr}.overview-details article,.overview-details article:first-child,.overview-details article+article{min-height:0;padding:1.15rem 0;border-inline-start:0;border-bottom:1px solid var(--portfolio-line)}.overview-details article p{margin-top:.8rem;font-size:.84rem}.overview-note{font-size:.8rem}.challenge-copy article,.challenge-copy article:first-child,.challenge-copy article+article{padding:1rem 0;border-inline-start:0}.challenge-copy article+article{border-top:1px solid var(--portfolio-line)}.architecture-intro__lead{padding:.9rem 1rem;border-inline-start:2px solid var(--portfolio-accent);background:linear-gradient(90deg,color-mix(in srgb,var(--portfolio-accent) 9%,transparent),transparent);font-size:.98rem}.architecture-intro p+p{margin-top:1rem;padding-inline-start:0;border:0;font-size:.84rem}.matrix-list{grid-template-columns:1fr}.matrix-list li{border-inline-start:0!important}.ia-map{display:block;overflow:visible}.ia-map__tabs{display:flex;gap:.35rem;overflow-x:auto;padding:.3rem;border:1px solid var(--portfolio-line);border-radius:.9rem}.ia-map__tabs button{display:flex;min-width:max-content;align-items:center;gap:.35rem;padding:.58rem .7rem;border-radius:.65rem;color:var(--portfolio-muted);font-size:.72rem;font-weight:700}.ia-map__tabs button span{color:var(--portfolio-accent);font-size:.6rem}.ia-map__tabs button.is-active{background:var(--portfolio-accent);color:#fff}.ia-group{display:none;margin-top:.65rem;border-radius:1rem}.ia-group.is-active{display:block}.flow-grid,.flow-grid--four{grid-template-columns:1fr}.flow-grid article,.flow-grid--four article{min-height:8rem;border-inline-end:0;border-bottom:1px solid var(--portfolio-line)}.flow-grid article:last-child{border-bottom:0}.wireframe-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:.75rem}.wireframe-card{padding:.7rem}.wireframe-page{min-height:15rem}.decision-list{grid-template-columns:1fr}.decision-list article,.decision-list article:nth-last-child(-n+2){border-bottom:1px solid var(--portfolio-line)}.decision-list article:last-child{border-bottom:0}.decision-list__trigger>svg{display:block}.decision-list__detail{display:none;padding-bottom:.5rem}.decision-list article.is-active .decision-list__detail{display:block}.decision-list article.is-active .decision-list__trigger>svg{transform:rotate(180deg)}.media-grid>:first-child{grid-column:auto}.device-comparison{gap:.5rem}.device--desktop{min-height:10rem}.device--tablet{min-height:8rem}.device--phone{min-height:6rem}.palette-specimen ul{grid-template-columns:repeat(2,1fr)}.outcome-section{margin-inline:calc(var(--portfolio-gutter)*-1);border-radius:0}}
@media(max-width:767px){.overview-heading{grid-template-columns:1fr;gap:1rem;padding-bottom:1.5rem}.overview-heading h2{max-width:13ch;font-size:clamp(2rem,9vw,3rem)}.overview-composition{gap:2rem;padding-block:2rem}.overview-statement p{width:100%;font-size:1.12rem;line-height:1.75}.overview-statement span::before,.overview-statement span::after{width:1.5rem}.service-map{gap:1rem}.service-map__core{padding:.6rem .9rem}.service-map__core strong{font-size:1.05rem}.service-map ol{grid-template-columns:repeat(2,minmax(0,1fr));gap:.6rem}.service-map li,.service-map li:nth-child(n){min-height:5.5rem;padding:1rem;font-size:.76rem}}
@media(max-width:767px){.overview-heading h2{width:100%;max-width:none;font-size:clamp(1.75rem,8vw,2.35rem);line-height:1.3;white-space:normal}.overview-heading>p::before,.overview-heading>p::after{width:1.75rem}}
@media(max-width:767px){.service-map{width:100%;min-height:24rem}.service-map::before{width:14.5rem;box-shadow:0 0 0 1.75rem color-mix(in srgb,var(--portfolio-accent) 2.5%,transparent)}.service-map::after{width:9.5rem}.service-map__core{width:5.75rem}.service-map__core span{font-size:.68rem}.service-map li,.service-map li:nth-child(n){width:8rem;min-height:3.75rem;padding:.55rem .65rem;font-size:.66rem}.service-map li span{width:1.6rem;font-size:.58rem}.service-map li:nth-child(1){top:4%;right:0}.service-map li:nth-child(2){right:0;bottom:4%}.service-map li:nth-child(3){bottom:4%;left:0}.service-map li:nth-child(4){top:4%;left:0}}
@media(max-width:767px){.service-map li,.service-map li:nth-child(n){width:6.75rem;min-height:0;gap:.4rem;padding:.75rem;font-size:.62rem}.service-map li:nth-child(1){top:2%;right:0}.service-map li:nth-child(2){right:0;bottom:2%}.service-map li:nth-child(3){bottom:2%;left:0}.service-map li:nth-child(4){top:2%;left:0}}
@media(max-width:767px){.service-map__core{width:6.5rem}.service-map__core span{font-size:.76rem}}
@media(max-width:767px){#capital-section-2 :deep(.section-heading h2),#capital-section-3 :deep(.section-heading h2){font-size:clamp(1.8rem,8vw,2.6rem);white-space:normal}}
@media(max-width:767px){.portfolio-timeline{gap:1rem;margin-top:2.5rem}.portfolio-timeline::before{inset-block:1.75rem;inset-inline-start:1.75rem;inset-inline-end:auto;width:2px;height:auto;background:linear-gradient(transparent,color-mix(in srgb,var(--portfolio-accent) 70%,var(--portfolio-line)) 10%,color-mix(in srgb,var(--portfolio-accent) 70%,var(--portfolio-line)) 90%,transparent)}.portfolio-timeline article,.portfolio-timeline article:nth-child(3n),.portfolio-timeline article:nth-child(n+4),.portfolio-timeline article:last-child{min-height:7rem;flex-direction:row;align-items:center;gap:1rem;padding:1rem;border:1px solid color-mix(in srgb,var(--portfolio-line) 88%,transparent);text-align:start}.portfolio-timeline span{width:3.5rem;flex:none;margin:0;box-shadow:0 0 0 .35rem var(--portfolio-bg)}.portfolio-timeline h3{max-width:none;margin:0;text-align:start}}
@media(max-width:767px){#capital-section-6 :deep(.section-heading h2){white-space:normal}.risk-model-grid{gap:.75rem;margin-top:2.25rem}.risk-model-grid article,.risk-model-grid article:nth-child(3n),.risk-model-grid article:nth-child(n+4),.risk-model-grid article:last-child{min-height:9rem;padding:1.15rem;border:1px solid color-mix(in srgb,var(--portfolio-line) 86%,transparent);border-radius:1rem}.risk-model-grid h3{max-width:none}}
@media(max-width:767px){.interactive-home{padding:.35rem;border-radius:1rem}.interactive-home__stage{border-radius:.7rem}.interactive-home__play{padding:.75rem}.interactive-home__play-icon{width:3.25rem}.interactive-home__duration{inset-inline-end:.65rem;inset-block-end:.65rem}.interactive-home__meta{align-items:flex-start;flex-direction:column;gap:.65rem;padding:.9rem .55rem .55rem}.interactive-home__meta p{font-size:.76rem}}
.decision-list{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:1rem;margin-top:3rem;padding:0;border:0}.decision-list article,.decision-list article:nth-last-child(-n+2){position:relative;min-height:13rem;overflow:hidden;padding:1.25rem;border:1px solid color-mix(in srgb,var(--portfolio-line) 82%,transparent);border-radius:1.25rem;background:linear-gradient(150deg,color-mix(in srgb,var(--portfolio-surface) 84%,transparent),color-mix(in srgb,var(--portfolio-accent) 4%,var(--portfolio-bg)));box-shadow:0 1rem 2.75rem rgb(0 0 0/7%);text-align:start}.decision-list article::before{position:absolute;inset-block-end:-1.2rem;inset-inline-end:.45rem;color:color-mix(in srgb,var(--portfolio-accent) 9%,transparent);content:attr(data-index);font-family:var(--font-display);font-size:5rem;font-weight:950;line-height:1}.decision-list article::after{position:absolute;inset-block-start:0;inset-inline:1.25rem;height:2px;background:linear-gradient(90deg,var(--portfolio-accent),transparent);content:''}.decision-list__head{position:relative;z-index:1;display:flex;align-items:center;gap:.75rem}.decision-list__head span{display:grid;width:2.35rem;aspect-ratio:1;flex:none;place-items:center;border-radius:50%;background:color-mix(in srgb,var(--portfolio-accent) 12%,transparent);color:var(--portfolio-accent);font-size:.68rem;font-weight:850}.decision-list h3{color:var(--portfolio-text);font-size:clamp(.95rem,1vw,1.08rem);font-weight:760;line-height:1.6}.decision-list article>p{position:relative;z-index:1;margin-top:1.4rem;color:var(--portfolio-muted);font-size:.82rem;line-height:1.85}.device-comparison{position:relative;display:grid;grid-template-columns:1.45fr 1fr .72fr;align-items:stretch;gap:1rem;margin-top:3rem;padding:1.1rem;border:1px solid color-mix(in srgb,var(--portfolio-line) 86%,transparent);border-radius:1.6rem;background:linear-gradient(145deg,color-mix(in srgb,var(--portfolio-surface) 72%,transparent),color-mix(in srgb,var(--portfolio-accent) 3%,var(--portfolio-bg)));box-shadow:0 1.5rem 4rem rgb(0 0 0/7%)}.device{position:relative;display:grid;min-height:15rem;grid-template-rows:auto auto 1fr;gap:1rem;overflow:hidden;padding:1.25rem;border:1px solid color-mix(in srgb,var(--portfolio-line) 80%,transparent);border-radius:1.15rem;background:color-mix(in srgb,var(--portfolio-bg) 68%,transparent);color:var(--portfolio-text);text-align:start}.device::after{position:absolute;inset-block-start:0;inset-inline:1.15rem;height:2px;background:linear-gradient(90deg,var(--portfolio-accent),transparent);content:''}.device__viewport{display:grid;width:100%;height:5.75rem;grid-template-columns:1.6fr 1fr;grid-template-rows:.65rem 1fr;gap:.35rem;padding:.55rem;border:1px solid color-mix(in srgb,var(--portfolio-accent) 48%,var(--portfolio-line));border-radius:.6rem;background:color-mix(in srgb,var(--portfolio-accent) 5%,transparent);box-shadow:inset 0 0 0 .22rem color-mix(in srgb,var(--portfolio-bg) 62%,transparent)}.device__viewport i{display:block;border-radius:.2rem;background:color-mix(in srgb,var(--portfolio-muted) 22%,transparent)}.device__viewport i:first-child{grid-column:1/-1;background:color-mix(in srgb,var(--portfolio-accent) 42%,transparent)}.device--tablet .device__viewport{width:72%;grid-template-columns:1fr}.device--tablet .device__viewport i:first-child{grid-column:auto}.device--phone .device__viewport{width:42%;grid-template-columns:1fr;grid-template-rows:.55rem 1fr .55rem}.device--phone .device__viewport i:first-child{grid-column:auto}.device__meta{display:flex;align-items:baseline;justify-content:space-between;gap:.75rem}.device__meta strong{font-size:1rem;font-weight:820}.device__meta span{color:var(--portfolio-accent);font-size:.72rem;font-weight:750;direction:rtl}.device__behavior{display:grid;align-content:end;gap:.25rem;padding-top:.85rem;border-top:1px solid color-mix(in srgb,var(--portfolio-line) 72%,transparent)}.device__behavior b{color:var(--portfolio-text);font-size:.9rem;font-weight:760}.device__behavior small{color:var(--portfolio-muted);font-size:.72rem;line-height:1.65}.device--desktop,.device--tablet,.device--phone{min-height:15rem}#capital-section-10>.case-lead{width:min(100%,72ch);max-width:none;text-wrap:balance}
@media(max-width:1023px){.decision-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:767px){.decision-list{grid-template-columns:1fr;gap:.75rem}.decision-list article,.decision-list article:nth-last-child(-n+2){min-height:10rem;border:1px solid color-mix(in srgb,var(--portfolio-line) 82%,transparent)}.decision-list article>p{display:block}.device-comparison{grid-template-columns:1fr}.device,.device--desktop,.device--tablet,.device--phone{min-height:8.5rem}}
@media(min-width:768px){.portfolio-timeline article+article{border:0}.portfolio-timeline article::after{z-index:2;top:3.2rem;left:50%;width:2px;height:1.65rem;background:linear-gradient(var(--portfolio-accent),color-mix(in srgb,var(--portfolio-accent) 20%,transparent));box-shadow:0 0 .65rem color-mix(in srgb,var(--portfolio-accent) 34%,transparent);opacity:1;transform:translateX(-50%)}.portfolio-timeline article:first-child::after{display:block;content:''}.portfolio-timeline span,.portfolio-timeline h3{position:relative;z-index:3}.portfolio-timeline h3{background:color-mix(in srgb,var(--portfolio-bg) 88%,transparent)}#capital-section-9 :deep(.section-heading h2){width:100%;max-width:none;font-size:clamp(1.9rem,2.2vw,2.6rem);white-space:nowrap}}
@media(min-width:768px){#capital-section-11 :deep(.section-heading h2){width:100%;max-width:none;font-size:clamp(1.85rem,2.15vw,2.55rem);white-space:nowrap}}
.type-specimen{display:flex;flex-direction:column;gap:1rem}.type-specimen__visual{overflow:hidden;border-radius:.7rem;background:#fff;box-shadow:0 1.2rem 3rem rgb(0 0 0/14%)}.type-specimen__visual img{display:block;width:100%;height:auto;aspect-ratio:41/24;object-fit:cover}.type-specimen figcaption{display:grid;width:100%;max-width:none;grid-template-columns:auto minmax(0,1fr);align-items:start;gap:1rem;color:var(--portfolio-text)}.type-specimen figcaption>span{color:var(--portfolio-accent);font-size:.78rem;font-weight:800}.type-specimen figcaption div{display:grid;gap:.25rem}.type-specimen figcaption strong{font-size:1.05rem;font-weight:750;direction:ltr;text-align:start}.type-specimen figcaption p{width:100%;max-width:none;color:var(--portfolio-muted);font-size:.84rem;line-height:1.65}
.palette-specimen{display:flex;flex-direction:column}.palette-specimen>header{align-items:center;padding-bottom:1rem;border-bottom:1px solid color-mix(in srgb,var(--portfolio-line) 76%,transparent)}.palette-specimen>header strong{color:var(--portfolio-text);font-size:1.05rem;font-weight:780}.palette-specimen ul{grid-template-columns:repeat(2,minmax(0,1fr));gap:.85rem;margin-top:1.25rem}.palette-specimen li{display:grid;overflow:hidden;padding:.55rem;border:1px solid color-mix(in srgb,var(--portfolio-line) 78%,transparent);border-radius:1rem;background:linear-gradient(145deg,color-mix(in srgb,var(--portfolio-bg) 88%,transparent),color-mix(in srgb,var(--portfolio-surface) 72%,transparent));box-shadow:0 .8rem 2rem rgb(0 0 0/6%)}.palette-specimen li>i{display:block;min-height:6.75rem;border:1px solid rgb(255 255 255/9%);border-radius:.7rem;background:var(--system-color);box-shadow:inset 0 0 0 1px rgb(0 0 0/8%)}.palette-specimen li>div{display:grid;grid-template-columns:minmax(0,1fr) auto;gap:.2rem .65rem;padding:.85rem .35rem .35rem}.palette-specimen li strong{color:var(--portfolio-text);font-size:.86rem;font-weight:780}.palette-specimen li small{grid-column:1;color:var(--portfolio-muted);font-size:.68rem;line-height:1.55}.palette-specimen code{grid-column:2;grid-row:1/span 2;align-self:center;padding:.35rem .45rem;border:1px solid color-mix(in srgb,var(--portfolio-line) 72%,transparent);border-radius:.45rem;background:color-mix(in srgb,var(--portfolio-surface) 62%,transparent);color:var(--portfolio-muted);font-size:.65rem;direction:ltr}
.device__behavior{align-content:center;justify-items:center;text-align:center}.device__behavior b{font-size:clamp(1rem,1.1vw,1.18rem)}.device__behavior small{font-size:clamp(.82rem,.9vw,.94rem);line-height:1.7}
.retrospective-section{position:relative;isolation:isolate;max-width:76rem;overflow:hidden;padding:clamp(2.5rem,5vw,5rem);border:1px solid color-mix(in srgb,var(--portfolio-accent) 38%,var(--portfolio-line));border-radius:2rem;background:radial-gradient(circle at 12% 18%,color-mix(in srgb,var(--portfolio-accent) 14%,transparent),transparent 30%),linear-gradient(145deg,color-mix(in srgb,var(--portfolio-surface) 92%,transparent),color-mix(in srgb,var(--portfolio-bg) 94%,transparent));box-shadow:0 2rem 6rem rgb(0 0 0/10%)}.retrospective-section::after{position:absolute;z-index:-1;inset-block-end:-3.25rem;inset-inline-end:1.5rem;color:color-mix(in srgb,var(--portfolio-accent) 7%,transparent);content:'14';font-family:var(--font-display);font-size:clamp(9rem,18vw,16rem);font-weight:950;line-height:1;pointer-events:none}.retrospective-section :deep(.section-heading){position:relative;z-index:1}.retrospective-panel{position:relative;z-index:1;display:grid;grid-template-columns:1.05fr .95fr;gap:1rem;margin-top:2.5rem}.retrospective-panel article{display:grid;min-height:12rem;align-content:space-between;gap:2rem;padding:1.5rem;border:1px solid color-mix(in srgb,var(--portfolio-line) 78%,transparent);border-radius:1.25rem;background:color-mix(in srgb,var(--portfolio-bg) 68%,transparent);backdrop-filter:blur(12px);text-align:start}.retrospective-panel article:first-child{border-color:color-mix(in srgb,var(--portfolio-accent) 36%,var(--portfolio-line));background:linear-gradient(145deg,color-mix(in srgb,var(--portfolio-accent) 9%,var(--portfolio-bg)),color-mix(in srgb,var(--portfolio-bg) 74%,transparent))}.retrospective-panel span{display:flex;align-items:center;gap:.65rem;color:var(--portfolio-accent);font-size:.78rem;font-weight:850}.retrospective-panel span::before{width:.55rem;aspect-ratio:1;border-radius:50%;background:currentColor;box-shadow:0 0 0 .35rem color-mix(in srgb,var(--portfolio-accent) 10%,transparent);content:''}.retrospective-panel p{color:var(--portfolio-text);font-size:clamp(.95rem,1.05vw,1.08rem);font-weight:620;line-height:1.9}
.improvement-section{max-width:76rem}.improvement-list{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:1rem;margin-top:3rem}.improvement-list li{position:relative;display:flex;min-height:13rem;overflow:hidden;align-items:flex-end;padding:1.5rem;border:1px solid color-mix(in srgb,var(--portfolio-line) 82%,transparent);border-radius:1.25rem;background:linear-gradient(150deg,color-mix(in srgb,var(--portfolio-surface) 86%,transparent),color-mix(in srgb,var(--portfolio-accent) 3.5%,var(--portfolio-bg)));box-shadow:0 1rem 3rem rgb(0 0 0/7%);text-align:start;transition:border-color var(--motion-control),transform var(--motion-control)}.improvement-list li::before{position:absolute;inset-block-start:.75rem;inset-inline-end:1rem;color:color-mix(in srgb,var(--portfolio-accent) 12%,transparent);content:attr(data-index);font-family:var(--font-display);font-size:4.5rem;font-weight:950;line-height:1}.improvement-list li::after{position:absolute;inset-block-start:0;inset-inline:1.25rem;height:2px;background:linear-gradient(90deg,var(--portfolio-accent),transparent);content:''}.improvement-list li:hover{border-color:color-mix(in srgb,var(--portfolio-accent) 46%,var(--portfolio-line));transform:translateY(-4px)}.improvement-list p{position:relative;z-index:1;color:var(--portfolio-text);font-size:clamp(.9rem,1vw,1.02rem);font-weight:620;line-height:1.85}
.retrospective-section::after{content:none}.system-intro{width:min(100%,76ch);max-width:none;text-wrap:balance}.learning-list{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:1rem;margin-top:3rem}.learning-list li{position:relative;display:grid;min-height:12rem;grid-column:span 2;align-content:end;overflow:hidden;padding:1.5rem;border:1px solid color-mix(in srgb,var(--portfolio-line) 82%,transparent);border-radius:1.25rem;background:linear-gradient(150deg,color-mix(in srgb,var(--portfolio-surface) 88%,transparent),color-mix(in srgb,var(--portfolio-accent) 4%,var(--portfolio-bg)));box-shadow:0 1rem 3rem rgb(0 0 0/7%);text-align:start;transition:border-color var(--motion-control),transform var(--motion-control)}.learning-list li:nth-child(n+4){grid-column:span 3}.learning-list li::before{position:absolute;inset-block-start:1.1rem;inset-inline-start:1.25rem;color:var(--portfolio-accent);content:attr(data-index);font-family:var(--font-display);font-size:.75rem;font-weight:850}.learning-list li::after{position:absolute;inset-block-start:1.5rem;inset-inline-start:3.4rem;width:2.5rem;height:1px;background:linear-gradient(90deg,var(--portfolio-accent),transparent);content:''}.learning-list li:hover{border-color:color-mix(in srgb,var(--portfolio-accent) 48%,var(--portfolio-line));transform:translateY(-4px)}.learning-list p{position:relative;z-index:1;color:var(--portfolio-text);font-size:clamp(.95rem,1.05vw,1.08rem);font-weight:650;line-height:1.9}
@media(min-width:768px){#capital-section-11 :deep(.section-heading h2){width:100%;max-width:none;font-size:clamp(1.85rem,2.15vw,2.55rem);white-space:nowrap}}
@media(max-width:1023px){.retrospective-panel,.improvement-list{grid-template-columns:repeat(2,minmax(0,1fr))}}
@media(max-width:1023px){.learning-list li,.learning-list li:nth-child(n+4){grid-column:span 3}}
@media(max-width:767px){.retrospective-section{margin-inline:0;padding:1.4rem;border-radius:1.25rem}.retrospective-panel,.improvement-list{grid-template-columns:1fr}.retrospective-panel article{min-height:10rem}.improvement-list li{min-height:10rem}.learning-list{grid-template-columns:1fr}.learning-list li,.learning-list li:nth-child(n+4){min-height:10rem;grid-column:auto}.device__behavior b{font-size:1rem}.device__behavior small{font-size:.82rem}.type-specimen figcaption{grid-template-columns:1fr;gap:.55rem}}
@media(max-width:767px){
  .capital-case :deep(.case-hero){padding-top:5rem;padding-bottom:1.5rem}
  .capital-case :deep(.case-hero__copy){align-items:center;text-align:center}
  .capital-case :deep(.case-hero__title){width:100%;max-width:none;margin-inline:auto;font-size:clamp(1.55rem,7.2vw,1.8rem);line-height:1.35;text-align:center;text-wrap:balance}
  .capital-case :deep(.case-hero__summary){width:100%;max-width:none;margin:.65rem auto 0;font-size:.78rem;line-height:1.7;text-align:center;text-wrap:balance}
  .capital-case :deep(.case-hero__meta>div),.capital-case :deep(.case-hero__meta>div+div),.capital-case :deep(.case-hero__meta>div:nth-child(3)),.capital-case :deep(.case-hero__meta>div:nth-child(n+3)){min-height:4.8rem;align-items:center;padding:.72rem .6rem;text-align:center}
  .capital-case :deep(.case-hero__meta dt){font-size:.74rem}
  .capital-case :deep(.case-hero__meta dd){font-size:.8rem;line-height:1.55;text-align:center}
  .hero-poster{display:none}
  #capital-section-5>.case-lead{margin-top:1rem;font-size:.95rem;line-height:1.8}
  .portfolio-timeline{display:grid;gap:.55rem;margin-top:1.5rem;padding:0;overflow:visible;border:0;border-radius:0;background:transparent;box-shadow:none}
  .portfolio-timeline::before{inset-block:1.3rem;inset-inline-start:1.92rem;width:1px;background:linear-gradient(transparent,color-mix(in srgb,var(--portfolio-accent) 64%,var(--portfolio-line)) 12%,color-mix(in srgb,var(--portfolio-accent) 64%,var(--portfolio-line)) 88%,transparent)}
  .portfolio-timeline article,.portfolio-timeline article:nth-child(3n),.portfolio-timeline article:nth-child(n+4),.portfolio-timeline article:last-child{display:grid;min-height:0;grid-template-columns:2.35rem minmax(0,1fr);align-items:center;gap:.75rem;padding:.7rem .75rem;border:0;border-radius:1rem;background:color-mix(in srgb,var(--portfolio-surface) 82%,transparent);box-shadow:0 .7rem 1.8rem rgb(0 0 0/8%);text-align:start}
  .portfolio-timeline article+article{border:0}
  .portfolio-timeline article::after{display:none}
  .portfolio-timeline span{width:2.35rem;margin:0;border:0;box-shadow:0 0 0 .28rem var(--portfolio-bg),0 .4rem 1.2rem color-mix(in srgb,var(--portfolio-accent) 22%,transparent);font-size:.62rem}
  .portfolio-timeline h3{display:block;min-height:0;margin:0;padding:0;border:0;border-radius:0;background:transparent;font-size:.82rem;text-align:start}
  #capital-section-7 :deep(.section-heading h2){font-size:clamp(1.75rem,8vw,2.2rem);line-height:1.3}
  .flow-tabs{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:.4rem;margin-top:1.35rem;padding:0;overflow:visible;border:0;border-radius:0;background:transparent}
  .flow-tabs button{min-width:0;min-height:3rem;justify-content:flex-start;padding:.65rem .75rem;border-radius:.8rem;background:color-mix(in srgb,var(--portfolio-surface) 82%,transparent);font-size:.74rem;line-height:1.45;white-space:normal}
  .flow-tabs button.is-active{background:var(--portfolio-accent);box-shadow:0 .6rem 1.5rem color-mix(in srgb,var(--portfolio-accent) 18%,transparent)}
  .selected-flow-label{display:flex;align-items:center;justify-content:space-between;gap:.75rem;margin-top:1rem;padding:.65rem .75rem;border-radius:.8rem;background:color-mix(in srgb,var(--portfolio-accent) 9%,var(--portfolio-surface));text-align:start}
  .selected-flow-label span{color:var(--portfolio-muted);font-size:.64rem;font-weight:650}
  .selected-flow-label strong{color:var(--portfolio-accent);font-size:.72rem;font-weight:850}
  .selected-flow{position:relative;display:grid;gap:.3rem;margin-top:.4rem;padding:0;overflow:visible;border-radius:0;background:transparent;box-shadow:none}
  .selected-flow::before{position:absolute;inset-block:.9rem;inset-inline-start:1.42rem;width:1px;background:linear-gradient(transparent,color-mix(in srgb,var(--portfolio-accent) 48%,transparent) 12%,color-mix(in srgb,var(--portfolio-accent) 48%,transparent) 88%,transparent);content:''}
  .selected-flow>span{position:relative;display:grid;min-width:0;min-height:2.6rem;grid-template-columns:1.45rem minmax(0,1fr);align-items:center;justify-content:stretch;gap:.55rem;padding:.48rem .65rem;border-radius:.7rem;background:color-mix(in srgb,var(--portfolio-surface) 68%,transparent);font-size:.7rem;line-height:1.35;text-align:start}
  .selected-flow i{z-index:1;display:grid;width:1.45rem;aspect-ratio:1;place-items:center;border-radius:50%;background:color-mix(in srgb,var(--portfolio-accent) 16%,var(--portfolio-bg));color:var(--portfolio-accent);font-size:.54rem}
  .selected-flow>span:last-child{background:color-mix(in srgb,var(--portfolio-accent) 10%,var(--portfolio-surface));color:var(--portfolio-text);font-weight:750}
  .wireframe-grid{display:flex;gap:.65rem;margin-top:1.35rem;overflow-x:auto;padding:0 0 .7rem;scrollbar-width:none;scroll-snap-type:x mandatory}
  .wireframe-grid::-webkit-scrollbar{display:none}
  .wireframe-card{min-width:min(78vw,17rem);padding:.55rem;border:0;border-radius:1rem;background:color-mix(in srgb,var(--portfolio-surface) 82%,transparent);box-shadow:0 .8rem 2rem rgb(0 0 0/8%);scroll-snap-align:start}
  .wireframe-page{min-height:10.5rem;padding:.7rem}
  .wireframe-block{min-height:2rem;margin-top:.4rem;padding:.45rem}
  .wireframe-block[data-priority=lead]{min-height:3rem}
  .wireframe-block[data-priority=action]{min-height:1.8rem}
  .wireframe-card figcaption{padding:.65rem .2rem .1rem;font-size:.78rem}
  .wireframe-card figcaption>span{width:1.6rem;height:1.6rem;border:0;background:color-mix(in srgb,var(--portfolio-accent) 10%,transparent);font-size:.58rem}
  #capital-section-11,#capital-section-12,#capital-section-13,#capital-section-15{margin-top:5rem}
  #capital-section-11>.case-lead{margin-top:.9rem;font-size:.9rem;line-height:1.75}
  .system-showcase{display:flex;gap:.65rem;margin-top:1.35rem;overflow-x:auto;padding:0 0 .65rem;scrollbar-width:none;scroll-snap-type:x mandatory}
  .system-showcase::-webkit-scrollbar{display:none}
  .system-showcase>:is(article,figure){width:min(84vw,19rem);min-width:min(84vw,19rem);max-width:min(84vw,19rem);flex:0 0 min(84vw,19rem);padding:.65rem;overflow:hidden;border-radius:1rem;box-shadow:0 .8rem 2rem rgb(0 0 0/8%);scroll-snap-align:start}
  .type-specimen__visual,.type-specimen figcaption,.palette-specimen ul{width:100%;min-width:0}
  .type-specimen__visual img{aspect-ratio:16/9;object-fit:cover}
  .type-specimen figcaption{gap:.4rem;padding:.65rem .25rem .2rem}
  .type-specimen figcaption p{font-size:.72rem;line-height:1.55}
  .palette-specimen>header{padding-bottom:.6rem}
  .palette-specimen ul{gap:.35rem;margin-top:.65rem}
  .palette-specimen li{padding:.35rem;border:0;border-radius:.75rem}
  .palette-specimen li>i{min-height:3.6rem;border:0}
  .palette-specimen li>div{padding:.5rem .2rem .15rem}
  .palette-specimen code{display:none}
  .review-grid{display:flex;gap:.65rem;margin-top:1.35rem;overflow-x:auto;padding:0 0 .65rem;scrollbar-width:none;scroll-snap-type:x mandatory}
  .review-grid::-webkit-scrollbar{display:none}
  .review-grid article{min-width:min(84vw,19rem);flex:none;padding:1rem;border:0;border-radius:1rem;box-shadow:0 .8rem 2rem rgb(0 0 0/8%);scroll-snap-align:start}
  .review-grid h3{font-size:1.05rem}
  .review-grid ul{margin-top:.7rem}
  .review-grid li{padding:.55rem 0;font-size:.78rem;line-height:1.55}
  .retrospective-section{margin-inline:0;padding:0;border:0;border-radius:0;background:transparent;box-shadow:none}
  .retrospective-panel{grid-template-columns:1fr;gap:.55rem;margin-top:1.25rem}
  .retrospective-panel article,.retrospective-panel article:first-child{min-height:0;align-content:start;gap:.75rem;padding:1rem 1.05rem;border:0;border-radius:1rem;background:color-mix(in srgb,var(--portfolio-surface) 76%,transparent);box-shadow:0 .75rem 1.8rem rgb(0 0 0/7%)}
  .retrospective-panel span{font-size:.72rem}
  .retrospective-panel p{font-size:.82rem;line-height:1.75}
  .outcome-section{margin-inline:0;padding:1rem 0 0;border:0;border-radius:0;background:transparent;box-shadow:none}
  .outcome-section>.outcome-metrics{max-width:31ch;margin:1rem auto 0;font-size:1.05rem;line-height:1.7}
  .outcome-section>.case-copy{max-width:34ch;margin-top:.75rem;font-size:.82rem;line-height:1.75}
  #capital-section-2,#capital-section-6,#capital-section-8,#capital-section-10,#capital-section-14,#capital-section-16{margin-top:5rem}
  #capital-section-2>.case-lead,#capital-section-10>.case-lead{margin-top:.85rem;font-size:.9rem;line-height:1.7}
  #capital-section-2>.matrix-list,#capital-section-6>.matrix-list{grid-template-columns:repeat(2,minmax(0,1fr));gap:.35rem;margin-top:1rem;border:0}
  #capital-section-2>.matrix-list li,#capital-section-6>.matrix-list li{min-height:2.75rem;padding:.55rem .45rem;border:0!important;border-radius:.7rem;background:color-mix(in srgb,var(--portfolio-surface) 72%,transparent);font-size:.72rem;line-height:1.45}
  #capital-section-6>.case-copy{margin-top:.75rem;font-size:.84rem;line-height:1.7}
  .risk-group-label{justify-content:flex-start;margin:1rem 0 .55rem;font-size:.7rem;text-align:start}
  .risk-group-label::before{display:none}
  .risk-group-label::after{width:2.5rem;background:linear-gradient(90deg,currentColor,transparent)}
  .risk-group-label--evidence{margin-top:1.1rem}
  .risk-model-grid{display:grid;grid-template-columns:1fr;gap:.35rem;margin-top:0}
  .risk-model-grid article,.risk-model-grid article:nth-child(3n),.risk-model-grid article:nth-child(n+4),.risk-model-grid article:last-child{display:grid;min-height:3.35rem;grid-template-columns:2rem minmax(0,1fr);align-items:center;gap:.7rem;padding:.6rem .7rem;border:0;border-radius:.85rem;background:color-mix(in srgb,var(--portfolio-surface) 76%,transparent);box-shadow:0 .45rem 1.2rem rgb(0 0 0/6%);text-align:start}
  .risk-model-grid article::before{position:static;display:grid;width:2rem;aspect-ratio:1;place-items:center;border-radius:50%;background:color-mix(in srgb,var(--portfolio-accent) 14%,transparent);color:var(--portfolio-accent);font-size:.6rem}
  .risk-model-grid article::after{inset-block-start:auto;inset-block-end:-.35rem;inset-inline-start:1.68rem;width:1px;height:.35rem;background:color-mix(in srgb,var(--portfolio-accent) 42%,transparent)}
  .risk-model-grid article:last-child::after{display:none}
  .risk-model-grid h3{margin:0;font-size:.84rem;white-space:normal}
  #capital-section-6>.risk-evidence-list{grid-template-columns:1fr;gap:.3rem;margin-top:0}
  #capital-section-6>.risk-evidence-list li{position:relative;min-height:2.6rem;justify-content:flex-start;padding:.5rem .7rem .5rem 2.25rem;text-align:start}
  [dir=rtl] #capital-section-6>.risk-evidence-list li{padding:.5rem 2.25rem .5rem .7rem}
  #capital-section-6>.risk-evidence-list li::before{position:absolute;inset-inline-start:.72rem;display:grid;width:1.15rem;aspect-ratio:1;place-items:center;border-radius:50%;background:color-mix(in srgb,var(--portfolio-accent) 13%,transparent);color:var(--portfolio-accent);content:'✓';font-size:.58rem;font-weight:900}
  .decision-list,.improvement-list,.learning-list{display:flex;gap:.6rem;margin-top:1.25rem;overflow-x:auto;padding:0 0 .65rem;border:0;scrollbar-width:none;scroll-snap-type:x mandatory}
  .decision-list::-webkit-scrollbar,.improvement-list::-webkit-scrollbar,.learning-list::-webkit-scrollbar{display:none}
  .decision-list article,.decision-list article:nth-last-child(-n+2),.improvement-list li,.learning-list li,.learning-list li:nth-child(n+4){min-width:min(78vw,17.5rem);min-height:8rem;flex:0 0 min(78vw,17.5rem);align-content:end;padding:1rem;border:0;border-radius:1rem;box-shadow:0 .7rem 1.8rem rgb(0 0 0/8%);scroll-snap-align:start}
  .decision-list article>p{margin-top:.65rem;font-size:.76rem;line-height:1.6}
  .decision-list h3{font-size:.9rem}
  .improvement-list p,.learning-list p{font-size:.82rem;line-height:1.65}
  #capital-section-9 :deep(.section-heading h2){width:100%;max-width:none;font-size:clamp(1.4rem,6.3vw,1.6rem);white-space:nowrap}
  .device-comparison{display:grid;grid-template-columns:1fr;gap:.5rem;margin-top:1.1rem;padding:0;overflow:visible;border:0;border-radius:0;background:transparent;box-shadow:none}
  .device,.device--desktop,.device--tablet,.device--phone{display:grid;width:100%;min-width:0;min-height:0;grid-template-columns:5.25rem minmax(0,1fr);grid-template-rows:auto auto;align-items:center;gap:.35rem .75rem;padding:.72rem;border:0;border-radius:.9rem;background:color-mix(in srgb,var(--portfolio-surface) 72%,transparent);box-shadow:0 .55rem 1.4rem rgb(0 0 0/7%);text-align:start}
  .device__viewport,.device--tablet .device__viewport,.device--phone .device__viewport{width:100%;height:4.2rem;grid-row:1/3}
  .device__meta{grid-column:2;justify-content:flex-start;gap:.5rem}
  .device__behavior{grid-column:2;align-content:start;justify-items:start;padding-top:.4rem;text-align:start}
  .device__behavior b{font-size:.88rem}
  .device__behavior small{font-size:.68rem;line-height:1.5}
  .outcome-section{position:relative;overflow:hidden;padding:1.4rem 1.15rem 1.5rem;border:0;border-radius:1.25rem;background:radial-gradient(circle at 0 0,color-mix(in srgb,var(--portfolio-accent) 17%,transparent),transparent 42%),color-mix(in srgb,var(--portfolio-surface) 78%,transparent);box-shadow:0 1rem 2.75rem rgb(0 0 0/10%);text-align:start}
  .outcome-section :deep(.section-heading){align-items:flex-start;text-align:start}
  .outcome-section :deep(.section-heading__kicker){justify-content:flex-start}
  .outcome-section :deep(.section-heading__kicker::before){display:none}
  .outcome-section :deep(.section-heading h2){margin-inline:0;font-size:1.75rem;text-align:start}
  .outcome-section>.outcome-metrics,.outcome-section>.case-copy{max-width:none;margin-inline:0;text-align:start}
}
@media(prefers-reduced-motion:reduce){.reveal-section{animation:none!important;transform:none!important}.case-outline a{transition:none}}
.comparison-image{overflow:hidden;width:100%;aspect-ratio:16/9;border:1px solid color-mix(in srgb,var(--portfolio-line) 82%,transparent);border-radius:.75rem;background:var(--portfolio-surface);box-shadow:0 .75rem 2rem rgb(0 0 0/12%)}
.comparison-image img{display:block;width:100%;height:100%;object-fit:cover;object-position:top center}
</style>
