<script setup lang="ts">
const { locale, t } = useI18n()
const { capabilityGroups, outcomes, profile } = usePortfolioContent()
const config = useRuntimeConfig()
const siteUrl = computed(() => String(config.public.siteUrl).replace(/\/$/, ''))
const aboutUrl = computed(() => `${siteUrl.value}/${locale.value}/about`)
const profileImage = computed(() => `${siteUrl.value}/images/amir-zare.png`)

useSeoMeta({
  title: () => t('about.seoTitle'),
  description: () => t('about.seoDescription'),
  ogTitle: () => t('about.seoTitle'),
  ogDescription: () => t('about.seoDescription'),
  twitterTitle: () => t('about.seoTitle'),
  twitterDescription: () => t('about.seoDescription')
})

useHead(() => ({
  script: [{
    key: 'profile-page-structured-data',
    type: 'application/ld+json',
    textContent: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      '@id': `${aboutUrl.value}#profile-page`,
      'url': aboutUrl.value,
      'name': t('about.seoTitle'),
      'description': t('about.seoDescription'),
      'inLanguage': locale.value === 'fa' ? 'fa-IR' : 'en',
      'isPartOf': { '@id': `${siteUrl.value}/#website` },
      'mainEntity': {
        '@type': 'Person',
        '@id': `${siteUrl.value}/#person`,
        'name': 'امیر زارع',
        'alternateName': 'Amir Zare',
        'url': `${siteUrl.value}/${locale.value}`,
        'image': profileImage.value,
        'jobTitle': locale.value === 'fa' ? 'طراح ارشد محصول و تجربه کاربری' : 'Senior Product and UX Designer',
        'description': t('about.seoDescription'),
        'sameAs': [profile.value.behance]
      }
    })
  }]
}))
</script>

<template>
  <div>
    <header class="about-hero portfolio-container">
      <div class="about-hero__surface">
        <div class="about-hero__meta">
          <AsciiGlitchText
            :text="t('about.label')"
            as="p"
            class="about-hero__label"
          />
          <div class="about-hero__identity-row">
            <AsciiGlitchText
              :text="`${profile.name} · ${profile.location}`"
              as="p"
              class="about-hero__identity"
            />
          </div>
        </div>
        <h1 class="about-hero__title motion-rise">
          {{ t('about.headline') }}
        </h1>
      </div>
    </header>

    <section class="about-intro-section about-section-boundary reveal-on-scroll section-divider py-[var(--portfolio-section)]">
      <div class="about-intro-layout portfolio-container">
        <div class="about-profile-visual">
          <NuxtImg
            src="/images/amir-zare.png"
            :alt="profile.name"
            width="600"
            height="600"
            loading="eager"
            class="about-profile-portrait"
          />
        </div>
        <div class="about-intro-copy">
          <p class="about-intro__lead">
            {{ profile.positioning }}
          </p>
          <AsciiGlitchText
            :text="profile.summary"
            as="p"
            class="about-intro__summary mt-8 text-[1.05rem] leading-[1.9] text-muted"
          />
          <dl class="profile-facts mt-12">
            <div>
              <dt class="profile-facts__label">
                <span class="profile-facts__icon"><UIcon
                  name="i-lucide-layers-3"
                  aria-hidden="true"
                /></span>
                <AsciiGlitchText
                  :text="t('about.currentFocus')"
                  as="span"
                  class="eyebrow"
                />
              </dt>
              <dd>{{ t('about.currentFocusValue') }}</dd>
            </div>
            <div>
              <dt class="profile-facts__label">
                <span class="profile-facts__icon"><UIcon
                  name="i-lucide-map-pinned"
                  aria-hidden="true"
                /></span>
                <AsciiGlitchText
                  :text="t('about.basedIn')"
                  as="span"
                  class="eyebrow"
                />
              </dt>
              <dd>{{ profile.location }}</dd>
            </div>
            <div>
              <dt class="profile-facts__label">
                <span class="profile-facts__icon"><UIcon
                  name="i-lucide-at-sign"
                  aria-hidden="true"
                /></span>
                <span class="eyebrow">{{ t('common.email') }}</span>
              </dt>
              <dd><a :href="`mailto:${profile.email}`"><span dir="ltr">{{ profile.email }}</span></a></dd>
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
.about-hero { width: 100%; max-width: none; margin-inline: 0; padding: 0; }
.about-hero__surface { position: relative; display: flex; min-height: 100vh; min-height: 100svh; align-items: center; justify-content: center; flex-direction: column; gap: clamp(1.1rem, 1.8vw, 1.65rem); padding: clamp(7.5rem, 10vw, 9rem) max(var(--portfolio-gutter), calc((100vw - var(--portfolio-container)) / 2 + var(--portfolio-gutter))) clamp(12rem, 26vh, 20rem); overflow: hidden; border-radius: 0; background-color: #fdf8f3; background-image: url('/images/about-topographic-light.png'); background-position: center; background-size: cover; box-shadow: 0 1.75rem 5rem rgb(49 34 20 / 8%); isolation: isolate; text-align: center; }
:global(.dark .about-hero__surface) { background-color: #0b0d10; background-image: url('/images/about-topographic-dark.png'); box-shadow: 0 2rem 5.5rem rgb(0 0 0 / 24%); }
.about-hero__surface::after { width: clamp(2.75rem, 4vw, 4rem); height: .2rem; margin-top: clamp(.25rem, .7vw, .65rem); border-radius: 999px; background: var(--portfolio-accent); content: ''; box-shadow: 0 0 1.75rem color-mix(in srgb, var(--portfolio-accent) 44%, transparent); }
.about-hero__meta { display: flex; width: 100%; align-items: center; justify-content: center; flex-direction: column; gap: .7rem; margin: 0; text-align: center; }
.about-hero__label { display: inline-flex; min-height: 2.3rem; align-items: center; justify-content: center; padding: .45rem .95rem; border-radius: 999px; background: color-mix(in srgb, var(--portfolio-accent) 14%, transparent); color: var(--portfolio-accent); font-size: clamp(.78rem, .9vw, .92rem); font-weight: 800; text-align: center; }
.about-hero__identity-row { display: flex; width: 100%; align-items: center; justify-content: center; color: var(--portfolio-muted); text-align: center; }
.about-hero__identity { width: 100%; font-size: clamp(.82rem, .95vw, 1rem); line-height: 1.7; text-align: center; }
.about-hero__title { width: min(100%, 18em); margin: .35rem auto 0; color: var(--portfolio-text); font-family: var(--font-display); font-size: clamp(3rem, 3.65vw, 4.45rem); font-weight: 760; letter-spacing: -.055em; line-height: 1.08; text-align: center; text-wrap: balance; }
[lang='fa'] .about-hero__title { width: min(100%, 18em); font-weight: 900; letter-spacing: -.012em; line-height: 1.22; }
[lang='en'] .about-hero__title { width: min(100%, 20em); }
.about-section-boundary::after { position: absolute; inset-inline: var(--portfolio-gutter); bottom: 0; height: 1px; background: linear-gradient(90deg, transparent, var(--portfolio-line) 10%, var(--portfolio-line) 90%, transparent); content: ''; }
.about-intro-section { position: relative; overflow: hidden; }
.about-intro-layout { display: grid; grid-template-columns: minmax(17rem, .72fr) minmax(0, 1.55fr); gap: clamp(3rem, 7vw, 7rem); align-items: center; }
.about-intro-copy { min-width: 0; }
.about-profile-visual { position: relative; width: min(100%, 22rem); height: clamp(24rem, 34vw, 32rem); align-self: center; justify-self: center; padding: .55rem; overflow: hidden; border-radius: 1.6rem; background: linear-gradient(165deg, color-mix(in srgb, var(--portfolio-accent) 28%, var(--portfolio-surface)), color-mix(in srgb, var(--portfolio-surface) 92%, transparent)); box-shadow: 0 2rem 5rem rgb(0 0 0 / 17%); }
.about-profile-visual::before { position: absolute; inset: 1.15rem; z-index: 1; border-radius: inherit; background: linear-gradient(180deg, transparent 55%, rgb(0 0 0 / 22%)); content: ''; pointer-events: none; }
.about-profile-visual::after { position: absolute; inset-inline-end: 1.25rem; bottom: 2.5rem; z-index: 2; width: .55rem; height: 4.5rem; border-radius: 999px; background: var(--portfolio-accent); box-shadow: 0 0 2rem color-mix(in srgb, var(--portfolio-accent) 44%, transparent); content: ''; }
.about-profile-portrait { width: 100%; height: 100%; border-radius: 1.15rem; object-fit: cover; object-position: center top; transition: transform var(--motion-cinematic) var(--ease-enter), filter var(--motion-content) var(--ease-standard); }
.about-profile-visual:hover .about-profile-portrait { filter: saturate(1.05); transform: scale(1.025); }
.about-intro__lead { width: 100%; font-family: var(--font-display); font-size: clamp(1.65rem, 1.9vw, 2.15rem); font-weight: 800; letter-spacing: -.035em; line-height: 1.4; text-wrap: balance; }
.about-intro__summary { width: 100%; max-width: none; }
[lang='fa'] .about-intro__lead { font-weight: 900; letter-spacing: -.01em; }
.profile-facts { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .8rem; }
.profile-facts > div { min-width: 0; min-height: 8.75rem; padding: 1.25rem; border-radius: 1.25rem; background: color-mix(in srgb, var(--portfolio-surface) 82%, transparent); box-shadow: 0 1rem 2.75rem rgb(0 0 0 / 8%); transition: background-color var(--motion-control), transform var(--motion-control) var(--ease-enter); }
.profile-facts > div:last-child { grid-column: 1 / -1; min-height: 6.5rem; }
.profile-facts > div:hover { background: color-mix(in srgb, var(--portfolio-accent) 8%, var(--portfolio-surface)); transform: translateY(-.2rem); }
.profile-facts__label { display: flex; align-items: center; gap: .7rem; }
.profile-facts__icon { display: grid; width: 2.35rem; flex: 0 0 auto; aspect-ratio: 1; place-items: center; border-radius: .8rem; background: color-mix(in srgb, var(--portfolio-accent) 12%, transparent); color: var(--portfolio-accent); }
.profile-facts__icon svg { width: 1rem; height: 1rem; }
.profile-facts dd { margin-top: 1rem; font-size: .9rem; font-weight: 650; line-height: 1.75; }
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
@media (max-width: 767px) {
  .about-hero {
    width: 100%;
    max-width: none;
    margin: 0;
    padding: 0;
  }
  .about-hero__surface {
    min-height: 100vh;
    min-height: 100svh;
    gap: .9rem;
    padding: 7rem 1.15rem clamp(8rem, 20vh, 11rem);
    border-radius: 0;
    background-position: center bottom;
    box-shadow: 0 1.25rem 3rem rgb(49 34 20 / 9%);
    text-align: center;
  }
  :global(.dark .about-hero__surface) { box-shadow: 0 1.5rem 3.5rem rgb(0 0 0 / 22%); }
  .about-hero__surface::after { width: 2.75rem; margin-top: .45rem; }
  .about-hero__meta { gap: .5rem; }
  .about-hero__label {
    min-height: 1.9rem;
    padding: .32rem .72rem;
    font-size: .78rem;
    line-height: 1;
  }
  .about-hero__identity { font-size: .82rem; line-height: 1.55; text-align: center; }
  .about-hero__title {
    width: min(100%, 22rem);
    margin: .5rem auto 0;
    font-size: clamp(1.9rem, 8.1vw, 2.15rem);
    line-height: 1.22;
    text-align: center;
  }
  [lang='fa'] .about-hero__title { width: min(100%, 22rem); line-height: 1.28; }
  [lang='en'] .about-hero__title { width: min(100%, 22rem); font-size: clamp(1.52rem, 6.55vw, 1.75rem); line-height: 1.2; }
  .about-intro-layout { grid-template-columns: 1fr; gap: 2.5rem; }
  .about-profile-visual { width: min(100%, 20rem); height: 24rem; }
  .outcome-grid { grid-template-columns: 1fr; }
  .outcome-grid > div { min-height: 6rem; }
}
@media (max-width: 479px) { .profile-facts { grid-template-columns: 1fr; } .profile-facts > div, .profile-facts > div:last-child { grid-column: auto; min-height: 7rem; } .outcome-grid { grid-template-columns: 1fr; } .outcome-grid > div { min-height: auto; border-inline-start: 0; } .capability-list > div { grid-template-columns: 1fr; gap: .65rem; } }
@media (prefers-reduced-motion: reduce) { .about-profile-portrait, .outcome-grid > div { transition: none; } .about-profile-visual:hover .about-profile-portrait, .outcome-grid > div:hover { transform: none; } }
</style>
