<script setup lang="ts">
import type { ProjectSummary } from '~/types/project'

withDefaults(defineProps<{
  project: ProjectSummary
  index: number
  eager?: boolean
  layout?: 'landscape' | 'portrait' | 'square' | 'cinematic'
  headingTag?: 'h2' | 'h3'
  hierarchy?: 'featured' | 'secondary' | 'visual'
  label?: string
  showRole?: boolean
}>(), {
  eager: false,
  layout: 'landscape',
  headingTag: 'h3',
  hierarchy: 'secondary',
  label: undefined,
  showRole: true
})

const { t } = useI18n()
const localePath = useLocalePath()
const directionIcon = computed(() => 'i-lucide-arrow-up-right')

function updatePointer(event: PointerEvent) {
  if (event.pointerType === 'touch') return
  const card = event.currentTarget as HTMLElement
  const bounds = card.getBoundingClientRect()
  const x = (event.clientX - bounds.left) / bounds.width
  const y = (event.clientY - bounds.top) / bounds.height
  card.style.setProperty('--pointer-x', `${x * 100}%`)
  card.style.setProperty('--pointer-y', `${y * 100}%`)
  card.style.setProperty('--tilt-x', `${(0.5 - y) * 1.4}deg`)
  card.style.setProperty('--tilt-y', `${(x - 0.5) * 1.4}deg`)
}

function resetPointer(event: PointerEvent) {
  const card = event.currentTarget as HTMLElement
  card.style.setProperty('--pointer-x', '50%')
  card.style.setProperty('--pointer-y', '50%')
  card.style.setProperty('--tilt-x', '0deg')
  card.style.setProperty('--tilt-y', '0deg')
}
</script>

<template>
  <article
    class="project-card group"
    :data-layout="layout"
    :data-hierarchy="hierarchy"
    @pointermove="updatePointer"
    @pointerleave="resetPointer"
  >
    <NuxtLink
      :to="localePath(project.path)"
      class="project-link block focus-visible:outline-offset-8"
    >
      <div class="project-media media-surface relative">
        <NuxtImg
          v-if="project.cover"
          :src="project.cover"
          :alt="project.coverAlt || ''"
          width="1600"
          height="1200"
          :loading="eager ? 'eager' : 'lazy'"
          :fetchpriority="eager ? 'high' : 'auto'"
          class="size-full object-cover"
        />
        <div
          v-else
          class="project-placeholder absolute inset-0"
          :data-tone="project.coverTone"
          role="img"
          :aria-label="t('project.coverPlaceholder', { title: project.title })"
        >
          <span class="project-placeholder-label eyebrow">{{ t('project.imagePlaceholder') }}</span>
          <span
            class="project-placeholder-number"
            aria-hidden="true"
          >{{ String(index + 1).padStart(2, '0') }}</span>
        </div>
        <div
          class="project-reveal"
          aria-hidden="true"
        >
          <span>{{ t('project.open') }}</span><UIcon
            :name="directionIcon"
            class="size-5"
          />
        </div>
        <div
          class="project-glow"
          aria-hidden="true"
        />
      </div>

      <div class="project-copy">
        <div class="project-copy__body">
          <component
            :is="headingTag"
            class="project-title"
          >{{ project.title }}</component>
          <AsciiGlitchText
            :text="project.description"
            as="p"
            class="project-description"
          />
          <AsciiGlitchText
            v-if="showRole"
            :text="project.role"
            class="project-role"
          />
        </div>
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped>
.project-card { --pointer-x: 50%; --pointer-y: 50%; --tilt-x: 0deg; --tilt-y: 0deg; }
.project-media { aspect-ratio: 4 / 3; isolation: isolate; box-shadow: var(--shadow-soft); transform: perspective(1100px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)); transition: transform var(--motion-content) var(--ease-enter), box-shadow var(--motion-content) var(--ease-standard); }
.project-card[data-layout='portrait'] .project-media { aspect-ratio: 4 / 5; }
.project-card[data-layout='square'] .project-media { aspect-ratio: 1; }
.project-card[data-layout='cinematic'] .project-media { aspect-ratio: 16 / 9; }
.project-media :deep(img), .project-placeholder { transition: transform var(--motion-cinematic) var(--ease-enter), filter var(--motion-content) var(--ease-standard); }
.project-placeholder { background: #a95d3b; }
.project-placeholder[data-tone='sage'] { background: #747f70; }
.project-placeholder[data-tone='cobalt'] { background: #53657c; }
.project-placeholder[data-tone='sand'] { background: #bda26e; }
.project-placeholder[data-tone='graphite'] { background: #555553; }
.project-placeholder-label { position: absolute; inset-block-start: 1.5rem; inset-inline-start: 1.5rem; color: rgb(0 0 0 / 58%); }
.project-placeholder-number { position: absolute; inset-inline-end: 1.25rem; inset-block-end: -.12em; color: rgb(0 0 0 / 11%); font-size: clamp(6rem, 13vw, 12rem); font-weight: 650; letter-spacing: -.08em; line-height: .8; }
.project-reveal { position: absolute; inset-inline-end: 1rem; inset-block-end: 1rem; z-index: 3; display: flex; align-items: center; gap: .6rem; padding: .85rem 1.05rem; border-radius: 999px; color: #fff; background: var(--portfolio-accent); box-shadow: 0 .75rem 2rem color-mix(in srgb, var(--portfolio-accent) 30%, transparent); font-size: .72rem; font-weight: 600; opacity: 0; transform: translateY(.7rem) scale(.96); transition: opacity var(--motion-control) var(--ease-standard), transform var(--motion-control) var(--ease-enter); }
.project-glow { position: absolute; inset: 0; z-index: 1; pointer-events: none; background: radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgb(255 255 255 / 18%), transparent 28%); opacity: 0; transition: opacity var(--motion-content) var(--ease-standard); }
[dir='rtl'] .project-reveal svg { transform: scaleX(-1); }
.project-copy { display: grid; grid-template-columns: minmax(0, 1fr); padding-top: 1.35rem; }
.project-copy__body { min-width: 0; }
.project-title { font-size: clamp(1.35rem, 2.3vw, 2rem); font-weight: 800; letter-spacing: -.038em; line-height: 1.15; transition: color var(--motion-control) var(--ease-standard), transform var(--motion-control) var(--ease-enter); }
.project-description { width: 100%; max-width: none; margin-top: .85rem; overflow: hidden; color: var(--portfolio-muted); font-size: clamp(1rem, 1vw, 1.08rem); line-height: 1.8; text-overflow: ellipsis; white-space: nowrap; }
.project-role { display: block; margin-top: .85rem; color: var(--portfolio-muted); font-size: .7rem; line-height: 1.5; }
.project-card[data-hierarchy='featured'] .project-title { font-size: clamp(1.8rem, 3.2vw, 3.15rem); }
.project-card:hover .project-media, .project-card:focus-within .project-media { box-shadow: var(--shadow-float); }
.project-card:hover .project-media :deep(img), .project-card:focus-within .project-media :deep(img), .project-card:hover .project-placeholder, .project-card:focus-within .project-placeholder { filter: saturate(1.06); transform: scale(1.055); }
.project-card:hover .project-reveal, .project-card:focus-within .project-reveal { opacity: 1; transform: none; }
.project-card:hover .project-glow, .project-card:focus-within .project-glow { opacity: 1; }
.project-card:hover .project-title, .project-card:focus-within .project-title { color: var(--portfolio-accent); transform: translateX(.2rem); }
[dir='rtl'] .project-card:hover .project-title, [dir='rtl'] .project-card:focus-within .project-title { transform: translateX(-.2rem); }
[lang='fa'] .project-title { font-weight: 900; letter-spacing: -.01em; line-height: 1.55; }
[lang='fa'] .project-copy__meta, [lang='fa'] .project-description, [lang='fa'] .project-role { line-height: 1.85; }
@media (max-width: 767px) {
  .project-card[data-layout] .project-media { aspect-ratio: 4 / 3; }
  .project-copy { grid-template-columns: 1fr; }
  .project-media { transform: none; }
  .project-reveal { opacity: 1; transform: none; }
  .project-role { display: none; }
}
@media (hover: none) { .project-media { transform: none; } .project-reveal { opacity: 1; transform: none; } .project-glow { display: none; } }
@media (prefers-reduced-motion: reduce) { .project-media, .project-media :deep(img), .project-placeholder, .project-reveal, .project-title { transition: none; } .project-card:hover .project-media, .project-card:focus-within .project-media, .project-card:hover .project-media :deep(img), .project-card:focus-within .project-media :deep(img), .project-card:hover .project-placeholder, .project-card:focus-within .project-placeholder, .project-card:hover .project-title, .project-card:focus-within .project-title { transform: none; } }
</style>
