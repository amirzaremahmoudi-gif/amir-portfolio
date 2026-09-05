<script setup lang="ts">
const props = withDefaults(defineProps<{
  text: string
  as?: string
  duration?: number
  spread?: number
  chars?: string
}>(), {
  as: 'span',
  duration: 760,
  spread: 1.15,
  chars: '.,·-─~+:;=*┐┌┘┴┬╗╔╝╚╬░▒▓█▄▀▌▐■!?&#$@۰۱۲۳۴۵۶۷۸۹'
})

const root = useTemplateRef<HTMLElement>('root')
const displayText = ref(props.text)
const waves: Array<{ start: number, time: number }> = []
let cursorPosition = 0
let animationFrame: number | undefined

const originalCharacters = computed(() => Array.from(props.text))
const glitchCharacters = computed(() => Array.from(props.chars))

watch(() => props.text, (text) => {
  displayText.value = text
})

function updateCursor(event: PointerEvent) {
  const element = root.value
  if (!element) return
  const bounds = element.getBoundingClientRect()
  const length = Math.max(originalCharacters.value.length, 1)
  const progress = Math.min(Math.max((event.clientX - bounds.left) / Math.max(bounds.width, 1), 0), 1)
  const visualPosition = Math.round(progress * (length - 1))
  cursorPosition = getComputedStyle(element).direction === 'rtl' ? length - 1 - visualPosition : visualPosition
}

function renderFrame(time: number) {
  const characters = originalCharacters.value
  const activeWaves = waves.filter(wave => time - wave.time < props.duration)
  waves.splice(0, waves.length, ...activeWaves)

  if (!activeWaves.length) {
    displayText.value = props.text
    animationFrame = undefined
    return
  }

  displayText.value = characters.map((character, index) => {
    if (/\s/u.test(character)) return character

    for (const wave of activeWaves) {
      const age = time - wave.time
      const progress = Math.min(age / props.duration, 1)
      const distance = Math.abs(index - wave.start)
      const maxDistance = Math.max(wave.start, characters.length - wave.start - 1)
      const radius = (progress * (maxDistance + 4)) / props.spread
      const intensity = radius - distance

      if (intensity > 0 && intensity <= 3) {
        const characterIndex = (distance * 3 + Math.floor(age / 42)) % glitchCharacters.value.length
        return glitchCharacters.value[characterIndex]
      }
    }

    return character
  }).join('')

  animationFrame = window.requestAnimationFrame(renderFrame)
}

function addWave(event: PointerEvent) {
  if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  updateCursor(event)
  waves.push({ start: cursorPosition, time: performance.now() })
  if (animationFrame === undefined) animationFrame = window.requestAnimationFrame(renderFrame)
}

function moveWave(event: PointerEvent) {
  const previousPosition = cursorPosition
  updateCursor(event)
  if (cursorPosition !== previousPosition) addWave(event)
}

onBeforeUnmount(() => {
  if (animationFrame !== undefined) window.cancelAnimationFrame(animationFrame)
})
</script>

<template>
  <component
    :is="as"
    ref="root"
    class="ascii-glitch-text"
    :aria-label="text"
    @pointerenter="addWave"
    @pointermove="moveWave"
  >
    <span
      class="ascii-glitch-text__stack"
      aria-hidden="true"
    >
      <span class="ascii-glitch-text__measure">{{ text }}</span>
      <span class="ascii-glitch-text__visual">{{ displayText }}</span>
    </span>
  </component>
</template>

<style scoped>
.ascii-glitch-text__stack { position: relative; display: inline-block; max-width: 100%; font: inherit; vertical-align: top; }
.ascii-glitch-text__measure { visibility: hidden; font: inherit; }
.ascii-glitch-text__visual { position: absolute; inset: 0; display: block; width: 100%; height: 100%; overflow: hidden; font: inherit; text-overflow: inherit; white-space: inherit; }
@media (hover: none), (prefers-reduced-motion: reduce) { .ascii-glitch-text { pointer-events: none; } }
</style>
