<script setup lang="ts">
const props = withDefaults(defineProps<{
  words: string[]
  interval?: number
}>(), {
  interval: 2800
})

const activeIndex = ref(0)
const activeWord = computed(() => props.words[activeIndex.value] || '')
const longestWord = computed(() => props.words.reduce((longest, word) => word.length > longest.length ? word : longest, ''))
let rotationTimer: number | undefined

onMounted(() => {
  if (props.words.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  rotationTimer = window.setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % props.words.length
  }, props.interval)
})

onBeforeUnmount(() => {
  if (rotationTimer) window.clearInterval(rotationTimer)
})
</script>

<template>
  <div
    class="morph-text"
    :aria-label="words.join('، ')"
  >
    <span
      class="morph-text__measure"
      aria-hidden="true"
    >{{ longestWord }}</span>
    <Transition name="morph-word">
      <span
        :key="activeWord"
        class="morph-text__word"
        aria-hidden="true"
      >{{ activeWord }}</span>
    </Transition>
  </div>
</template>

<style scoped>
.morph-text { position: relative; display: inline-grid; min-height: 1.65em; place-items: center; font-family: var(--font-display); font-size: clamp(1.5rem, 2.25vw, 2.3rem); font-weight: 700; line-height: 1.35; text-align: center; }
.morph-text__measure { grid-area: 1 / 1; visibility: hidden; white-space: nowrap; }
.morph-text__word { position: absolute; inset-inline: 0; grid-area: 1 / 1; text-align: center; white-space: nowrap; }
.morph-word-enter-active, .morph-word-leave-active { transition: opacity 680ms var(--ease-standard), filter 680ms var(--ease-standard), transform 680ms var(--ease-enter); }
.morph-word-enter-from { opacity: 0; filter: blur(14px); transform: scale(.92); }
.morph-word-leave-to { opacity: 0; filter: blur(14px); transform: scale(1.08); }
[lang='fa'] .morph-text { font-weight: 700; line-height: 1.55; }
@media (max-width: 767px) { .morph-text { width: 100%; min-height: 3em; font-size: clamp(1.25rem, 6vw, 1.65rem); } .morph-text__measure, .morph-text__word { white-space: normal; } }
@media (prefers-reduced-motion: reduce) { .morph-word-enter-active, .morph-word-leave-active { transition: none; } }
</style>
