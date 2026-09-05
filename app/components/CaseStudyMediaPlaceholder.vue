<script setup lang="ts">
defineProps<{
  index: number
  asset: string
  ratio: string
  recommendation: string
  section: string
  caption?: string
  compact?: boolean
}>()
</script>

<template>
  <figure
    class="media-slot"
    :class="{ 'media-slot--compact': compact }"
  >
    <div
      class="media-slot__visual"
      :style="{ aspectRatio: ratio.replace(':', ' / ') }"
    >
      <div class="media-slot__number">
        {{ String(index).padStart(2, '0') }}
      </div>
      <UIcon
        name="i-lucide-image-plus"
        class="size-6"
        aria-hidden="true"
      />
      <div>
        <p class="media-slot__asset">
          {{ asset }}
        </p>
        <p class="media-slot__ratio">
          {{ ratio }}
        </p>
      </div>
    </div>
    <figcaption>
      <span>{{ section }}</span>
      <p>{{ recommendation }}</p>
      <small v-if="caption">{{ caption }}</small>
    </figcaption>
  </figure>
</template>

<style scoped>
.media-slot { min-width: 0; }
.media-slot__visual { position: relative; display: grid; place-content: center; gap: 1rem; min-height: 16rem; overflow: hidden; padding: 2rem; background: var(--portfolio-surface); color: var(--portfolio-muted); text-align: center; }
.media-slot__number { position: absolute; inset-block-start: 1.25rem; inset-inline-start: 1.25rem; font-size: 1.75rem; font-weight: 600; color: color-mix(in srgb, var(--portfolio-muted) 45%, transparent); letter-spacing: -.05em; }
.media-slot__asset { color: var(--portfolio-text); font-size: clamp(.95rem, 1vw, 1.05rem); font-weight: 750; letter-spacing: .06em; text-transform: uppercase; }
.media-slot__ratio { margin-top: .4rem; font-size: .85rem; }
figcaption { display: grid; gap: .65rem; padding-top: 1.25rem; }
figcaption span { color: var(--portfolio-accent); font-size: clamp(.95rem, 1vw, 1.05rem); font-weight: 800; letter-spacing: .08em; text-transform: uppercase; }
figcaption p { color: var(--portfolio-text); font-size: clamp(1.15rem, 1.35vw, 1.4rem); font-weight: 700; line-height: 1.65; }
figcaption small { color: var(--portfolio-muted); font-size: clamp(1rem, 1.1vw, 1.15rem); line-height: 1.7; }
.media-slot--compact .media-slot__visual { min-height: 11rem; }
[lang='fa'] .media-slot__asset, [lang='fa'] figcaption span { letter-spacing: .02em; text-transform: none; }
@media (max-width: 639px) { .media-slot__visual { min-height: 13rem; padding: 1.25rem; } }
</style>
