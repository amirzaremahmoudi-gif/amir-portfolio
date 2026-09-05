<script setup lang="ts">
const { t } = useI18n()
const { capabilityGroups, outcomes, profile } = usePortfolioContent()
useSeoMeta({ title: () => t('about.seoTitle'), description: () => t('about.seoDescription'), ogTitle: () => t('about.seoTitle'), ogDescription: () => t('about.seoDescription') })
</script>

<template>
  <div>
    <header class="about-hero portfolio-container">
      <div class="about-hero__meta">
        <AsciiGlitchText
          :text="t('about.label')"
          as="p"
          class="about-hero__label"
        />
        <AsciiGlitchText
          :text="`${profile.name} · ${profile.location}`"
          as="p"
          class="about-hero__identity"
        />
      </div>
      <h1 class="about-hero__title motion-rise">
        {{ t('about.headline') }}
      </h1>
    </header>

    <section class="about-section-boundary reveal-on-scroll section-divider py-[var(--portfolio-section)]">
      <div class="portfolio-container grid gap-12 lg:grid-cols-12">
        <div class="about-profile-visual lg:col-span-3">
          <NuxtImg
            src="/images/amir-zare.png"
            :alt="profile.name"
            width="600"
            height="600"
            loading="eager"
            class="about-profile-portrait"
          />
        </div>
        <div class="lg:col-span-8 lg:col-start-5">
          <p class="about-intro__lead">
            {{ profile.positioning }}
          </p>
          <AsciiGlitchText
            :text="profile.summary"
            as="p"
            class="about-intro__summary mt-8 text-[1.05rem] leading-[1.9] text-muted"
          />
          <dl class="profile-facts mt-12 grid sm:grid-cols-2">
            <div>
              <AsciiGlitchText
                :text="t('about.currentFocus')"
                as="dt"
                class="eyebrow"
              />
              <dd>{{ t('about.currentFocusValue') }}</dd>
            </div>
            <div>
              <AsciiGlitchText
                :text="t('about.basedIn')"
                as="dt"
                class="eyebrow"
              />
              <dd>{{ profile.location }}</dd>
            </div>
            <div>
              <dt class="eyebrow">
                {{ t('common.email') }}
              </dt><dd><a :href="`mailto:${profile.email}`"><span dir="ltr">{{ profile.email }}</span></a></dd>
            </div>
            <div>
              <dt class="eyebrow">
                {{ t('common.phone') }}
              </dt><dd><a :href="profile.phoneHref"><span dir="ltr">{{ profile.phone }}</span></a></dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <section class="about-section-boundary outcomes-section reveal-on-scroll section-divider">
      <div class="outcomes-layout portfolio-container">
        <header class="outcomes-heading">
          <h2 class="outcomes-heading__title">
            {{ t('about.outcomes') }}
          </h2>
          <AsciiGlitchText
            :text="t('about.outcomesNote')"
            as="p"
            class="outcomes-heading__note"
          />
        </header>
        <dl class="outcome-grid">
          <div
            v-for="item in outcomes"
            :key="`${item.value}-${item.label}`"
          >
            <dt>{{ item.value }}</dt>
            <dd class="outcome-label">
              {{ item.label }}
            </dd>
            <dd class="outcome-detail">
              {{ item.detail }}
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="about-section-boundary reveal-on-scroll section-divider py-[var(--portfolio-section)]">
      <div class="capabilities-section__layout portfolio-container">
        <h2 class="capabilities-section__title">
          {{ t('about.capabilities') }}
        </h2>
        <dl class="capability-list">
          <div
            v-for="item in capabilityGroups"
            :key="item.label"
          >
            <dt>{{ item.label }}</dt>
            <AsciiGlitchText
              :text="item.value"
              as="dd"
            />
          </div>
        </dl>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-hero { display: flex; flex-direction: column; align-items: flex-start; padding-top: clamp(7rem, 7.5vw, 7.75rem); padding-bottom: clamp(2.25rem, 3vw, 3rem); }
.about-hero__meta { display: flex; flex-direction: column; gap: .45rem; }
.about-hero__label { color: var(--portfolio-accent); font-size: clamp(.95rem, 1vw, 1.05rem); font-weight: 700; }
.about-hero__identity { color: var(--portfolio-muted); font-size: clamp(1rem, 1.15vw, 1.2rem); line-height: 1.7; }
.about-hero__title { width: 100%; max-width: 100%; margin-top: clamp(.8rem, 1.2vw, 1.15rem); font-family: var(--font-display); font-size: clamp(2.8rem, 4.2vw, 4.4rem); font-weight: 700; letter-spacing: -.05em; line-height: 1.08; text-wrap: balance; }
[lang='fa'] .about-hero__title { max-width: 15em; font-weight: 900; letter-spacing: -.012em; line-height: 1.2; }
.about-section-boundary::after { position: absolute; inset-inline: var(--portfolio-gutter); bottom: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--portfolio-line) 10%, var(--portfolio-line) 90%, transparent); content: ''; }
.about-profile-visual { position: relative; width: min(100%, 19rem); height: 20rem; align-self: center; justify-self: center; padding: .45rem; border: 1px solid color-mix(in srgb, var(--portfolio-accent) 52%, var(--portfolio-line)); border-radius: 1.25rem; background: color-mix(in srgb, var(--portfolio-surface) 86%, transparent); box-shadow: 0 1.25rem 3rem rgb(0 0 0 / 12%); }
.about-profile-visual::before { position: absolute; inset: -.5rem .75rem .75rem -.5rem; z-index: -1; border: 1px solid color-mix(in srgb, var(--portfolio-accent) 30%, transparent); border-radius: inherit; content: ''; }
.about-profile-visual::after { position: absolute; inset-inline-end: -.22rem; bottom: 2.25rem; width: .45rem; height: 3.25rem; border-radius: 999px; background: var(--portfolio-accent); content: ''; }
.about-profile-portrait { width: 100%; height: 100%; border-radius: .9rem; object-fit: cover; object-position: center top; transition: transform var(--motion-cinematic) var(--ease-enter), filter var(--motion-content) var(--ease-standard); }
.about-profile-visual:hover .about-profile-portrait { filter: saturate(1.05); transform: scale(1.025); }
.about-intro__lead { width: 100%; font-family: var(--font-display); font-size: clamp(1.65rem, 1.9vw, 2.15rem); font-weight: 800; letter-spacing: -.035em; line-height: 1.4; text-wrap: balance; }
.about-intro__summary { width: 100%; max-width: none; }
[lang='fa'] .about-intro__lead { font-weight: 900; letter-spacing: -.01em; }
.profile-facts { border-block: 1px solid var(--portfolio-line); }
.profile-facts > div { display: flex; min-height: 7.5rem; flex-direction: column; align-items: center; justify-content: center; padding: 1.5rem 1rem; text-align: center; }
.profile-facts > div:nth-child(even) { border-inline-start: 1px solid var(--portfolio-line); }
.profile-facts > div:nth-child(n+3) { border-top: 1px solid var(--portfolio-line); }
.profile-facts dd { margin-top: .8rem; font-size: .88rem; line-height: 1.7; }
.profile-facts a { text-decoration: underline; text-decoration-color: transparent; text-underline-offset: .3rem; transition: color var(--motion-control), text-decoration-color var(--motion-control); }
.profile-facts a:hover { color: var(--portfolio-accent); text-decoration-color: currentColor; }
.outcomes-section { padding-block: clamp(2.5rem, 4vw, 4rem); }
.outcomes-layout { display: flex; flex-direction: column; gap: clamp(1.5rem, 2.5vw, 2.5rem); }
.outcomes-heading { display: flex; flex-direction: column; align-items: flex-start; gap: .65rem; }
.outcomes-heading__title { font-family: var(--font-display); font-size: clamp(2rem, 2.8vw, 3rem); font-weight: 800; letter-spacing: -.04em; line-height: 1.15; }
.outcomes-heading__note { max-width: 52rem; color: var(--portfolio-muted); font-size: clamp(.88rem, .95vw, 1rem); line-height: 1.8; }
[lang='fa'] .outcomes-heading__title { font-weight: 900; letter-spacing: -.01em; }
.outcome-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .75rem; }
.outcome-grid > div { display: grid; min-width: 0; min-height: 6.5rem; grid-template-areas: 'value label' 'value detail'; grid-template-columns: minmax(6rem, .35fr) minmax(0, 1fr); align-items: center; column-gap: 1.25rem; padding: 1rem 1.25rem; border: 1px solid var(--portfolio-line); border-radius: .85rem; background: color-mix(in srgb, var(--portfolio-surface) 55%, transparent); }
.outcome-grid dt { grid-area: value; color: var(--portfolio-accent); font-size: clamp(2rem, 2.5vw, 3rem); font-weight: 700; letter-spacing: -.05em; line-height: 1; text-align: center; }
.outcome-label { align-self: end; grid-area: label; overflow: hidden; font-size: clamp(.88rem, .95vw, 1rem); font-weight: 750; line-height: 1.55; text-overflow: ellipsis; white-space: nowrap; }
.outcome-detail { align-self: start; grid-area: detail; margin-top: .25rem; color: var(--portfolio-muted); font-size: clamp(.7rem, .75vw, .78rem); line-height: 1.55; }
.capabilities-section__layout { display: flex; flex-direction: column; gap: clamp(1.75rem, 3vw, 3rem); }
.capabilities-section__title { font-family: var(--font-display); font-size: clamp(2.2rem, 3.2vw, 3.4rem); font-weight: 800; letter-spacing: -.04em; line-height: 1.15; }
[lang='fa'] .capabilities-section__title { font-weight: 900; letter-spacing: -.01em; }
.capability-list { width: 100%; border-block: 1px solid var(--portfolio-line); }
.capability-list > div { display: grid; grid-template-columns: minmax(12rem, .55fr) minmax(0, 1.45fr); gap: clamp(1.5rem, 3vw, 3rem); align-items: start; padding-block: clamp(1.25rem, 2vw, 1.75rem); border-top: 1px solid var(--portfolio-line); }
.capability-list > div:first-child { border-top: 0; }
.capability-list dt { font-size: clamp(1rem, 1.1vw, 1.15rem); font-weight: 750; }
.capability-list dd { color: var(--portfolio-muted); font-size: clamp(.95rem, 1vw, 1.05rem); line-height: 1.8; }
@media (max-width: 767px) { .about-hero { padding-top: 6.5rem; padding-bottom: 2.25rem; } .about-hero__title { max-width: 100%; font-size: clamp(2.45rem, 10vw, 3.3rem); } .about-profile-visual { width: min(100%, 22rem); height: 20rem; } .outcome-grid { grid-template-columns: 1fr; } .outcome-grid > div { min-height: 6rem; } }
@media (max-width: 479px) { .profile-facts { grid-template-columns: 1fr; } .profile-facts > div:nth-child(even) { padding-inline-start: 0; border-inline-start: 0; } .profile-facts > div + div { border-top: 1px solid var(--portfolio-line); } .outcome-grid { grid-template-columns: 1fr; } .outcome-grid > div { min-height: auto; border-inline-start: 0; } .capability-list > div { grid-template-columns: 1fr; gap: .65rem; } }
@media (prefers-reduced-motion: reduce) { .about-profile-portrait, .outcome-grid > div { transition: none; } .about-profile-visual:hover .about-profile-portrait, .outcome-grid > div:hover { transform: none; } }
</style>
