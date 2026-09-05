<script setup lang="ts">
defineProps<{
  title: string
  summary: string
  meta: string[][]
}>()
</script>

<template>
  <header class="case-hero portfolio-container pb-14 pt-28 md:pb-20 md:pt-40">
    <div class="case-hero__surface">
      <div class="case-hero__copy">
        <h1 class="case-hero__title">
          {{ title }}
        </h1>
        <AsciiGlitchText
          :text="summary"
          as="p"
          class="case-hero__summary motion-rise"
        />
      </div>
      <dl class="case-hero__meta grid sm:grid-cols-2 lg:grid-cols-4">
        <div
          v-for="item in meta"
          :key="item[0]"
        >
          <dt class="eyebrow">
            {{ item[0] }}
          </dt><dd>{{ item[1] }}</dd>
        </div>
      </dl>
    </div>
  </header>
</template>

<style scoped>
.case-hero__surface { padding-block: clamp(2.5rem, 5vw, 5rem); border-block: 1px solid var(--portfolio-line); }
.case-hero__copy { display: flex; flex-direction: column; align-items: center; text-align: center; }
.case-hero__title { max-width: 100%; color: var(--portfolio-accent); font-family: var(--font-display); font-size: clamp(3.5rem, 7vw, 7rem); font-weight: 850; letter-spacing: -.06em; line-height: 1; white-space: nowrap; }
.case-hero__summary { width: 100%; max-width: 56rem; margin-top: clamp(1.25rem, 2.5vw, 2.25rem); color: var(--portfolio-muted); font-size: clamp(1.05rem, 1.25vw, 1.3rem); line-height: 1.85; }
.case-hero__meta { margin-top: clamp(2.25rem, 4vw, 4rem); overflow: hidden; border-block: 1px solid var(--portfolio-line); }
.case-hero__meta > div { display: flex; min-height: 7rem; flex-direction: column; align-items: center; justify-content: center; padding: 1.25rem; text-align: center; }
.case-hero__meta > div + div { border-inline-start: 1px solid var(--portfolio-line); }
.case-hero__meta dt { color: var(--portfolio-accent); font-size: clamp(.9rem, 1vw, 1.05rem); font-weight: 800; letter-spacing: .02em; }
.case-hero__meta dd { margin-top: .8rem; font-size: clamp(.9rem, 1vw, 1rem); font-weight: 650; line-height: 1.65; }
[lang='fa'] .case-hero__title { font-weight: 900; letter-spacing: -.012em; line-height: 1.2; }
@media (max-width: 1023px) { .case-hero__meta > div:nth-child(3) { border-inline-start: 0; } .case-hero__meta > div:nth-child(n+3) { border-top: 1px solid var(--portfolio-line); } }
@media (max-width: 639px) { .case-hero { padding-top: 7rem; } .case-hero__title { font-size: clamp(1.9rem, 9vw, 3rem); } .case-hero__meta { grid-template-columns: 1fr; } .case-hero__meta > div { min-height: auto; } .case-hero__meta > div + div { border-inline-start: 0; border-top: 1px solid var(--portfolio-line); } }
</style>
