<script setup lang="ts">
const props = defineProps<{ id?: string, index: string, title: string, description?: string }>()
const label = computed(() => props.index.replace(/^[0-9۰-۹]+\s*·\s*/, ''))
</script>

<template>
  <div class="section-heading">
    <AsciiGlitchText
      :text="label"
      as="p"
      class="section-heading__kicker"
    />
    <div class="section-heading__body">
      <h2
        :id="id"
        class="type-h2"
      >
        {{ title }}
      </h2>
      <p
        v-if="description"
        class="mt-6 max-w-xl text-[.95rem] leading-[1.8] text-muted"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.section-heading { display: flex; flex-direction: column; align-items: flex-start; }
.section-heading__kicker { color: var(--portfolio-accent); font-size: clamp(.9rem, 1vw, 1.05rem); font-weight: 800; }
.section-heading__body { width: 100%; }
.section-heading h2 { position: relative; max-width: 19ch; margin-top: .8rem; font-size: clamp(2.75rem, 4.5vw, 5rem); font-weight: 850; letter-spacing: -.05em; line-height: 1.08; text-wrap: balance; }
.section-heading h2::after { display: block; width: 3rem; height: 2px; margin-top: 1.35rem; background: var(--portfolio-accent); content: ''; }
[lang='fa'] .section-heading h2 { max-width: 18em; font-weight: 900; letter-spacing: -.012em; line-height: 1.22; }
</style>
