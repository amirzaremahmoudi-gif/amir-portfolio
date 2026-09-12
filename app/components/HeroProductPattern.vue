<script setup lang="ts">
const root = useTemplateRef<HTMLElement>('patternRoot')

let hero: HTMLElement | null = null
let pointerFrame = 0

function resetPointer() {
  root.value?.style.removeProperty('--lattice-x')
  root.value?.style.removeProperty('--lattice-y')
}

function handlePointerMove(event: PointerEvent) {
  if (!root.value || !hero || pointerFrame) return

  pointerFrame = window.requestAnimationFrame(() => {
    pointerFrame = 0
    if (!root.value || !hero) return

    const bounds = hero.getBoundingClientRect()
    const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width)) - 0.5
    const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height)) - 0.5
    root.value.style.setProperty('--lattice-x', `${x * 5}px`)
    root.value.style.setProperty('--lattice-y', `${y * 5}px`)
  })
}

onMounted(() => {
  hero = root.value?.parentElement || null
  const canTrackPointer = window.matchMedia('(min-width: 768px) and (pointer: fine)').matches
    && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (!hero || !canTrackPointer) return
  hero.addEventListener('pointermove', handlePointerMove, { passive: true })
  hero.addEventListener('pointerleave', resetPointer)
})

onBeforeUnmount(() => {
  if (pointerFrame) window.cancelAnimationFrame(pointerFrame)
  hero?.removeEventListener('pointermove', handlePointerMove)
  hero?.removeEventListener('pointerleave', resetPointer)
})
</script>

<template>
  <div
    ref="patternRoot"
    class="hero-product-pattern"
    aria-hidden="true"
  >
    <svg
      class="product-lattice"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      focusable="false"
    >
      <defs>
        <pattern
          id="product-lattice-unit"
          width="160"
          height="160"
          patternUnits="userSpaceOnUse"
        >
          <rect
            class="lattice-square"
            x=".5"
            y=".5"
            width="159"
            height="159"
          />
          <circle
            class="lattice-node"
            cx=".5"
            cy=".5"
            r="1.5"
          />
        </pattern>

        <pattern
          id="product-lattice-accent"
          width="640"
          height="640"
          patternUnits="userSpaceOnUse"
        >
          <circle
            class="lattice-accent-node"
            cx="240"
            cy="240"
            r="3"
          />
        </pattern>

        <path
          id="lattice-signal-a"
          d="M-80 742 C224 592 430 726 704 610 S1178 472 1680 184"
        />
        <path
          id="lattice-signal-b"
          d="M48 -60 C292 148 520 120 786 252 S1240 554 1660 732"
        />
        <path
          id="lattice-signal-c"
          d="M-80 432 C246 338 492 512 802 418 S1324 302 1680 402"
        />
      </defs>

      <g class="product-lattice__drift">
        <rect
          class="product-lattice__base"
          x="-128"
          y="-128"
          width="1856"
          height="1156"
          fill="url(#product-lattice-unit)"
        />
        <rect
          class="product-lattice__accent"
          x="-128"
          y="-128"
          width="1856"
          height="1156"
          fill="url(#product-lattice-accent)"
        />
      </g>

      <path
        class="lattice-signal-path"
        d="M-80 742 C224 592 430 726 704 610 S1178 472 1680 184"
      />

      <circle
        class="lattice-runner"
        r="2.8"
      >
        <animateMotion
          dur="10s"
          repeatCount="indefinite"
        >
          <mpath href="#lattice-signal-a" />
        </animateMotion>
      </circle>
      <circle
        class="lattice-runner lattice-runner--small"
        r="1.6"
      >
        <animateMotion
          begin="-5s"
          dur="10s"
          repeatCount="indefinite"
        >
          <mpath href="#lattice-signal-a" />
        </animateMotion>
      </circle>
      <circle
        class="lattice-runner lattice-runner--neutral"
        r="2.2"
      >
        <animateMotion
          begin="-4s"
          dur="12s"
          repeatCount="indefinite"
        >
          <mpath href="#lattice-signal-b" />
        </animateMotion>
      </circle>
      <circle
        class="lattice-runner lattice-runner--soft"
        r="1.8"
      >
        <animateMotion
          begin="-8s"
          dur="14s"
          repeatCount="indefinite"
        >
          <mpath href="#lattice-signal-c" />
        </animateMotion>
      </circle>
    </svg>
  </div>
</template>

<style scoped>
.hero-product-pattern {
  --lattice-line: color-mix(in srgb, var(--portfolio-text) 6%, transparent);
  --lattice-node: color-mix(in srgb, var(--portfolio-text) 20%, transparent);
  --lattice-accent: var(--portfolio-accent);
  --lattice-x: 0px;
  --lattice-y: 0px;
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
  user-select: none;
}

.product-lattice {
  position: absolute;
  inset: -1%;
  width: 102%;
  height: 102%;
  overflow: visible;
  transform: translate3d(var(--lattice-x), var(--lattice-y), 0);
  transition: transform 650ms var(--ease-standard);
  -webkit-mask-image: radial-gradient(ellipse 34% 29% at 50% 47%, rgb(0 0 0 / 4%) 0%, rgb(0 0 0 / 14%) 42%, rgb(0 0 0 / 70%) 72%, #000 100%);
  mask-image: radial-gradient(ellipse 34% 29% at 50% 47%, rgb(0 0 0 / 4%) 0%, rgb(0 0 0 / 14%) 42%, rgb(0 0 0 / 70%) 72%, #000 100%);
}

.product-lattice__drift { animation: lattice-drift 24s ease-in-out infinite alternate; }
.product-lattice__base { opacity: .52; }
.product-lattice__accent { opacity: .42; animation: lattice-accent-breathe 8s ease-in-out infinite; }
.lattice-square, .lattice-signal-path { fill: none; vector-effect: non-scaling-stroke; }
.lattice-square { stroke: var(--lattice-line); stroke-width: .75; }
.lattice-node { fill: var(--lattice-node); }
.lattice-accent-node { fill: var(--lattice-accent); opacity: .7; }
.lattice-signal-path { stroke: color-mix(in srgb, var(--portfolio-text) 10%, transparent); stroke-width: .75; stroke-dasharray: 3 13; animation: lattice-path-flow 10s linear infinite; }
.lattice-runner { fill: var(--lattice-accent); opacity: .72; }
.lattice-runner--small { opacity: .46; }
.lattice-runner--neutral { fill: color-mix(in srgb, var(--portfolio-text) 62%, transparent); opacity: .42; }
.lattice-runner--soft { opacity: .3; }

@keyframes lattice-drift {
  from { transform: translate3d(-8px, 5px, 0); }
  to { transform: translate3d(8px, -5px, 0); }
}

@keyframes lattice-accent-breathe {
  0%, 100% { opacity: .3; }
  50% { opacity: .58; }
}

@keyframes lattice-path-flow {
  to { stroke-dashoffset: -96; }
}

@media (max-width: 767px) {
  .product-lattice {
    inset: 0;
    width: 100%;
    height: 100%;
    transform: none;
    transition: none;
    -webkit-mask-image: radial-gradient(ellipse 58% 30% at 50% 44%, rgb(0 0 0 / 2%) 0%, rgb(0 0 0 / 10%) 46%, rgb(0 0 0 / 62%) 76%, #000 100%);
    mask-image: radial-gradient(ellipse 58% 30% at 50% 44%, rgb(0 0 0 / 2%) 0%, rgb(0 0 0 / 10%) 46%, rgb(0 0 0 / 62%) 76%, #000 100%);
  }

  .product-lattice__base { opacity: .44; }
  .product-lattice__accent { opacity: .42; }
  .product-lattice__drift { animation-duration: 28s; }
  .lattice-runner--soft { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .product-lattice__drift, .product-lattice__accent, .lattice-signal-path { animation: none; }
  .lattice-runner { display: none; }
  .product-lattice { transform: none; transition: none; }
}
</style>
