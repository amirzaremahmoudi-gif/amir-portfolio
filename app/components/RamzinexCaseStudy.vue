<script setup lang="ts">
import { ramzinexCaseStudy } from '~/data/ramzinexCaseStudy'

const { locale } = useI18n()
const copy = computed(() => ramzinexCaseStudy[locale.value === 'fa' ? 'fa' : 'en'])
const activeChapter = ref(0)
const activeSection = ref(1)
const needIcons = ['lucide:user', 'lucide:chart-line', 'lucide:newspaper']
const tensionIcons = ['lucide:layers', 'lucide:mouse-pointer-click', 'lucide:blocks']
const flowIcons = ['lucide:search', 'lucide:gauge', 'lucide:circle-check', 'lucide:route']
const outlineList = useTemplateRef<HTMLOListElement>('outlineList')
const dialog = ref<HTMLDialogElement | null>(null)
const expandedMedia = ref<{ src: string, alt: string, format: 'desktop' | 'mobile' } | null>(null)
let sectionObserver: IntersectionObserver | undefined

function openMedia(src: string, alt: string, format: 'desktop' | 'mobile' = 'desktop') {
  expandedMedia.value = { src, alt, format }
  dialog.value?.showModal()
}

function closeMedia() {
  dialog.value?.close()
}

onMounted(() => {
  sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
    const id = visible[0]?.target.id.match(/ramzinex-section-(\d+)/)?.[1]
    if (id) activeSection.value = Number(id)
  }, { rootMargin: '-18% 0px -68% 0px' })

  document.querySelectorAll<HTMLElement>('.ramzinex-case .case-section[id]')
    .forEach(section => sectionObserver?.observe(section))
})

watch(activeSection, async (section) => {
  await nextTick()
  outlineList.value
    ?.querySelector<HTMLElement>(`[data-section="${section}"]`)
    ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
})

onBeforeUnmount(() => sectionObserver?.disconnect())
</script>

<template>
  <article class="ramzinex-case">
    <CaseStudyHero
      :title="copy.hero.title"
      :summary="copy.hero.summary"
      :meta="copy.meta"
      :media="{
        src: copy.hero.cover,
        alt: copy.hero.coverAlt,
        width: 1536,
        height: 1024
      }"
    />

    <div class="portfolio-container">
      <figure class="ramzinex-hero-poster">
        <img
          :src="copy.hero.cover"
          :alt="copy.hero.coverAlt"
          width="1536"
          height="1024"
          fetchpriority="high"
        >
      </figure>
    </div>

    <div class="portfolio-container case-shell py-[var(--portfolio-section)]">
      <aside class="case-outline">
        <p class="eyebrow">
          {{ copy.labels.select }}
        </p>
        <ol ref="outlineList">
          <li
            v-for="(item, index) in copy.outline"
            :key="item"
          >
            <a
              :href="`#ramzinex-section-${index + 1}`"
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
          id="ramzinex-section-1"
          class="case-section ramzinex-section ramzinex-overview reveal-section"
        >
          <div class="ramzinex-overview__inner">
            <div class="ramzinex-heading ramzinex-heading--split ramzinex-overview__heading">
              <div>
                <p>{{ copy.overview.kicker }}</p>
                <h2>{{ copy.overview.title }}</h2>
                <div class="ramzinex-heading__line" />
              </div>
              <p class="ramzinex-lead">
                {{ copy.overview.lead }}
              </p>
            </div>
            <div class="ramzinex-scope-grid">
              <article
                v-for="scope in copy.overview.scopes"
                :key="scope[0]"
              >
                <span>{{ scope[0] }}</span>
                <h3>{{ scope[1] }}</h3>
                <p>{{ scope[2] }}</p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="ramzinex-section-2"
          class="case-section ramzinex-section ramzinex-section--dark reveal-section"
        >
          <div class="portfolio-container ramzinex-logic">
            <div class="ramzinex-heading">
              <p>{{ copy.logic.kicker }}</p>
              <h2>{{ copy.logic.title }}</h2>
              <div class="ramzinex-heading__line" />
              <p class="ramzinex-lead">
                {{ copy.logic.lead }}
              </p>
            </div>
            <div class="ramzinex-ux-model">
              <div class="ramzinex-ux-model__group">
                <p class="ramzinex-ux-model__label">
                  {{ locale === 'fa' ? 'نیازهای کلیدی' : 'Core user needs' }}
                </p>
                <article
                  v-for="(need, index) in copy.logic.needs"
                  :key="need[0]"
                >
                  <Icon
                    :name="needIcons[index]!"
                    class="ramzinex-ux-model__icon"
                  />
                  <div>
                    <h3>{{ need[0] }}</h3>
                    <p>{{ need[1] }}</p>
                  </div>
                </article>
              </div>
              <div class="ramzinex-ux-model__group">
                <p class="ramzinex-ux-model__label">
                  {{ locale === 'fa' ? 'تنش‌های طراحی' : 'Design tensions' }}
                </p>
                <article
                  v-for="(tension, index) in copy.logic.tensions"
                  :key="tension[0]"
                >
                  <Icon
                    :name="tensionIcons[index]!"
                    class="ramzinex-ux-model__icon"
                  />
                  <div>
                    <h3>{{ tension[0] }}</h3>
                    <p>{{ tension[1] }}</p>
                  </div>
                </article>
              </div>
            </div>
            <ol class="ramzinex-logic__flow">
              <li
                v-for="(step, index) in copy.logic.steps"
                :key="step[0]"
              >
                <Icon
                  :name="flowIcons[index]!"
                  class="ramzinex-logic__icon"
                />
                <span class="ramzinex-logic__number">{{ String(index + 1).padStart(2, '0') }}</span>
                <strong>{{ step[0] }}</strong>
                <p>{{ step[1] }}</p>
              </li>
            </ol>
          </div>
        </section>

        <section
          id="ramzinex-section-3"
          class="case-section case-section--wide ramzinex-section ramzinex-evidence reveal-section"
        >
          <div class="ramzinex-heading ramzinex-heading--split">
            <div>
              <p>{{ copy.labels.evidence }}</p>
              <h2>{{ copy.chapters[activeChapter]!.title }}</h2>
            </div>
            <p class="ramzinex-lead">
              {{ copy.chapters[activeChapter]!.summary }}
            </p>
          </div>

          <div
            class="ramzinex-tabs"
            role="tablist"
            :aria-label="copy.labels.select"
          >
            <button
              v-for="(chapter, index) in copy.chapters"
              :key="chapter.id"
              type="button"
              role="tab"
              :aria-selected="activeChapter === index"
              :class="{ 'is-active': activeChapter === index }"
              @click="activeChapter = index"
            >
              <span>{{ String(index + 1).padStart(2, '0') }}</span>{{ chapter.label }}
            </button>
          </div>

          <div
            :key="copy.chapters[activeChapter]!.id"
            class="ramzinex-device-stage"
          >
            <button
              type="button"
              class="ramzinex-shot ramzinex-shot--desktop"
              :aria-label="copy.labels.open"
              @click="openMedia(copy.chapters[activeChapter]!.desktop, copy.chapters[activeChapter]!.desktopAlt)"
            >
              <span class="ramzinex-shot__bar"><b>{{ copy.labels.desktop }}</b><i>1920</i></span>
              <img
                :src="copy.chapters[activeChapter]!.desktop"
                :alt="copy.chapters[activeChapter]!.desktopAlt"
                width="1920"
                height="5200"
                loading="lazy"
              >
              <span class="ramzinex-shot__fade">{{ copy.labels.open }} ↗</span>
            </button>
            <button
              type="button"
              class="ramzinex-shot ramzinex-shot--mobile"
              :aria-label="copy.labels.open"
              @click="openMedia(copy.chapters[activeChapter]!.mobile, copy.chapters[activeChapter]!.mobileAlt, 'mobile')"
            >
              <span class="ramzinex-shot__bar"><b>{{ copy.labels.mobile }}</b><i>440</i></span>
              <img
                :src="copy.chapters[activeChapter]!.mobile"
                :alt="copy.chapters[activeChapter]!.mobileAlt"
                width="440"
                height="5200"
                loading="lazy"
              >
              <span class="ramzinex-shot__fade">{{ copy.labels.open }} ↗</span>
            </button>
          </div>
        </section>

        <section
          id="ramzinex-section-4"
          class="case-section case-section--wide ramzinex-section ramzinex-content-section reveal-section"
        >
          <div class="portfolio-container">
            <div class="ramzinex-heading ramzinex-heading--split">
              <div>
                <p>{{ copy.contentSystem.kicker }}</p>
                <h2>{{ copy.contentSystem.title }}</h2>
              </div>
              <p class="ramzinex-lead">
                {{ copy.contentSystem.lead }}
              </p>
            </div>

            <div class="ramzinex-content-cards">
              <article
                v-for="(card, index) in copy.contentSystem.cards"
                :key="card[0]"
              >
                <span>{{ String(index + 1).padStart(2, '0') }}</span>
                <h3>{{ card[0] }}</h3>
                <p>{{ card[1] }}</p>
              </article>
            </div>

            <p class="ramzinex-gallery-label">
              {{ copy.labels.extraScreens }}
            </p>
            <div class="ramzinex-gallery">
              <button
                type="button"
                @click="openMedia('/images/case-studies/ramzinex/desktop-blog-category.png', locale === 'fa' ? 'صفحه دسته‌بندی مجله رمزینکس در دسکتاپ' : 'Ramzinex Magazine category page on desktop')"
              >
                <img
                  src="/images/case-studies/ramzinex/desktop-blog-category.png"
                  :alt="locale === 'fa' ? 'صفحه دسته‌بندی مجله رمزینکس در دسکتاپ' : 'Ramzinex Magazine category page on desktop'"
                  width="1920"
                  height="2263"
                  loading="lazy"
                >
                <span class="ramzinex-gallery__action">{{ copy.labels.open }} ↗</span>
              </button>
              <button
                type="button"
                @click="openMedia('/images/case-studies/ramzinex/desktop-article.png', locale === 'fa' ? 'صفحه جزئیات مقاله رمزینکس در دسکتاپ' : 'Ramzinex article detail page on desktop')"
              >
                <img
                  src="/images/case-studies/ramzinex/desktop-article.png"
                  :alt="locale === 'fa' ? 'صفحه جزئیات مقاله رمزینکس در دسکتاپ' : 'Ramzinex article detail page on desktop'"
                  width="1920"
                  height="5198"
                  loading="lazy"
                >
                <span class="ramzinex-gallery__action">{{ copy.labels.open }} ↗</span>
              </button>
              <button
                type="button"
                class="ramzinex-gallery__mobile"
                @click="openMedia('/images/case-studies/ramzinex/mobile-article.png', locale === 'fa' ? 'صفحه جزئیات مقاله رمزینکس در موبایل' : 'Ramzinex article detail page on mobile', 'mobile')"
              >
                <img
                  src="/images/case-studies/ramzinex/mobile-article.png"
                  :alt="locale === 'fa' ? 'صفحه جزئیات مقاله رمزینکس در موبایل' : 'Ramzinex article detail page on mobile'"
                  width="440"
                  height="5766"
                  loading="lazy"
                >
                <span class="ramzinex-gallery__action">{{ copy.labels.open }} ↗</span>
              </button>
            </div>
          </div>
        </section>

        <section
          id="ramzinex-section-5"
          class="case-section case-section--wide ramzinex-section ramzinex-campaign reveal-section"
        >
          <div class="ramzinex-campaign__copy">
            <p>{{ copy.chapters[3]!.label }}</p>
            <h2>{{ copy.chapters[3]!.title }}</h2>
            <p>{{ copy.chapters[3]!.summary }}</p>
            <blockquote>{{ copy.chapters[3]!.decision }}</blockquote>
          </div>
          <div class="ramzinex-campaign__showcase">
            <button
              type="button"
              class="ramzinex-campaign__screen ramzinex-campaign__screen--desktop"
              :aria-label="copy.chapters[3]!.desktopAlt"
              @click="openMedia(copy.chapters[3]!.desktop, copy.chapters[3]!.desktopAlt)"
            >
              <img
                :src="copy.chapters[3]!.desktop"
                :alt="copy.chapters[3]!.desktopAlt"
                width="1920"
                height="4733"
                loading="lazy"
              >
              <span>
                <b>{{ copy.labels.open }}</b>
                <small aria-hidden="true">↗</small>
              </span>
            </button>
            <button
              type="button"
              class="ramzinex-campaign__screen ramzinex-campaign__screen--mobile"
              :aria-label="copy.chapters[3]!.mobileAlt"
              @click="openMedia(copy.chapters[3]!.mobile, copy.chapters[3]!.mobileAlt, 'mobile')"
            >
              <img
                :src="copy.chapters[3]!.mobile"
                :alt="copy.chapters[3]!.mobileAlt"
                width="440"
                height="4531"
                loading="lazy"
              >
              <span>
                <Icon
                  name="lucide:maximize-2"
                  class="ramzinex-campaign__expand-icon"
                  aria-hidden="true"
                />
              </span>
            </button>
          </div>
        </section>

        <section
          id="ramzinex-section-6"
          class="case-section ramzinex-section ramzinex-section--dark reveal-section"
        >
          <div class="portfolio-container">
            <div class="ramzinex-heading ramzinex-heading--split">
              <div>
                <p>{{ copy.responsive.kicker }}</p>
                <h2>{{ copy.responsive.title }}</h2>
              </div>
              <p class="ramzinex-lead">
                {{ copy.responsive.lead }}
              </p>
            </div>
            <div class="ramzinex-rules">
              <article
                v-for="(rule, index) in copy.responsive.rules"
                :key="rule[0]"
              >
                <span>{{ String(index + 1).padStart(2, '0') }}</span>
                <h3>{{ rule[0] }}</h3>
                <p>{{ rule[1] }}</p>
              </article>
            </div>
          </div>
        </section>

        <section
          id="ramzinex-section-7"
          class="case-section case-section--wide ramzinex-section ramzinex-system reveal-section"
        >
          <div class="ramzinex-heading">
            <p>{{ copy.system.kicker }}</p>
            <h2>{{ copy.system.title }}</h2>
            <div class="ramzinex-heading__line" />
            <p class="ramzinex-lead">
              {{ copy.system.lead }}
            </p>
          </div>
          <div class="ramzinex-palettes">
            <article
              class="ramzinex-color-card ramzinex-color-card--primary"
              :style="{ '--token-color': copy.system.primaryColor }"
            >
              <p>{{ copy.system.primaryLabel }}</p>
              <strong>{{ copy.system.primaryColor }}</strong>
            </article>
            <article
              class="ramzinex-color-card ramzinex-color-card--secondary"
              :style="{ '--token-color': copy.system.secondaryColor }"
            >
              <p>{{ copy.system.secondaryLabel }}</p>
              <strong>{{ copy.system.secondaryColor }}</strong>
            </article>
          </div>
          <div class="ramzinex-type-system">
            <div class="ramzinex-type-system__copy">
              <p>{{ copy.system.typographyLabel }}</p>
              <h3>Dana</h3>
              <p>{{ copy.system.typographyText }}</p>
              <ul>
                <li
                  v-for="weight in copy.system.typographyWeights"
                  :key="weight"
                >
                  {{ weight }}
                </li>
              </ul>
            </div>
            <button
              type="button"
              class="ramzinex-type-system__specimen"
              :aria-label="copy.labels.open"
              @click="openMedia('/images/case-studies/ramzinex/dana-type-specimen.png', locale === 'fa' ? 'نمونه وزن‌های فونت دانا' : 'Dana font weight specimen')"
            >
              <img
                src="/images/case-studies/ramzinex/dana-type-specimen.png"
                :alt="locale === 'fa' ? 'نمونه وزن‌های فونت دانا از Hairline تا Fat' : 'Dana typeface weights from Hairline to Fat'"
                width="2000"
                height="1753"
                loading="lazy"
              >
              <span>{{ copy.labels.open }} ↗</span>
            </button>
          </div>
        </section>

        <section
          id="ramzinex-section-8"
          class="case-section ramzinex-section ramzinex-validation reveal-section"
        >
          <div class="ramzinex-heading ramzinex-heading--split">
            <div>
              <p>{{ copy.validation.kicker }}</p>
              <h2>{{ copy.validation.title }}</h2>
            </div>
            <p class="ramzinex-lead">
              {{ copy.validation.lead }}
            </p>
          </div>
          <div class="ramzinex-validation__grid">
            <article
              v-for="(check, index) in copy.validation.checks"
              :key="check[0]"
            >
              <span>{{ String(index + 1).padStart(2, '0') }}</span>
              <h3>{{ check[0] }}</h3>
              <p>{{ check[1] }}</p>
            </article>
          </div>
        </section>

        <div class="ramzinex-navigation">
          <ProjectNavigation
            :previous="{ path: '/work/toranj-capital-redesign', title: locale === 'fa' ? 'بازطراحی وب‌سایت ترنج کپیتال' : 'Toranj Capital website redesign' }"
          />
        </div>
      </main>
    </div>

    <dialog
      ref="dialog"
      class="ramzinex-dialog"
      :class="{ 'ramzinex-dialog--mobile': expandedMedia?.format === 'mobile' }"
      @click.self="closeMedia"
      @close="expandedMedia = null"
    >
      <div class="ramzinex-dialog__head">
        <p>{{ expandedMedia?.alt }}</p>
        <button
          type="button"
          @click="closeMedia"
        >
          {{ copy.labels.close }} ×
        </button>
      </div>
      <img
        v-if="expandedMedia"
        :src="expandedMedia.src"
        :alt="expandedMedia.alt"
      >
    </dialog>
  </article>
</template>

<style scoped>
.ramzinex-case { --ramzinex-yellow: #ffc117; --ramzinex-accent: var(--portfolio-accent); --ramzinex-ink: #090a0b; overflow: clip; }
.ramzinex-hero { position: relative; padding: clamp(8rem, 12vw, 11rem) 0 clamp(4.5rem, 8vw, 8rem); background: color-mix(in srgb, var(--portfolio-surface) 62%, var(--portfolio-bg)); }
.ramzinex-hero::before { position: absolute; inset: 0; pointer-events: none; background-image: linear-gradient(color-mix(in srgb, var(--portfolio-line) 35%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--portfolio-line) 35%, transparent) 1px, transparent 1px); background-size: clamp(2.5rem, 5vw, 5rem) clamp(2.5rem, 5vw, 5rem); content: ''; opacity: .32; mask-image: linear-gradient(to bottom, #000, transparent 82%); }
.ramzinex-hero__inner { position: relative; }
.ramzinex-hero__copy { position: relative; z-index: 2; display: flex; max-width: 72rem; margin-inline: auto; flex-direction: column; align-items: center; text-align: center; }
.ramzinex-kicker, .ramzinex-heading > p:first-child, .ramzinex-heading--split > div > p:first-child, .ramzinex-campaign__copy > p:first-child { color: var(--ramzinex-accent); font-size: .78rem; font-weight: 800; }
.ramzinex-hero h1 { max-width: 12ch; margin-top: 1rem; font-family: var(--font-display); font-size: clamp(3rem, 6.7vw, 7rem); font-weight: 900; letter-spacing: -.06em; line-height: 1.04; text-wrap: balance; }
[lang='fa'] .ramzinex-hero h1 { max-width: 14ch; letter-spacing: -.018em; line-height: 1.18; }
.ramzinex-hero__summary { max-width: 49rem; margin-top: 1.5rem; color: var(--portfolio-muted); font-size: clamp(1.05rem, 1.45vw, 1.35rem); line-height: 1.9; text-wrap: pretty; }
.ramzinex-draft { display: flex; max-width: 48rem; align-items: center; gap: .7rem; margin-top: 1.25rem; color: var(--portfolio-muted); font-size: .72rem; }
.ramzinex-draft span { flex: none; padding: .28rem .65rem; border-radius: 999px; background: color-mix(in srgb, var(--ramzinex-accent) 12%, transparent); color: var(--ramzinex-accent); font-weight: 800; }
.ramzinex-hero__media { position: relative; display: block; width: min(100%, 75rem); height: clamp(20rem, 46vw, 39rem); margin: clamp(3rem, 6vw, 6rem) auto 0; overflow: hidden; border-radius: clamp(1rem, 2vw, 2rem); background: #fff; box-shadow: 0 2.5rem 7rem rgb(10 12 18 / 22%); text-align: start; }
.ramzinex-hero__media picture, .ramzinex-hero__media img { display: block; width: 100%; height: 100%; }
.ramzinex-hero__media img { object-fit: cover; object-position: top; transition: transform 900ms var(--ease-enter); }
.ramzinex-hero__media:hover img { transform: scale(1.012); }
.ramzinex-hero__media-label { position: absolute; inset-inline-end: 1rem; bottom: 1rem; padding: .7rem 1rem; border-radius: 999px; background: var(--ramzinex-ink); color: #fff; font-size: .72rem; font-weight: 700; }
.ramzinex-meta { display: grid; max-width: 75rem; grid-template-columns: repeat(4, 1fr); margin: 2rem auto 0; border-block: 1px solid var(--portfolio-line); }
.ramzinex-meta > div { padding: 1.5rem; text-align: center; }
.ramzinex-meta > div + div { border-inline-start: 1px solid var(--portfolio-line); }
.ramzinex-meta dt { color: var(--portfolio-muted); font-size: .68rem; font-weight: 700; }
.ramzinex-meta dd { margin-top: .5rem; font-size: .88rem; font-weight: 750; }
.ramzinex-outline { position: sticky; top: 0; z-index: 40; background: color-mix(in srgb, var(--portfolio-bg) 88%, transparent); box-shadow: 0 .5rem 2rem rgb(0 0 0 / 6%); backdrop-filter: blur(18px); }
.ramzinex-outline__track { display: flex; overflow-x: auto; scrollbar-width: none; }
.ramzinex-outline__track::-webkit-scrollbar { display: none; }
.ramzinex-outline a { display: inline-flex; min-height: 4.1rem; flex: 0 0 auto; align-items: center; gap: .45rem; padding-inline: 1rem; color: var(--portfolio-muted); font-size: .72rem; font-weight: 700; white-space: nowrap; }
.ramzinex-outline a:hover { color: var(--portfolio-text); }
.ramzinex-outline a span { color: var(--ramzinex-accent); font-size: .62rem; }
.ramzinex-section { padding-block: var(--portfolio-section); }
.ramzinex-heading { max-width: 62rem; }
.ramzinex-heading h2, .ramzinex-campaign__copy h2 { margin-top: .7rem; font-family: var(--font-display); font-size: clamp(2.7rem, 5.2vw, 5.5rem); font-weight: 850; letter-spacing: -.052em; line-height: 1.05; text-wrap: balance; }
[lang='fa'] .ramzinex-heading h2, [lang='fa'] .ramzinex-campaign__copy h2 { letter-spacing: -.015em; line-height: 1.22; }
.ramzinex-heading__line { width: 4rem; height: 3px; margin-top: 1.5rem; background: var(--ramzinex-accent); }
.ramzinex-lead { max-width: 49rem; margin-top: 1.5rem; color: var(--portfolio-muted); font-size: clamp(1rem, 1.25vw, 1.18rem); line-height: 1.95; }
.ramzinex-heading--split { display: grid; max-width: none; grid-template-columns: minmax(0, 1fr) minmax(20rem, .72fr); align-items: end; gap: 4rem; }
.ramzinex-heading--split .ramzinex-lead { margin: 0; }
.ramzinex-scope-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; margin-top: clamp(3rem, 6vw, 6rem); background: var(--portfolio-line); }
.ramzinex-scope-grid article { min-height: 19rem; padding: clamp(1.5rem, 2.5vw, 2.5rem); background: var(--portfolio-bg); }
.ramzinex-scope-grid span, .ramzinex-content-cards span, .ramzinex-rules span { color: var(--ramzinex-accent); font-size: .72rem; font-weight: 800; }
.ramzinex-scope-grid h3, .ramzinex-content-cards h3, .ramzinex-rules h3 { margin-top: 4rem; font-size: 1.25rem; font-weight: 800; }
.ramzinex-scope-grid p, .ramzinex-content-cards p, .ramzinex-rules p { margin-top: 1rem; color: var(--portfolio-muted); font-size: .87rem; line-height: 1.85; }
.ramzinex-section--dark { background: #090a0b; color: #f8f9fa; }
.ramzinex-section--dark .ramzinex-lead, .ramzinex-section--dark .ramzinex-logic__flow p, .ramzinex-section--dark .ramzinex-rules p { color: #9ba0aa; }
.ramzinex-logic { display: grid; grid-template-columns: .75fr 1.25fr; gap: clamp(3rem, 8vw, 9rem); }
.ramzinex-logic > .ramzinex-heading { grid-column: 1; }
.ramzinex-context-note { margin-top: 1.5rem; padding-block: 1rem; border-block: 1px solid #2c3038; color: #8d939e; font-size: .72rem; line-height: 1.8; }
.ramzinex-ux-model { display: grid; grid-column: 1; grid-template-columns: 1fr; gap: 2rem; }
.ramzinex-ux-model__label { margin-bottom: .75rem; color: var(--ramzinex-accent); font-size: .68rem; font-weight: 800; }
.ramzinex-ux-model article { padding-block: 1rem; border-bottom: 1px solid #2c3038; }
.ramzinex-ux-model h3 { font-size: .9rem; font-weight: 750; }
.ramzinex-ux-model article p { margin-top: .45rem; color: #9ba0aa; font-size: .76rem; line-height: 1.75; }
.ramzinex-logic__flow { grid-column: 2; grid-row: 1 / 3; }
.ramzinex-logic__flow { counter-reset: logic; }
.ramzinex-logic__flow li { display: grid; grid-template-columns: 3rem 9rem minmax(0, 1fr); gap: 1rem; align-items: center; min-height: 7rem; border-bottom: 1px solid #2c3038; }
.ramzinex-logic__flow li:first-child { border-top: 1px solid #2c3038; }
.ramzinex-logic__flow span { color: var(--ramzinex-accent); font-size: .68rem; }
.ramzinex-logic__flow strong { font-size: 1.15rem; }
.ramzinex-logic__flow p { margin: 0; font-size: .86rem; line-height: 1.75; }
.ramzinex-tabs { display: grid; grid-template-columns: repeat(4, 1fr); gap: .45rem; margin-top: 2rem; padding: .45rem; border-radius: 1.2rem; background: color-mix(in srgb, var(--portfolio-surface) 72%, transparent); box-shadow: 0 1rem 3.5rem rgb(0 0 0 / 10%); backdrop-filter: blur(18px); }
.ramzinex-tabs button { position: relative; min-height: 4rem; padding: .8rem 1rem; border-radius: .85rem; color: var(--portfolio-muted); font-size: .85rem; font-weight: 750; transition: color var(--motion-control), background-color var(--motion-control), box-shadow var(--motion-control), transform var(--motion-control); }
.ramzinex-tabs button + button { border-inline-start: 0; }
.ramzinex-tabs button:hover { background: color-mix(in srgb, var(--ramzinex-accent) 9%, transparent); color: var(--portfolio-text); }
.ramzinex-tabs button:focus-visible { outline: 2px solid var(--ramzinex-accent); outline-offset: 2px; }
.ramzinex-tabs button span { margin-inline-end: .55rem; color: var(--ramzinex-accent); font-size: .62rem; font-variant-numeric: tabular-nums; opacity: .72; }
.ramzinex-tabs button.is-active { background: linear-gradient(135deg, color-mix(in srgb, var(--ramzinex-accent) 88%, #fff), var(--ramzinex-accent)); color: #fff; box-shadow: 0 .65rem 1.6rem color-mix(in srgb, var(--ramzinex-accent) 28%, transparent); transform: translateY(-1px); }
.ramzinex-tabs button.is-active span { color: inherit; opacity: .58; }
.ramzinex-device-stage { display: grid; grid-template-columns: minmax(0, 1fr) minmax(14rem, .27fr); gap: clamp(1rem, 2.5vw, 2.5rem); margin-top: 1rem; animation: ramzinex-enter 500ms var(--ease-enter) both; }
@keyframes ramzinex-enter { from { opacity: 0; transform: translateY(.7rem); } }
.ramzinex-shot { position: relative; display: block; min-width: 0; overflow: hidden; border-radius: 1.25rem; background: #fff; box-shadow: var(--shadow-soft); text-align: start; }
.ramzinex-shot--desktop { height: clamp(25rem, 40vw, 36rem); }
.ramzinex-shot--mobile { height: clamp(25rem, 40vw, 36rem); }
.ramzinex-shot__bar { position: absolute; inset: 0 0 auto; z-index: 2; display: flex; height: 3.5rem; align-items: center; justify-content: space-between; padding-inline: 1rem; background: rgb(17 19 23 / 88%); color: #fff; backdrop-filter: blur(12px); }
.ramzinex-shot__bar b { font-size: .76rem; }
.ramzinex-shot__bar i { color: #9ba0aa; font-size: .65rem; font-style: normal; }
.ramzinex-shot img { display: block; width: 100%; height: auto; object-fit: cover; object-position: top; }
.ramzinex-shot__fade { position: absolute; inset: auto 0 0; z-index: 2; display: flex; height: 8rem; align-items: flex-end; justify-content: center; padding: 1.4rem; background: linear-gradient(transparent, rgb(17 19 23 / 88%)); color: #fff; font-size: .72rem; font-weight: 750; }
.ramzinex-content-section { background: color-mix(in srgb, var(--portfolio-surface) 60%, var(--portfolio-bg)); }
.ramzinex-content-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: .75rem; margin-top: 2rem; }
.ramzinex-content-cards article { position: relative; display: grid; min-height: 9rem; align-content: center; padding: 1.1rem 1.35rem; overflow: hidden; border-radius: 1rem; background: color-mix(in srgb, #fff 82%, var(--portfolio-bg)); box-shadow: 0 .8rem 2.6rem rgb(0 0 0 / 6%); text-align: start; transition: transform var(--motion-control), box-shadow var(--motion-control); }
.ramzinex-content-cards article::after { position: absolute; inset-block: 1.2rem; inset-inline-end: 0; width: 3px; border-radius: 999px; background: var(--ramzinex-accent); content: ''; opacity: .65; transform: scaleY(.35); transform-origin: center; transition: opacity var(--motion-control), transform var(--motion-control); }
.ramzinex-content-cards article:hover { box-shadow: 0 1.1rem 3rem rgb(0 0 0 / 10%); transform: translateY(-3px); }
.ramzinex-content-cards article:hover::after { opacity: 1; transform: scaleY(1); }
.ramzinex-content-cards span { display: grid; width: 2.15rem; height: 2.15rem; place-items: center; border-radius: .7rem; background: color-mix(in srgb, var(--ramzinex-accent) 11%, transparent); color: var(--ramzinex-accent); font-size: .65rem; font-weight: 850; font-variant-numeric: tabular-nums; }
.ramzinex-content-cards h3 { margin-top: .8rem; font-size: 1.05rem; }
.ramzinex-content-cards p { margin-top: .6rem; color: var(--portfolio-muted); font-size: .78rem; line-height: 1.75; }
.ramzinex-gallery-label { margin-top: 2rem; color: var(--portfolio-muted); font-size: .72rem; font-weight: 750; }
.ramzinex-gallery { display: grid; grid-template-columns: 1fr 1fr .36fr; gap: .75rem; margin-top: .8rem; }
.ramzinex-gallery button { position: relative; height: clamp(15rem, 20vw, 17.5rem); overflow: hidden; border-radius: 1.05rem; background: #fff; box-shadow: 0 1rem 3rem rgb(0 0 0 / 9%); transition: box-shadow var(--motion-control), transform var(--motion-control); }
.ramzinex-gallery button:hover { box-shadow: 0 1.35rem 3.5rem rgb(0 0 0 / 15%); transform: translateY(-3px); }
.ramzinex-gallery img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top; transition: transform 600ms var(--ease-enter); }
.ramzinex-gallery button:hover img { transform: scale(1.018); }
.ramzinex-gallery__action { position: absolute; z-index: 2; inset: auto .65rem .65rem; display: inline-flex; min-height: 2.5rem; align-items: center; justify-content: center; padding: .55rem .8rem; border-radius: .65rem; background: rgb(17 19 23 / 90%); color: #fff; box-shadow: 0 .65rem 1.8rem rgb(0 0 0 / 20%); font-size: .65rem; font-weight: 750; backdrop-filter: blur(12px); }
.ramzinex-gallery__caption { position: absolute; z-index: 2; inset: auto .65rem .65rem; display: flex; min-height: 3rem; align-items: center; justify-content: space-between; gap: .75rem; padding: .65rem .8rem; border-radius: .75rem; background: rgb(17 19 23 / 88%); color: #fff; box-shadow: 0 .65rem 1.8rem rgb(0 0 0 / 18%); backdrop-filter: blur(12px); }
.ramzinex-gallery__caption b { font-size: .72rem; }
.ramzinex-gallery__caption small { color: rgb(255 255 255 / 65%); font-size: .58rem; white-space: nowrap; }
.ramzinex-campaign { display: grid; grid-template-columns: minmax(20rem, .65fr) minmax(0, 1.35fr); align-items: start; gap: clamp(3rem, 7vw, 8rem); }
.ramzinex-campaign__copy { position: sticky; top: 7rem; }
.ramzinex-campaign__copy > p:not(:first-child) { margin-top: .8rem; color: var(--portfolio-muted); line-height: 1.8; }
.ramzinex-campaign__copy blockquote { margin-top: 1rem; padding: .85rem 1rem; border: 0; border-radius: .8rem; background: color-mix(in srgb, var(--ramzinex-accent) 7%, var(--portfolio-bg)); color: var(--portfolio-text); font-size: .78rem; line-height: 1.75; }
.ramzinex-campaign__screen { position: relative; height: 54rem; overflow: hidden; border-radius: 1.25rem; background: #fff; box-shadow: var(--shadow-soft); }
.ramzinex-campaign__screen img { width: 100%; height: auto; object-position: top; }
.ramzinex-campaign__screen > span { position: absolute; inset-inline-end: 1rem; bottom: 1rem; padding: .7rem 1rem; border-radius: 999px; background: var(--ramzinex-ink); color: #fff; font-size: .7rem; }
.ramzinex-rules { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; margin-top: 4rem; background: #2c3038; }
.ramzinex-rules article { min-height: 16rem; padding: 2rem; background: #111317; }
.ramzinex-rules h3 { margin-top: 3rem; }
.ramzinex-palettes { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .75rem; margin-top: 2rem; }
.ramzinex-color-card { display: flex; min-height: 9rem; flex-direction: column; justify-content: space-between; padding: 1.35rem; border-radius: 1.15rem; background: var(--token-color); box-shadow: 0 1rem 3rem rgb(0 0 0 / 10%); text-align: start; }
.ramzinex-color-card p { font-size: .78rem; font-weight: 850; }
.ramzinex-color-card strong { align-self: flex-end; direction: ltr; unicode-bidi: isolate; font-family: var(--font-latin); font-size: clamp(1.35rem, 2.2vw, 2rem); letter-spacing: -.03em; }
.ramzinex-color-card--primary { color: #111317; }
.ramzinex-color-card--secondary { color: #f8f9fa; }
.ramzinex-type-system { display: grid; grid-template-columns: minmax(17rem, .55fr) minmax(0, 1.45fr); gap: clamp(1.25rem, 3vw, 2.5rem); align-items: center; margin-top: 1.25rem; padding-top: 0; border-top: 0; }
.ramzinex-type-system__copy > p:first-child { color: var(--ramzinex-accent); font-size: .72rem; font-weight: 800; }
.ramzinex-type-system__copy h3 { margin-top: .35rem; font-family: var(--font-latin); font-size: clamp(2.6rem, 4vw, 4rem); font-weight: 700; letter-spacing: -.055em; }
.ramzinex-type-system__copy > p:nth-child(3) { margin-top: .65rem; color: var(--portfolio-muted); font-size: .8rem; line-height: 1.75; }
.ramzinex-type-system__copy ul { display: flex; flex-wrap: wrap; gap: .4rem; margin-top: 1rem; }
.ramzinex-type-system__copy li { padding: .35rem .6rem; border-radius: 999px; background: var(--portfolio-surface); color: var(--portfolio-muted); font-family: var(--font-latin); font-size: .6rem; }
.ramzinex-type-system__specimen { position: relative; height: 16rem; overflow: hidden; border-radius: 1rem; background: #fff; box-shadow: var(--shadow-soft); }
.ramzinex-type-system__specimen img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: center; }
.ramzinex-type-system__specimen span { position: absolute; inset-inline-end: .75rem; bottom: .75rem; padding: .55rem .8rem; border-radius: 999px; background: #090a0b; color: #f8f9fa; font-size: .65rem; font-weight: 700; }
.ramzinex-validation { position: relative; isolation: isolate; overflow: hidden; background: transparent; }
.ramzinex-validation__grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 1rem; margin-top: 2rem; background: transparent; }
.ramzinex-validation__grid article { position: relative; display: flex; min-height: 11.5rem; flex-direction: column; overflow: hidden; padding: 1.35rem; border-radius: 1.35rem; background: radial-gradient(circle at 10% 5%, color-mix(in srgb, var(--ramzinex-accent) 14%, transparent), transparent 42%), linear-gradient(150deg, color-mix(in srgb, var(--portfolio-surface) 96%, #fff), color-mix(in srgb, var(--portfolio-surface) 88%, #090a0b)); box-shadow: 0 1.5rem 4rem -2rem rgb(0 0 0 / 35%); text-align: start; transition: box-shadow var(--motion-control), transform var(--motion-control); }
.ramzinex-validation__grid article:hover { box-shadow: 0 2rem 4.5rem -1.8rem rgb(0 0 0 / 48%); transform: translateY(-6px); }
.ramzinex-validation__grid span { position: absolute; inset-block-start: .9rem; inset-inline-end: 1.15rem; direction: ltr; color: color-mix(in srgb, var(--ramzinex-accent) 34%, transparent); font-family: var(--font-latin); font-size: 2.75rem; font-weight: 900; font-variant-numeric: tabular-nums; letter-spacing: -.09em; line-height: 1; }
.ramzinex-validation__grid h3 { margin-top: auto; padding-top: 4.25rem; font-size: 1.02rem; font-weight: 850; line-height: 1.55; }
.ramzinex-validation__grid p { max-width: 18rem; margin-top: .5rem; color: var(--portfolio-muted); font-size: .73rem; line-height: 1.7; }
.ramzinex-navigation { padding-block: 0; }
.ramzinex-dialog { width: min(96vw, 92rem); max-width: 92rem; height: 92dvh; max-height: 92dvh; margin: auto; padding: 0; overflow: auto; overscroll-behavior: contain; scrollbar-gutter: stable; border: 0; border-radius: 1rem; background: #fff; color: #111317; box-shadow: 0 3rem 10rem rgb(0 0 0 / 55%); }
.ramzinex-dialog--mobile { width: min(92vw, 28.5rem); max-width: 28.5rem; }
.ramzinex-dialog::backdrop { background: rgb(5 7 10 / 78%); backdrop-filter: blur(8px); }
.ramzinex-dialog__head { position: sticky; top: 0; z-index: 3; display: flex; min-height: 4rem; align-items: center; justify-content: space-between; padding-inline: 1rem; background: rgb(17 19 23 / 94%); color: #fff; backdrop-filter: blur(14px); }
.ramzinex-dialog__head p { overflow: hidden; font-size: .75rem; text-overflow: ellipsis; white-space: nowrap; }
.ramzinex-dialog__head button { flex: none; margin-inline-start: 1rem; padding: .5rem .75rem; border-radius: 999px; background: #2a2e36; font-size: .72rem; }
.ramzinex-dialog > img { display: block; width: 100%; max-width: 100%; height: auto; }

/* Shared case-study skeleton: the Ramzinex palette stays project-specific. */
.ramzinex-case :deep(.case-hero__title) { width: 100%; max-width: none; margin-inline: auto; color: var(--portfolio-accent); font-size: clamp(2.75rem, 4.2vw, 4.4rem); line-height: 1.14; text-align: center; white-space: pre; text-wrap: nowrap; }
[lang='fa'] .ramzinex-case :deep(.case-hero__title) { line-height: 1.3; }
.ramzinex-case :deep(.case-hero__summary) { width: 100%; max-width: none; font-size: clamp(.92rem, 1.05vw, 1.08rem); white-space: nowrap; }
[lang='en'] .ramzinex-case :deep(.case-hero__summary) { max-width: 76rem; white-space: normal; }
.ramzinex-case :deep(.case-hero__surface) { border-block-color: color-mix(in srgb, var(--ramzinex-yellow) 22%, var(--portfolio-line)); }
.ramzinex-hero-poster { position: relative; display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; overflow: hidden; margin-top: clamp(1rem, 2vw, 2rem); border-radius: 1.15rem; background: #fff; box-shadow: 0 2.25rem 7rem rgb(0 0 0 / 14%); }
.ramzinex-hero-poster img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: center; }
.case-shell { display: block; width: 100%; max-width: none; padding-inline: 0; }
.case-outline { position: sticky; top: 4.75rem; z-index: 20; display: flex; width: 100%; align-items: stretch; overflow: hidden; margin-bottom: clamp(4rem, 7vw, 7rem); border-block: 1px solid var(--portfolio-line); background: color-mix(in srgb, var(--portfolio-bg) 94%, transparent); box-shadow: 0 .75rem 2rem rgb(0 0 0 / 5%); backdrop-filter: blur(18px); }
.case-outline > p { display: flex; min-height: 4.75rem; flex: none; align-items: center; padding-inline: .75rem 1.25rem; border-inline-end: 1px solid var(--portfolio-line); color: var(--portfolio-text); font-size: .92rem; white-space: nowrap; }
.case-outline ol { display: flex; min-width: 0; flex: 1; gap: .25rem; overflow-x: auto; scrollbar-width: none; }
.case-outline ol::-webkit-scrollbar { display: none; }
.case-outline li { flex: 1 0 auto; }
.case-outline a { position: relative; display: flex; min-height: 4.75rem; align-items: center; justify-content: center; gap: .4rem; padding-inline: .75rem; border-inline-end: 1px solid color-mix(in srgb, var(--portfolio-line) 65%, transparent); color: var(--portfolio-muted); font-size: clamp(.72rem, .78vw, .9rem); font-weight: 650; white-space: nowrap; transition: color var(--motion-control), background-color var(--motion-control); }
.case-outline a::after { position: absolute; inset-inline: 1rem; bottom: 0; height: 2px; background: var(--ramzinex-accent); content: ''; opacity: 0; transform: scaleX(.35); transition: opacity var(--motion-control), transform var(--motion-control); }
.case-outline a.is-active { color: var(--portfolio-text); }
.case-outline a.is-active::after { opacity: 1; transform: scaleX(1); }
.case-outline a span { color: var(--ramzinex-accent); font-size: .8rem; font-weight: 800; }
.case-main { min-width: 0; max-width: none; margin-inline: auto; }
.case-section { position: relative; isolation: isolate; width: 100vw; max-width: none; margin-inline: calc(50% - 50vw); margin-top: 0; text-align: center; }
.case-section:first-child { margin-top: 0; }
.case-section--wide { max-width: 76rem; }
.case-main > .ramzinex-section > .portfolio-container { width: 100%; max-width: none; padding-inline: 0; }
.ramzinex-section { padding-block: 0; }
.ramzinex-heading { max-width: 58rem; margin-inline: auto; text-align: center; }
.ramzinex-heading h2, .ramzinex-campaign__copy h2 { max-width: 34ch; margin-inline: auto; font-size: clamp(2rem, 2.4vw, 2.8rem); line-height: 1.25; }
[lang='fa'] .ramzinex-heading h2, [lang='fa'] .ramzinex-campaign__copy h2 { line-height: 1.45; }
.ramzinex-heading__line { width: 2.25rem; height: 2px; margin: 1.35rem auto 0; }
.ramzinex-lead { margin-inline: auto; text-align: center; }
.ramzinex-heading--split { display: block; max-width: 58rem; }
.ramzinex-heading--split .ramzinex-lead { margin: 1.5rem auto 0; }
.ramzinex-overview { position: relative; width: 100vw; max-width: none; overflow: hidden; margin-inline: calc(50% - 50vw); padding: clamp(2.5rem, 3.5vw, 3.75rem) max(1.25rem, calc((100vw - 76rem) / 2 + 2rem)); background: linear-gradient(145deg, color-mix(in srgb, #fff 80%, var(--portfolio-bg)), color-mix(in srgb, #f8f9fa 88%, var(--portfolio-bg))); box-shadow: inset 0 1px color-mix(in srgb, #fff 70%, transparent), inset 0 -1px color-mix(in srgb, var(--portfolio-line) 70%, transparent); }
.ramzinex-overview::after { position: absolute; inset: 0; background-image: linear-gradient(90deg, transparent, color-mix(in srgb, var(--ramzinex-accent) 5%, transparent), transparent); content: ''; pointer-events: none; }
.ramzinex-overview__inner { position: relative; z-index: 1; width: 100%; max-width: 76rem; margin-inline: auto; }
.ramzinex-overview .ramzinex-overview__heading { display: flex; max-width: 58rem; flex-direction: column; align-items: center; gap: 0; text-align: center; }
.ramzinex-overview .ramzinex-overview__heading > div { min-width: 0; }
.ramzinex-overview .ramzinex-overview__heading > div > p:first-child { display: inline-flex; min-height: 1.8rem; align-items: center; padding-inline: .8rem; border-radius: 999px; background: color-mix(in srgb, var(--ramzinex-accent) 9%, transparent); color: var(--ramzinex-accent); }
.ramzinex-overview .ramzinex-overview__heading h2 { max-width: none; margin: .7rem auto 0; font-size: clamp(2.1rem, 3vw, 3.35rem); text-align: center; white-space: nowrap; }
.ramzinex-overview .ramzinex-overview__heading .ramzinex-heading__line { margin: 1rem auto 0; }
.ramzinex-overview .ramzinex-overview__heading .ramzinex-lead { max-width: 48rem; margin: 1.15rem auto 0; padding: 0; border: 0; text-align: center; }
.ramzinex-overview .ramzinex-overview__heading .ramzinex-lead { max-width: none; white-space: nowrap; }
.ramzinex-overview .ramzinex-scope-grid { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 0; overflow: hidden; margin-top: clamp(1.75rem, 2.8vw, 2.5rem); border-radius: 1.25rem; background: color-mix(in srgb, var(--portfolio-surface) 72%, transparent); box-shadow: 0 1rem 3rem rgb(18 20 24 / 5%); }
.ramzinex-overview .ramzinex-scope-grid article { position: relative; display: grid; min-height: 9.25rem; grid-template-columns: auto minmax(0, 1fr); align-content: center; align-items: center; column-gap: .8rem; padding: 1.25rem clamp(1.15rem, 1.8vw, 1.75rem); border: 0; border-radius: 0; background: transparent; box-shadow: none; text-align: start; transition: background-color .25s ease; }
.ramzinex-overview .ramzinex-scope-grid article:hover { background: color-mix(in srgb, var(--ramzinex-accent) 5%, transparent); }
.ramzinex-overview .ramzinex-scope-grid article + article { border-inline-start: 1px solid color-mix(in srgb, var(--ramzinex-accent) 12%, var(--portfolio-line)); }
.ramzinex-overview .ramzinex-scope-grid article:nth-child(n) { grid-column: auto; }
.ramzinex-overview .ramzinex-scope-grid span { display: grid; width: 2.15rem; height: 2.15rem; place-items: center; border-radius: .7rem; background: color-mix(in srgb, var(--ramzinex-accent) 10%, transparent); color: var(--ramzinex-accent); font-variant-numeric: tabular-nums; }
.ramzinex-overview .ramzinex-scope-grid span::after { display: none; }
.ramzinex-overview .ramzinex-scope-grid h3 { max-width: 16ch; margin: 0; font-size: clamp(1rem, 1.25vw, 1.2rem); line-height: 1.45; }
.ramzinex-overview .ramzinex-scope-grid p { width: 100%; max-width: none; grid-column: 1 / -1; margin-top: .75rem; color: color-mix(in srgb, var(--portfolio-text) 68%, var(--portfolio-muted)); font-size: clamp(.86rem, .9vw, .94rem); line-height: 1.8; }
.ramzinex-section--dark { background: linear-gradient(145deg, color-mix(in srgb, #fff5d9 88%, var(--portfolio-bg)), color-mix(in srgb, #f1f2f3 74%, var(--portfolio-bg))); color: var(--portfolio-text); }
.ramzinex-section--dark .ramzinex-lead, .ramzinex-section--dark .ramzinex-logic__flow p, .ramzinex-section--dark .ramzinex-rules p, .ramzinex-section--dark .ramzinex-ux-model article p { color: var(--portfolio-muted); }
.ramzinex-section--dark .ramzinex-context-note, .ramzinex-section--dark .ramzinex-ux-model article, .ramzinex-section--dark .ramzinex-logic__flow li { border-color: color-mix(in srgb, var(--ramzinex-yellow) 18%, var(--portfolio-line)); }
.ramzinex-logic { display: block; }
.ramzinex-logic > .ramzinex-heading { max-width: 76rem; }
.ramzinex-logic > .ramzinex-heading h2 { max-width: none; white-space: nowrap; }
.ramzinex-logic > .ramzinex-heading .ramzinex-lead { max-width: 66rem; margin-top: 1rem; }
.ramzinex-ux-model { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0; margin-top: clamp(1.75rem, 2.5vw, 2.5rem); text-align: start; }
.ramzinex-ux-model__group { display: grid; grid-template-columns: 1fr; align-content: start; padding-inline: clamp(1rem, 2.5vw, 2.5rem); }
.ramzinex-ux-model__group + .ramzinex-ux-model__group { border-inline-start: 1px solid color-mix(in srgb, var(--ramzinex-accent) 16%, var(--portfolio-line)); }
.ramzinex-ux-model__label { margin: 0 0 .4rem; color: var(--ramzinex-accent); font-size: .72rem; font-weight: 850; }
.ramzinex-ux-model article { display: grid; min-height: 0; grid-template-columns: 2.4rem minmax(0, 1fr); align-items: start; gap: .9rem; padding-block: 1.1rem; border: 0; border-radius: 0; background: transparent; }
.ramzinex-ux-model article + article { border-top: 1px solid color-mix(in srgb, var(--portfolio-line) 72%, transparent); }
.ramzinex-ux-model__icon { width: 1.35rem; height: 1.35rem; margin-top: .15rem; color: var(--ramzinex-accent); }
.ramzinex-ux-model h3 { font-size: .92rem; font-weight: 800; line-height: 1.55; }
.ramzinex-ux-model article p { margin-top: .28rem; color: var(--portfolio-muted); font-size: .75rem; line-height: 1.7; }
.ramzinex-logic__flow { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .65rem; margin-top: clamp(2.75rem, 4vw, 4rem); border: 0; }
.ramzinex-logic__flow li { position: relative; display: grid; min-height: 8.5rem; grid-template-columns: auto 1fr; align-content: center; align-items: center; gap: .45rem .7rem; padding: 1.15rem; border: 0; border-radius: 1rem; background: color-mix(in srgb, var(--portfolio-surface) 68%, transparent); text-align: start; }
.ramzinex-logic__flow li:first-child { border-top: 0; }
.ramzinex-logic__flow li + li { border-inline-start: 0; }
.ramzinex-logic__icon { width: 1.4rem; height: 1.4rem; color: var(--ramzinex-accent); }
.ramzinex-logic__number { position: absolute; inset-block-start: .75rem; inset-inline-end: .8rem; color: var(--ramzinex-accent); font-size: .68rem; opacity: .55; }
.ramzinex-logic__icon { position: static; display: inline-flex; opacity: 1; }
.ramzinex-logic__flow strong { margin: 0; font-size: 1rem; }
.ramzinex-logic__flow p { grid-column: 1 / -1; margin-top: .25rem; font-size: .76rem; line-height: 1.65; }
.ramzinex-content-section { background: color-mix(in srgb, #f8f9fa 82%, var(--portfolio-bg)); }
.ramzinex-content-cards article { background: color-mix(in srgb, #fff 80%, var(--portfolio-bg)); }
.ramzinex-rules { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .75rem; margin-top: 2rem; background: transparent; }
.ramzinex-rules article { position: relative; min-height: 11rem; overflow: hidden; padding: 1.35rem; border-radius: 1rem; background: color-mix(in srgb, #fff 78%, var(--portfolio-bg)); box-shadow: 0 .9rem 2.8rem rgb(0 0 0 / 7%); text-align: start; transition: box-shadow var(--motion-control), transform var(--motion-control); }
.ramzinex-rules article::after { position: absolute; inset-block-start: -4rem; inset-inline-end: -4rem; width: 9rem; height: 9rem; border-radius: 50%; background: color-mix(in srgb, var(--ramzinex-accent) 9%, transparent); content: ''; filter: blur(1rem); pointer-events: none; }
.ramzinex-rules article:hover { box-shadow: 0 1.2rem 3.2rem rgb(0 0 0 / 12%); transform: translateY(-3px); }
.ramzinex-rules span { position: relative; z-index: 1; display: grid; width: 2.15rem; height: 2.15rem; place-items: center; border-radius: .7rem; background: color-mix(in srgb, var(--ramzinex-accent) 12%, transparent); color: var(--ramzinex-accent); font-size: .65rem; font-variant-numeric: tabular-nums; }
.ramzinex-rules h3 { position: relative; z-index: 1; margin-top: .9rem; font-size: 1rem; line-height: 1.55; }
.ramzinex-rules p { position: relative; z-index: 1; margin-top: .55rem; font-size: .76rem; line-height: 1.75; }
.ramzinex-campaign { position: relative; isolation: isolate; display: block; overflow: hidden; background: radial-gradient(circle at 50% -18%, color-mix(in srgb, var(--ramzinex-accent) 8%, transparent), transparent 30rem), var(--portfolio-bg); }
.ramzinex-campaign::before { position: absolute; z-index: -1; inset: 0; background-image: radial-gradient(circle, color-mix(in srgb, var(--ramzinex-accent) 18%, transparent) 1px, transparent 1.25px); background-size: 2rem 2rem; content: ''; opacity: .42; pointer-events: none; mask-image: linear-gradient(to bottom, #000, transparent 78%); }
.ramzinex-campaign::after { position: absolute; z-index: -1; inset: 0; background: linear-gradient(90deg, var(--portfolio-bg), transparent 18%, transparent 82%, var(--portfolio-bg)); content: ''; pointer-events: none; }
.ramzinex-campaign__copy { position: static; max-width: 76rem; margin-inline: auto; padding: 0; border-radius: 0; background: transparent; box-shadow: none; text-align: center; }
.ramzinex-campaign__copy > p:first-child { display: inline-flex; min-height: 1.8rem; align-items: center; padding-inline: .8rem; border-radius: 999px; background: color-mix(in srgb, var(--ramzinex-accent) 11%, transparent); }
.ramzinex-campaign__copy h2 { max-width: none; margin-top: .65rem; white-space: nowrap; }
.ramzinex-campaign__copy > p:not(:first-child), .ramzinex-campaign__copy blockquote { max-width: 49rem; margin-inline: auto; }
.ramzinex-campaign__showcase { display: grid; max-width: 76rem; height: clamp(23rem, 34vw, 31rem); grid-template-columns: minmax(0, 1fr) clamp(10rem, 16vw, 13.5rem); align-items: end; gap: clamp(.8rem, 1.5vw, 1.25rem); margin: clamp(1.75rem, 3vw, 2.75rem) auto 0; }
.ramzinex-campaign__screen { width: 100%; height: 100%; margin: 0; border: 0; border-radius: 1.2rem; box-shadow: 0 1.8rem 5rem -2.4rem rgb(0 0 0 / 52%); }
.ramzinex-campaign__screen--desktop { height: 88%; }
.ramzinex-campaign__screen--mobile { border-radius: 1.45rem; box-shadow: 0 2rem 5rem -2rem rgb(0 0 0 / 64%); }
.ramzinex-campaign__screen img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top; }
.ramzinex-campaign__screen > span { inset: auto .65rem .65rem; display: flex; align-items: center; justify-content: space-between; gap: .65rem; padding: .65rem .8rem; border-radius: .75rem; background: rgb(17 19 23 / 88%); box-shadow: 0 .7rem 1.8rem rgb(0 0 0 / 22%); backdrop-filter: blur(12px); }
.ramzinex-campaign__screen > span b { font-size: .7rem; }
.ramzinex-campaign__screen > span small { color: rgb(255 255 255 / 64%); font-size: .58rem; white-space: nowrap; }
#ramzinex-section-6 { position: relative; overflow: hidden; background: color-mix(in srgb, var(--portfolio-surface) 56%, var(--portfolio-bg)); }
#ramzinex-section-6::before { position: absolute; z-index: 0; inset: 0; background-image: radial-gradient(circle, color-mix(in srgb, var(--ramzinex-accent) 22%, transparent) 1px, transparent 1.4px), linear-gradient(135deg, color-mix(in srgb, var(--ramzinex-accent) 7%, transparent) 1px, transparent 1px); background-position: 0 0, 0 0; background-size: 2.75rem 2.75rem, 5.5rem 5.5rem; content: ''; opacity: .5; pointer-events: none; mask-image: linear-gradient(90deg, transparent, #000 18%, #000 82%, transparent); }
#ramzinex-section-6 > .portfolio-container { position: relative; z-index: 1; }
.ramzinex-system { background: linear-gradient(160deg, color-mix(in srgb, #fff8e4 62%, var(--portfolio-bg)), color-mix(in srgb, #f8f9fa 76%, var(--portfolio-bg))); }
.ramzinex-scope-grid { background: color-mix(in srgb, var(--ramzinex-yellow) 16%, var(--portfolio-line)); }
.ramzinex-navigation { margin-top: 7.85rem; padding-block: 0; }
.ramzinex-navigation :deep(.project-navigation--single :is(.previous-project, .next-project)) { min-height: 8.5rem; border: 0; box-shadow: 0 1.4rem 4rem -2rem rgb(0 0 0 / 35%); }
.case-main > .ramzinex-section { width: 100vw; max-width: none; margin-inline: calc(50% - 50vw); padding: clamp(2.75rem, 4vw, 4.5rem) max(1.25rem, calc((100vw - 76rem) / 2)); border-radius: 0; }
.case-main > .ramzinex-campaign { padding-block: clamp(2rem, 3vw, 3rem); }
.case-main > .ramzinex-evidence { overflow: hidden; padding-block: clamp(2rem, 3vw, 3rem); background: radial-gradient(circle at 14% 8%, color-mix(in srgb, var(--ramzinex-yellow) 10%, transparent), transparent 26rem), linear-gradient(155deg, color-mix(in srgb, var(--portfolio-surface) 42%, var(--portfolio-bg)), var(--portfolio-bg)); }
.ramzinex-evidence::before { position: absolute; z-index: -1; inset: 0; background-image: linear-gradient(color-mix(in srgb, var(--ramzinex-accent) 7%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--ramzinex-accent) 7%, transparent) 1px, transparent 1px); background-size: 4.5rem 4.5rem; content: ''; opacity: .55; pointer-events: none; mask-image: linear-gradient(to bottom, #000, transparent 72%); }
.ramzinex-evidence::after { position: absolute; z-index: -1; inset: auto 12% -8rem; height: 16rem; border-radius: 50%; background: color-mix(in srgb, var(--ramzinex-yellow) 8%, transparent); content: ''; filter: blur(5rem); pointer-events: none; }
.ramzinex-evidence .ramzinex-heading { max-width: 76rem; }
.ramzinex-evidence .ramzinex-heading h2 { max-width: none; white-space: nowrap; }
.ramzinex-evidence .ramzinex-heading--split .ramzinex-lead { margin-top: .9rem; }
.case-main > .ramzinex-content-section { padding-block: clamp(2rem, 3vw, 3rem); }
.ramzinex-content-section .ramzinex-heading { max-width: 76rem; }
.ramzinex-content-section .ramzinex-heading--split .ramzinex-lead { max-width: none; margin-top: .9rem; white-space: nowrap; }
#ramzinex-section-6 .ramzinex-heading { max-width: 76rem; }
#ramzinex-section-6 .ramzinex-heading h2 { max-width: none; white-space: nowrap; }
.case-main > .ramzinex-system { padding-block: clamp(2rem, 3vw, 3rem); }
.ramzinex-system .ramzinex-heading { max-width: 76rem; }
.ramzinex-system .ramzinex-heading h2 { max-width: none; white-space: nowrap; }
.case-main > .ramzinex-validation { padding-block: clamp(2rem, 3vw, 3rem); }
.ramzinex-validation .ramzinex-heading { max-width: 76rem; }
@media (max-width: 900px) {
  .ramzinex-meta, .ramzinex-scope-grid, .ramzinex-rules, .ramzinex-validation__grid { grid-template-columns: repeat(2, 1fr); }
  .ramzinex-overview .ramzinex-overview__heading { gap: 0; }
  .ramzinex-overview .ramzinex-overview__heading .ramzinex-lead { max-width: 46rem; margin-top: 1.15rem; }
  .ramzinex-overview .ramzinex-scope-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .ramzinex-overview .ramzinex-scope-grid article:nth-child(n) { grid-column: auto; }
  .ramzinex-overview .ramzinex-scope-grid article + article { border-inline-start: 0; }
  .ramzinex-overview .ramzinex-scope-grid article:nth-child(even) { border-inline-start: 1px solid color-mix(in srgb, var(--ramzinex-accent) 12%, var(--portfolio-line)); }
  .ramzinex-overview .ramzinex-scope-grid article:nth-child(n+3) { border-top: 1px solid color-mix(in srgb, var(--ramzinex-accent) 12%, var(--portfolio-line)); }
  .ramzinex-ux-model { grid-template-columns: 1fr; }
  .ramzinex-meta > div:nth-child(3) { border-inline-start: 0; }
  .ramzinex-meta > div:nth-child(n+3) { border-top: 1px solid var(--portfolio-line); }
  .ramzinex-heading--split, .ramzinex-logic, .ramzinex-campaign { grid-template-columns: 1fr; gap: 2rem; }
  .ramzinex-type-system { grid-template-columns: 1fr; }
  .ramzinex-logic > .ramzinex-heading, .ramzinex-ux-model, .ramzinex-logic__flow { grid-column: 1; grid-row: auto; }
  .ramzinex-heading--split .ramzinex-lead { margin-top: 0; }
  .ramzinex-content-section .ramzinex-heading--split .ramzinex-lead { margin-top: .8rem; white-space: normal; }
  .ramzinex-campaign__copy { position: static; }
  .ramzinex-campaign__copy h2 { white-space: normal; }
  .ramzinex-campaign__showcase { height: clamp(21rem, 54vw, 28rem); grid-template-columns: minmax(0, 1fr) clamp(8.5rem, 22vw, 11.5rem); }
  #ramzinex-section-6 .ramzinex-heading h2 { white-space: normal; }
  .ramzinex-system .ramzinex-heading h2 { white-space: normal; }
  .ramzinex-content-cards { grid-template-columns: 1fr; }
  .ramzinex-content-cards article { min-height: 0; }
  .ramzinex-gallery { grid-template-columns: 1fr 1fr .42fr; }
}

@media (max-width: 640px) {
  .ramzinex-hero { padding-top: 7.25rem; }
  .ramzinex-hero h1 { font-size: clamp(2.55rem, 13vw, 3.6rem); }
  .ramzinex-hero__summary { font-size: .95rem; }
  .ramzinex-draft { align-items: flex-start; font-size: .66rem; line-height: 1.7; text-align: start; }
  .ramzinex-hero__media { height: 30rem; margin-top: 2.5rem; border-radius: 1.1rem; }
  .ramzinex-hero__media img { object-fit: cover; object-position: top; }
  .ramzinex-meta { grid-template-columns: 1fr 1fr; }
  .ramzinex-meta > div { padding: 1rem .5rem; }
  .ramzinex-meta dd { font-size: .72rem; }
  .ramzinex-outline { top: 0; }
  .ramzinex-outline a { min-height: 3.5rem; padding-inline: .7rem; font-size: .67rem; }
  .ramzinex-heading h2, .ramzinex-campaign__copy h2 { font-size: clamp(2.2rem, 10vw, 3rem); }
  .ramzinex-scope-grid, .ramzinex-rules, .ramzinex-validation__grid { grid-template-columns: 1fr; }
  .ramzinex-overview .ramzinex-scope-grid { grid-template-columns: 1fr; }
  .ramzinex-overview .ramzinex-scope-grid article:nth-child(n) { border-inline-start: 0; }
  .ramzinex-overview .ramzinex-scope-grid article + article { border-top: 1px solid color-mix(in srgb, var(--ramzinex-accent) 12%, var(--portfolio-line)); }
  .ramzinex-scope-grid article, .ramzinex-rules article { min-height: 0; }
  .ramzinex-scope-grid h3, .ramzinex-rules h3 { margin-top: 2rem; }
  .ramzinex-logic__flow li { grid-template-columns: 2rem minmax(0, 1fr); gap: .75rem; padding-block: 1.25rem; }
  .ramzinex-ux-model__group { padding-inline: 0; }
  .ramzinex-ux-model__group + .ramzinex-ux-model__group { margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid color-mix(in srgb, var(--ramzinex-accent) 16%, var(--portfolio-line)); border-inline-start: 0; }
  .ramzinex-ux-model article { grid-template-columns: 2rem minmax(0, 1fr); gap: .65rem; padding-block: .85rem; }
  .ramzinex-logic__flow { gap: .45rem; }
  .ramzinex-logic__flow li { padding: .9rem; }
  .ramzinex-logic__flow p { grid-column: 1 / -1; }
  .ramzinex-tabs { display: flex; overflow-x: auto; scrollbar-width: none; }
  .ramzinex-tabs button { min-width: 8.5rem; }
  .ramzinex-device-stage { grid-template-columns: minmax(0, 1fr) 6.25rem; gap: .65rem; }
  .ramzinex-shot--desktop, .ramzinex-shot--mobile { height: 23rem; border-radius: .8rem; }
  .ramzinex-shot__bar { height: 2.75rem; padding-inline: .65rem; }
  .ramzinex-shot__bar i { display: none; }
  .ramzinex-shot--mobile .ramzinex-shot__bar b { font-size: 0; }
  .ramzinex-shot--mobile .ramzinex-shot__bar b::after { font-size: .62rem; content: 'M'; }
  .ramzinex-shot__fade { height: 5rem; padding: .75rem; font-size: .6rem; }
  .ramzinex-gallery { grid-template-columns: repeat(3, minmax(15rem, 78vw)); overflow-x: auto; padding-bottom: .5rem; scroll-snap-type: inline mandatory; scrollbar-width: none; }
  .ramzinex-gallery::-webkit-scrollbar { display: none; }
  .ramzinex-gallery button { height: 18rem; scroll-snap-align: start; }
  .ramzinex-campaign__showcase { height: 22rem; grid-template-columns: minmax(0, 1fr) 7.75rem; gap: .55rem; }
  .ramzinex-campaign__screen { height: 100%; border-radius: .85rem; }
  .ramzinex-campaign__screen--desktop { height: 84%; }
  .ramzinex-campaign__screen--mobile { border-radius: 1rem; }
  .ramzinex-campaign__screen > span { inset: auto .4rem .4rem; padding: .5rem .55rem; }
  .ramzinex-campaign__screen > span small { display: none; }
  .ramzinex-palettes { grid-template-columns: 1fr; }
  .ramzinex-color-card { min-height: 7rem; }
  .ramzinex-type-system__specimen { height: 13rem; }
  .ramzinex-validation__grid article { min-height: 0; }
  .ramzinex-validation__grid h3 { margin-top: 1.25rem; }
  .ramzinex-dialog { width: 100vw; max-width: 100vw; height: 100dvh; max-height: 100dvh; border-radius: 0; }
}

@media (max-width: 767px) {
  .ramzinex-case :deep(.case-hero) { width: 100%; max-width: none; padding: 5rem 0 1.5rem; }
  .ramzinex-case :deep(.case-hero__surface--with-media) { display: block; padding: 0; overflow: visible; border-radius: 0; background: transparent; box-shadow: none; }
  .ramzinex-case :deep(.case-hero__media) { width: 100%; aspect-ratio: 16 / 9; border-radius: 0; box-shadow: none; }
  .ramzinex-case :deep(.case-hero__media img) { width: 100%; height: 100%; border-radius: 0; object-fit: cover; }
  .ramzinex-case :deep(.case-hero__surface--with-media .case-hero__copy) { align-items: flex-start; padding: 1.15rem 1.25rem .9rem; text-align: start; }
  .ramzinex-case :deep(.case-hero__title) { width: 100%; max-width: none; margin: 0; font-size: clamp(1.2rem, 6.2vw, 1.45rem); line-height: 1.55; text-align: start; white-space: pre; }
  .ramzinex-case :deep(.case-hero__summary) { display: -webkit-box; max-width: 30rem; margin-top: .55rem; overflow: hidden; color: var(--portfolio-muted); font-size: .8rem; font-weight: 560; line-height: 1.75; white-space: normal; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
  .ramzinex-case :deep(.case-hero__surface--with-media .case-hero__meta) { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0; margin: 0 1.25rem; overflow: hidden; border-block: 1px solid var(--portfolio-line); }
  .ramzinex-case :deep(.case-hero__surface--with-media .case-hero__meta > div),
  .ramzinex-case :deep(.case-hero__surface--with-media .case-hero__meta > div + div),
  .ramzinex-case :deep(.case-hero__surface--with-media .case-hero__meta > div:nth-child(3)),
  .ramzinex-case :deep(.case-hero__surface--with-media .case-hero__meta > div:nth-child(n+3)) { min-height: 4rem; align-items: flex-start; padding: .65rem .55rem; border: 0; border-radius: 0; background: transparent; text-align: start; }
  .ramzinex-case :deep(.case-hero__surface--with-media .case-hero__meta > div:nth-child(even)) { border-inline-start: 1px solid var(--portfolio-line); }
  .ramzinex-case :deep(.case-hero__surface--with-media .case-hero__meta > div:nth-child(n+3)) { border-top: 1px solid var(--portfolio-line); }
  .ramzinex-case :deep(.case-hero__surface--with-media .case-hero__meta dt) { color: var(--ramzinex-accent); font-size: .62rem; line-height: 1.4; }
  .ramzinex-case :deep(.case-hero__surface--with-media .case-hero__meta dd) { margin-top: .25rem; font-size: .68rem; font-weight: 620; line-height: 1.5; -webkit-line-clamp: 2; }
  .ramzinex-hero-poster { display: none; }
  .case-shell { padding-top: 0 !important; }
  .case-outline { top: 4.25rem; margin-bottom: 0; }
  .case-outline > p { display: none; }
  .case-outline a, .case-outline > ol { min-height: 3.8rem; }
  .case-outline a { padding-inline: .75rem; font-size: .7rem; }
  .case-section { margin-top: 0; }
  .case-main > .ramzinex-section { padding: 2.25rem 1rem; }
  .ramzinex-overview, .ramzinex-section--dark, .ramzinex-content-section, .ramzinex-system { padding: 1.5rem 1rem; border-radius: 1.25rem; }
  .ramzinex-overview { padding: 1.5rem 1.25rem 1.25rem; border-radius: 0; background: var(--portfolio-bg); box-shadow: none; }
  .ramzinex-overview::after { display: none; }
  .ramzinex-overview .ramzinex-overview__heading { align-items: center; text-align: center; }
  .ramzinex-overview .ramzinex-overview__heading > div { width: 100%; }
  .ramzinex-overview .ramzinex-overview__heading > div > p:first-child { min-height: 0; padding: 0; border-radius: 0; background: transparent; font-size: .66rem; }
  .ramzinex-overview .ramzinex-overview__heading h2 { margin-top: .45rem; font-size: clamp(1.55rem, 7.5vw, 1.9rem); line-height: 1.45; text-align: center; white-space: normal; }
  .ramzinex-overview .ramzinex-overview__heading .ramzinex-heading__line { width: 2rem; margin: .75rem auto 0; }
  .ramzinex-overview .ramzinex-overview__heading .ramzinex-lead { display: -webkit-box; margin: .75rem auto 0; overflow: hidden; font-size: .8rem; line-height: 1.75; text-align: center; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
  .ramzinex-overview .ramzinex-overview__heading .ramzinex-lead, .ramzinex-logic > .ramzinex-heading h2 { white-space: normal; }
  .ramzinex-overview .ramzinex-scope-grid { display: block; margin-top: 1.25rem; overflow: visible; border-block: 1px solid var(--portfolio-line); border-radius: 0; background: transparent; box-shadow: none; }
  .ramzinex-overview .ramzinex-scope-grid article,
  .ramzinex-overview .ramzinex-scope-grid article:nth-child(n) { display: grid; min-height: 0; grid-template-columns: 2rem minmax(0, 1fr); align-items: start; gap: 0 .65rem; padding: .75rem 0; border: 0; border-radius: 0; background: transparent; }
  .ramzinex-overview .ramzinex-scope-grid article + article { border-top: 1px solid var(--portfolio-line); }
  .ramzinex-overview .ramzinex-scope-grid span { width: 2rem; height: 2rem; border-radius: .55rem; font-size: .64rem; }
  .ramzinex-overview .ramzinex-scope-grid h3 { align-self: center; max-width: none; margin: 0; font-size: .94rem; line-height: 1.5; }
  .ramzinex-overview .ramzinex-scope-grid p { display: -webkit-box; grid-column: 2; margin-top: .2rem; overflow: hidden; font-size: .72rem; line-height: 1.65; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
  .ramzinex-heading h2, .ramzinex-campaign__copy h2 { max-width: none; font-size: clamp(1.8rem, 8vw, 2.6rem); }
  .ramzinex-evidence .ramzinex-heading h2 { white-space: normal; }
  .ramzinex-scope-grid, .ramzinex-content-cards, .ramzinex-rules, .ramzinex-validation__grid { margin-top: 2.5rem; }
  .ramzinex-ux-model, .ramzinex-logic__flow { grid-template-columns: 1fr; }
  .ramzinex-logic__flow { margin-top: 2rem; }
  .ramzinex-logic__flow li { min-height: 0; }
  .ramzinex-logic__flow li + li { border-inline-start: 0; border-top: 1px solid color-mix(in srgb, var(--ramzinex-yellow) 18%, var(--portfolio-line)); }

  #ramzinex-section-2 { padding-block: 1.5rem; border-radius: 0; }
  #ramzinex-section-2 .ramzinex-heading h2 { font-size: clamp(1.55rem, 7vw, 1.85rem); line-height: 1.45; }
  #ramzinex-section-2 .ramzinex-heading__line { display: none; }
  #ramzinex-section-2 .ramzinex-lead { display: -webkit-box; margin-top: .65rem; overflow: hidden; font-size: .76rem; line-height: 1.65; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
  #ramzinex-section-2 .ramzinex-ux-model { margin-top: 1.15rem; }
  #ramzinex-section-2 .ramzinex-ux-model__group + .ramzinex-ux-model__group { margin-top: .85rem; padding-top: .85rem; }
  #ramzinex-section-2 .ramzinex-ux-model__label { margin-bottom: .15rem; font-size: .64rem; }
  #ramzinex-section-2 .ramzinex-ux-model article { grid-template-columns: 1.35rem minmax(0, 1fr); gap: .5rem; padding-block: .55rem; }
  #ramzinex-section-2 .ramzinex-ux-model__icon { width: 1.05rem; height: 1.05rem; }
  #ramzinex-section-2 .ramzinex-ux-model h3 { font-size: .8rem; line-height: 1.45; }
  #ramzinex-section-2 .ramzinex-ux-model article p { display: -webkit-box; margin-top: .15rem; overflow: hidden; font-size: .66rem; line-height: 1.55; -webkit-box-orient: vertical; -webkit-line-clamp: 1; }
  #ramzinex-section-2 .ramzinex-logic__flow { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 0; margin-top: 1.25rem; }
  #ramzinex-section-2 .ramzinex-logic__flow li { min-height: 4.5rem; grid-template-columns: 1.25rem minmax(0, 1fr); align-content: center; gap: .45rem; padding: .65rem .55rem; border: 0; border-radius: 0; background: transparent; }
  #ramzinex-section-2 .ramzinex-logic__flow li:nth-child(even) { border-inline-start: 1px solid var(--portfolio-line); }
  #ramzinex-section-2 .ramzinex-logic__flow li:nth-child(n + 3) { border-top: 1px solid var(--portfolio-line); }
  #ramzinex-section-2 .ramzinex-logic__number { inset-block-start: .3rem; inset-inline-end: .35rem; font-size: .55rem; }
  #ramzinex-section-2 .ramzinex-logic__icon { width: 1rem; height: 1rem; }
  #ramzinex-section-2 .ramzinex-logic__flow strong { font-size: .78rem; line-height: 1.45; }
  #ramzinex-section-2 .ramzinex-logic__flow p { display: none; }

  #ramzinex-section-3 { padding: 1.5rem 1rem; }
  #ramzinex-section-3 .ramzinex-heading h2 { font-size: clamp(1.55rem, 7vw, 1.85rem); line-height: 1.45; }
  #ramzinex-section-3 .ramzinex-heading__line { display: none; }
  #ramzinex-section-3 .ramzinex-lead { display: -webkit-box; margin-top: .65rem; overflow: hidden; font-size: .76rem; line-height: 1.65; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
  #ramzinex-section-3 .ramzinex-tabs { gap: 1.15rem; margin-top: 1rem; padding: 0 0 .25rem; border-radius: 0; background: transparent; box-shadow: inset 0 -1px var(--portfolio-line); backdrop-filter: none; }
  #ramzinex-section-3 .ramzinex-tabs button { min-width: max-content; min-height: 2.65rem; padding: 0 .1rem; border-radius: 0; background: transparent; box-shadow: inset 0 -2px transparent; font-size: .72rem; transform: none; }
  #ramzinex-section-3 .ramzinex-tabs button:hover { background: transparent; }
  #ramzinex-section-3 .ramzinex-tabs button.is-active { background: transparent; color: var(--portfolio-text); box-shadow: inset 0 -2px var(--ramzinex-accent); transform: none; }
  #ramzinex-section-3 .ramzinex-tabs button span { margin-inline-end: .35rem; font-size: .56rem; }
  #ramzinex-section-3 .ramzinex-tabs button.is-active span { color: var(--ramzinex-accent); opacity: 1; }
  #ramzinex-section-3 .ramzinex-device-stage { grid-template-columns: minmax(0, 1fr) 5rem; gap: .4rem; margin-top: .85rem; }
  #ramzinex-section-3 .ramzinex-shot--desktop,
  #ramzinex-section-3 .ramzinex-shot--mobile { height: 16rem; border-radius: .6rem; box-shadow: 0 .6rem 1.8rem rgb(0 0 0 / 8%); }
  #ramzinex-section-3 .ramzinex-shot__bar { height: 2.25rem; }
  #ramzinex-section-3 .ramzinex-shot__fade { height: 3.75rem; padding: .55rem; }

  #ramzinex-section-4 { padding: 1.5rem 1rem; border-radius: 0; }
  #ramzinex-section-4 .ramzinex-heading h2 { font-size: clamp(1.55rem, 7vw, 1.85rem); line-height: 1.45; }
  #ramzinex-section-4 .ramzinex-heading__line { display: none; }
  #ramzinex-section-4 .ramzinex-lead { display: -webkit-box; margin-top: .65rem; overflow: hidden; font-size: .76rem; line-height: 1.65; -webkit-box-orient: vertical; -webkit-line-clamp: 3; }
  #ramzinex-section-4 .ramzinex-content-cards { display: block; margin-top: 1.15rem; }
  #ramzinex-section-4 .ramzinex-content-cards article { display: grid; min-height: 0; grid-template-columns: 2rem minmax(0, 1fr); align-items: center; gap: 0 .65rem; padding: .75rem 0; border: 0; border-radius: 0; background: transparent; box-shadow: none; transform: none; }
  #ramzinex-section-4 .ramzinex-content-cards article + article { border-top: 1px solid var(--portfolio-line); }
  #ramzinex-section-4 .ramzinex-content-cards article::after { display: none; }
  #ramzinex-section-4 .ramzinex-content-cards span { width: 2rem; height: 2rem; border-radius: .55rem; }
  #ramzinex-section-4 .ramzinex-content-cards h3 { margin: 0; font-size: .9rem; line-height: 1.45; }
  #ramzinex-section-4 .ramzinex-content-cards p { display: -webkit-box; grid-column: 2; margin-top: .2rem; overflow: hidden; font-size: .68rem; line-height: 1.55; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
  #ramzinex-section-4 .ramzinex-gallery-label { margin-top: 1.25rem; font-size: .66rem; }
  #ramzinex-section-4 .ramzinex-gallery { grid-template-columns: repeat(3, minmax(13.5rem, 76vw)); gap: .55rem; margin-top: .65rem; }
  #ramzinex-section-4 .ramzinex-gallery button { height: 16rem; border-radius: .6rem; box-shadow: 0 .6rem 1.8rem rgb(0 0 0 / 8%); }

  #ramzinex-section-5 { padding: 1.5rem 1rem; background: var(--portfolio-bg); }
  #ramzinex-section-5::before,
  #ramzinex-section-5::after { display: none; }
  #ramzinex-section-5 .ramzinex-campaign__copy { text-align: start; }
  #ramzinex-section-5 .ramzinex-campaign__copy > p:first-child { min-height: 0; padding: 0; border-radius: 0; background: transparent; font-size: .64rem; }
  #ramzinex-section-5 .ramzinex-campaign__copy h2 { margin-top: .45rem; font-size: clamp(1.55rem, 7vw, 1.85rem); line-height: 1.5; text-align: start; }
  #ramzinex-section-5 .ramzinex-campaign__copy > p:not(:first-child) { display: -webkit-box; margin-top: .55rem; overflow: hidden; font-size: .75rem; line-height: 1.65; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
  #ramzinex-section-5 .ramzinex-campaign__copy blockquote { margin-top: .8rem; padding: .65rem .75rem; border-radius: .6rem; font-size: .68rem; line-height: 1.6; }
  #ramzinex-section-5 .ramzinex-campaign__showcase { height: 15rem; grid-template-columns: minmax(0, 1fr) 5.25rem; gap: .4rem; margin-top: 1rem; }
  #ramzinex-section-5 .ramzinex-campaign__screen,
  #ramzinex-section-5 .ramzinex-campaign__screen--desktop,
  #ramzinex-section-5 .ramzinex-campaign__screen--mobile { height: 100%; border-radius: .6rem; box-shadow: 0 .6rem 1.8rem rgb(0 0 0 / 10%); }
  #ramzinex-section-5 .ramzinex-campaign__screen > span { inset: auto .35rem .35rem; min-height: 2.1rem; justify-content: center; padding: .4rem .5rem; border-radius: .45rem; }
  #ramzinex-section-5 .ramzinex-campaign__screen > span b { font-size: .6rem; }
  #ramzinex-section-5 .ramzinex-campaign__screen > span small { display: inline; margin-inline-start: .25rem; }
  #ramzinex-section-5 .ramzinex-campaign__screen--mobile { position: relative; isolation: isolate; overflow: hidden; border-radius: .65rem; background: #fff; }
  #ramzinex-section-5 .ramzinex-campaign__screen--mobile > span { inset: auto auto .45rem 50%; display: grid; width: 2.35rem; height: 2.35rem; min-height: 0; box-sizing: border-box; place-items: center; padding: 0; border-radius: 999px; background: rgb(17 19 23 / 94%); box-shadow: 0 .5rem 1.2rem rgb(0 0 0 / 24%); color: #fff; transform: translateX(-50%); }
  #ramzinex-section-5 .ramzinex-campaign__expand-icon { display: block; width: 1.1rem; height: 1.1rem; color: #fff !important; font-size: 1.1rem; opacity: 1; }
  #ramzinex-section-5 .ramzinex-campaign__expand-icon :deep(svg) { width: 100%; height: 100%; stroke: #fff; stroke-width: 2.25; }

  #ramzinex-section-6 { padding: 1.5rem 1rem; border-radius: 0; }
  #ramzinex-section-6::before { opacity: .18; background-size: 3rem 3rem, 6rem 6rem; }
  #ramzinex-section-6 .ramzinex-heading h2 { font-size: clamp(1.55rem, 7vw, 1.85rem); line-height: 1.45; }
  #ramzinex-section-6 .ramzinex-heading__line { display: none; }
  #ramzinex-section-6 .ramzinex-lead { display: block; margin-top: .65rem; overflow: visible; font-size: .75rem; line-height: 1.65; }
  #ramzinex-section-6 .ramzinex-rules { display: flex; gap: .55rem; margin-top: 1.15rem; overflow-x: auto; padding: 0 0 .55rem; scroll-padding-inline: .1rem; scroll-snap-type: inline mandatory; scrollbar-width: none; }
  #ramzinex-section-6 .ramzinex-rules::-webkit-scrollbar { display: none; }
  #ramzinex-section-6 .ramzinex-rules article { display: grid; min-width: min(15rem, 78vw); min-height: 8rem; flex: 0 0 min(15rem, 78vw); grid-template-columns: 1.75rem minmax(0, 1fr); align-content: center; align-items: center; gap: 0 .55rem; padding: .9rem; border: 0; border-radius: .8rem; background: linear-gradient(145deg, color-mix(in srgb, var(--portfolio-surface) 92%, transparent), color-mix(in srgb, var(--ramzinex-accent) 5%, var(--portfolio-surface))); box-shadow: 0 .75rem 1.8rem -1.25rem rgb(0 0 0 / 48%); scroll-snap-align: start; transform: none; }
  #ramzinex-section-6 .ramzinex-rules article:nth-child(even),
  #ramzinex-section-6 .ramzinex-rules article:nth-child(n + 3) { border: 0; }
  #ramzinex-section-6 .ramzinex-rules article::after { display: none; }
  #ramzinex-section-6 .ramzinex-rules span { width: 1.75rem; height: 1.75rem; border-radius: .5rem; font-size: .56rem; }
  #ramzinex-section-6 .ramzinex-rules h3 { margin: 0; font-size: .84rem; line-height: 1.5; }
  #ramzinex-section-6 .ramzinex-rules p { display: block; grid-column: 1 / -1; margin-top: .4rem; overflow: visible; font-size: .66rem; line-height: 1.6; }

  #ramzinex-section-7 { padding: 1.5rem 1rem; border-radius: 0; background: var(--portfolio-bg); }
  #ramzinex-section-7 .ramzinex-heading h2 { font-size: clamp(1.55rem, 7vw, 1.85rem); line-height: 1.45; }
  #ramzinex-section-7 .ramzinex-heading__line { display: none; }
  #ramzinex-section-7 .ramzinex-lead { display: -webkit-box; margin-top: .65rem; overflow: hidden; font-size: .75rem; line-height: 1.65; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
  #ramzinex-section-7 .ramzinex-palettes { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .45rem; margin-top: 1.1rem; }
  #ramzinex-section-7 .ramzinex-color-card { min-height: 5.5rem; padding: .75rem; border-radius: .65rem; box-shadow: none; }
  #ramzinex-section-7 .ramzinex-color-card p { font-size: .62rem; line-height: 1.45; }
  #ramzinex-section-7 .ramzinex-color-card strong { font-size: .9rem; }
  #ramzinex-section-7 .ramzinex-type-system { gap: .75rem; margin-top: 1rem; }
  #ramzinex-section-7 .ramzinex-type-system__copy { text-align: center; }
  #ramzinex-section-7 .ramzinex-type-system__copy > p:first-child { font-size: .6rem; }
  #ramzinex-section-7 .ramzinex-type-system__copy h3 { margin-top: .1rem; font-size: 2rem; }
  #ramzinex-section-7 .ramzinex-type-system__copy > p:nth-child(3) { display: -webkit-box; margin-top: .3rem; overflow: hidden; font-size: .67rem; line-height: 1.55; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
  #ramzinex-section-7 .ramzinex-type-system__copy ul { justify-content: center; margin-top: .55rem; }
  #ramzinex-section-7 .ramzinex-type-system__copy li { padding: .25rem .45rem; font-size: .52rem; }
  #ramzinex-section-7 .ramzinex-type-system__specimen { height: 8.5rem; border-radius: .6rem; box-shadow: 0 .6rem 1.8rem rgb(0 0 0 / 8%); }
  #ramzinex-section-7 .ramzinex-type-system__specimen span { bottom: .45rem; inset-inline-end: .45rem; padding: .4rem .55rem; font-size: .56rem; }

  #ramzinex-section-8 { padding: 1.5rem 1rem; }
  #ramzinex-section-8 .ramzinex-heading h2 { font-size: clamp(1.55rem, 7vw, 1.85rem); line-height: 1.45; }
  #ramzinex-section-8 .ramzinex-heading__line { display: none; }
  #ramzinex-section-8 .ramzinex-lead { display: -webkit-box; margin-top: .65rem; overflow: hidden; font-size: .75rem; line-height: 1.65; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
  #ramzinex-section-8 .ramzinex-validation__grid { display: flex; gap: .55rem; margin-top: 1.15rem; overflow-x: auto; padding: 0 0 .55rem; scroll-padding-inline: .1rem; scroll-snap-type: inline mandatory; scrollbar-width: none; }
  #ramzinex-section-8 .ramzinex-validation__grid::-webkit-scrollbar { display: none; }
  #ramzinex-section-8 .ramzinex-validation__grid article { position: relative; isolation: isolate; display: grid; min-width: min(15rem, 78vw); min-height: 8rem; flex: 0 0 min(15rem, 78vw); grid-template-columns: 1fr; align-content: center; gap: .35rem; overflow: hidden; padding: .9rem; border: 0; border-radius: .8rem; background: linear-gradient(150deg, color-mix(in srgb, var(--portfolio-surface) 94%, transparent), color-mix(in srgb, var(--ramzinex-accent) 6%, var(--portfolio-surface))); box-shadow: 0 .75rem 1.8rem -1.25rem rgb(0 0 0 / 45%); scroll-snap-align: start; transform: none; }
  #ramzinex-section-8 .ramzinex-validation__grid article:nth-child(even),
  #ramzinex-section-8 .ramzinex-validation__grid article:nth-child(n + 3) { border: 0; }
  #ramzinex-section-8 .ramzinex-validation__grid span { position: absolute; z-index: 0; inset-block-start: -.3rem; inset-inline-end: .55rem; display: block; width: auto; height: auto; border-radius: 0; background: transparent; color: var(--ramzinex-accent); font-size: 4rem; line-height: 1; letter-spacing: -.08em; opacity: .1; }
  #ramzinex-section-8 .ramzinex-validation__grid h3 { position: relative; z-index: 1; margin: 0; padding: 0; font-size: .84rem; line-height: 1.5; }
  #ramzinex-section-8 .ramzinex-validation__grid p { position: relative; z-index: 1; display: block; margin-top: .2rem; overflow: visible; font-size: .66rem; line-height: 1.6; }

  .ramzinex-navigation { margin-top: 3rem; padding-inline: 1rem; }
  .ramzinex-navigation :deep(.project-navigation) { overflow: visible; border-radius: 0; }
  .ramzinex-navigation :deep(.project-navigation--single :is(.previous-project, .next-project)) { width: 100%; min-height: 6.75rem; grid-template-columns: minmax(0, 1fr) 4.25rem; grid-template-rows: auto auto; column-gap: .65rem; padding: .85rem; border: 0; border-radius: .85rem; box-shadow: 0 1rem 2.5rem -1.4rem rgb(0 0 0 / 38%); }
  .ramzinex-navigation :deep(.project-navigation--single :is(.previous-project, .next-project) > .eyebrow) { align-self: end; margin: 0; font-size: .62rem; }
  .ramzinex-navigation :deep(.project-navigation--single .project-navigation__title) { display: -webkit-box; align-self: start; margin: .2rem 0 0; overflow: hidden; font-size: .95rem; line-height: 1.55; -webkit-box-orient: vertical; -webkit-line-clamp: 2; }
  .ramzinex-navigation :deep(.project-navigation__visual) { border: 0; border-radius: .7rem; background: color-mix(in srgb, var(--portfolio-accent) 8%, transparent); }
  .ramzinex-navigation :deep(.project-navigation__visual::before) { width: 3rem; height: 3rem; }
  .ramzinex-navigation :deep(.project-navigation__visual::after) { display: none; }
  .ramzinex-navigation :deep(.project-navigation__visual .directional-icon) { width: 1.35rem; height: 1.35rem; }
}

@media (prefers-reduced-motion: reduce) {
  .ramzinex-device-stage { animation: none; }
  .ramzinex-hero__media img { transition: none; }
  .ramzinex-hero__media:hover img { transform: none; }
}
</style>

<style>
html.dark .ramzinex-case .ramzinex-overview {
  background: linear-gradient(145deg, #1c1f21, #121416);
}

@media (max-width: 767px) {
  html.dark .ramzinex-case .ramzinex-overview { background: var(--portfolio-bg); }
  html.dark .ramzinex-case #ramzinex-section-4,
  html.dark .ramzinex-case #ramzinex-section-4 .ramzinex-content-cards article { background: transparent; }
}

html.dark .ramzinex-case .ramzinex-section--dark {
  background: linear-gradient(145deg, #26292c, #151719);
  color: #f8f9fa;
}

html.dark .ramzinex-case .ramzinex-content-section {
  background: #1c1f21;
}

html.dark .ramzinex-case .case-main > .ramzinex-section:nth-of-type(even) {
  background: #1c1f21;
}

html.dark .ramzinex-case .ramzinex-content-cards article,
html.dark .ramzinex-case .ramzinex-rules article {
  background: #26292c;
}

html.dark .ramzinex-case .ramzinex-system {
  background: linear-gradient(155deg, #202326, #111315);
}

html.dark .ramzinex-case .ramzinex-color-card--secondary {
  border: 1px solid rgb(248 249 250 / 13%);
  box-shadow: 0 1rem 3rem rgb(0 0 0 / 22%);
}

html.dark .ramzinex-case .case-main > .ramzinex-section.ramzinex-validation {
  background: transparent;
}

html.dark .ramzinex-case .ramzinex-validation__grid article {
  background: radial-gradient(circle at 10% 5%, rgb(255 136 61 / 13%), transparent 42%), linear-gradient(150deg, #292d31, #1f2225);
  box-shadow: 0 1.5rem 4rem -2rem rgb(0 0 0 / 58%);
}
</style>
