<script setup lang="ts">
const root = useTemplateRef<HTMLElement>('patternRoot')

let hero: HTMLElement | null = null
let pointerFrame = 0

function resetPointer() {
  root.value?.style.setProperty('--pointer-strength', '0')
}

function handlePointerMove(event: PointerEvent) {
  if (!root.value || !hero || pointerFrame) return

  pointerFrame = window.requestAnimationFrame(() => {
    pointerFrame = 0
    if (!root.value || !hero) return

    const bounds = hero.getBoundingClientRect()
    const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width))
    const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height))
    root.value.style.setProperty('--pointer-x', `${x * 100}%`)
    root.value.style.setProperty('--pointer-y', `${y * 100}%`)
    root.value.style.setProperty('--pointer-strength', '1')
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
          d="M-80 738 H238 V650 H478 V562 H720 V506"
        />
        <path
          id="lattice-signal-b"
          d="M1680 174 H1376 V258 H1122 V346 H880 V408"
        />
        <path
          id="lattice-signal-c"
          d="M-80 306 H160 V394 H394 V450 H626"
        />
        <path
          id="lattice-signal-d"
          d="M520 112 H720 V176 H916 V112 H1080"
        />
        <path
          id="lattice-signal-e"
          d="M1080 788 H912 V724 H716 V788 H520"
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
        <rect
          class="product-lattice__proximity"
          x="-128"
          y="-128"
          width="1856"
          height="1156"
          fill="url(#product-lattice-unit)"
        />
      </g>

      <path
        class="lattice-signal-path lattice-signal-path--primary"
        pathLength="1"
        d="M-80 738 H238 V650 H478 V562 H720 V506"
      />
      <path
        class="lattice-signal-path lattice-signal-path--secondary"
        pathLength="1"
        d="M1680 174 H1376 V258 H1122 V346 H880 V408"
      />
      <path
        class="lattice-signal-path lattice-signal-path--tertiary"
        pathLength="1"
        d="M-80 306 H160 V394 H394 V450 H626"
      />

      <g class="decision-nodes">
        <circle
          class="decision-node decision-node--1"
          cx="238"
          cy="650"
          r="3.8"
        />
        <circle
          class="decision-node decision-node--2"
          cx="478"
          cy="562"
          r="3.8"
        />
        <circle
          class="decision-node decision-node--3"
          cx="720"
          cy="506"
          r="4.8"
        />
        <circle
          class="decision-node decision-node--4"
          cx="1376"
          cy="258"
          r="3.8"
        />
        <circle
          class="decision-node decision-node--5"
          cx="1122"
          cy="346"
          r="3.8"
        />
        <circle
          class="decision-node decision-node--6"
          cx="880"
          cy="408"
          r="4.8"
        />
        <circle
          class="decision-node decision-node--7"
          cx="238"
          cy="738"
          r="3.4"
        />
        <circle
          class="decision-node decision-node--8"
          cx="478"
          cy="650"
          r="3.4"
        />
        <circle
          class="decision-node decision-node--9"
          cx="720"
          cy="562"
          r="3.4"
        />
        <circle
          class="decision-node decision-node--10"
          cx="1376"
          cy="174"
          r="3.4"
        />
        <circle
          class="decision-node decision-node--11"
          cx="1122"
          cy="258"
          r="3.4"
        />
        <circle
          class="decision-node decision-node--12"
          cx="880"
          cy="346"
          r="3.4"
        />
      </g>

      <circle
        class="lattice-runner"
        r="3.6"
      >
        <animateMotion
          begin="-2.1s"
          dur="13s"
          repeatCount="indefinite"
        >
          <mpath href="#lattice-signal-a" />
        </animateMotion>
      </circle>
      <circle
        class="lattice-runner lattice-runner--small"
        r="2.2"
      >
        <animateMotion
          begin="-8s"
          dur="13s"
          repeatCount="indefinite"
        >
          <mpath href="#lattice-signal-a" />
        </animateMotion>
      </circle>
      <circle
        class="lattice-runner lattice-runner--neutral"
        r="2.9"
      >
        <animateMotion
          begin="-5s"
          dur="13s"
          repeatCount="indefinite"
        >
          <mpath href="#lattice-signal-b" />
        </animateMotion>
      </circle>
      <circle
        class="lattice-runner lattice-runner--soft"
        r="2.3"
      >
        <animateMotion
          begin="-3s"
          dur="13s"
          repeatCount="indefinite"
        >
          <mpath href="#lattice-signal-c" />
        </animateMotion>
      </circle>
      <circle
        class="lattice-runner lattice-runner--medium"
        r="2.7"
      >
        <animateMotion
          begin="-9.4s"
          dur="13s"
          repeatCount="indefinite"
        >
          <mpath href="#lattice-signal-c" />
        </animateMotion>
      </circle>
      <circle
        class="lattice-runner lattice-runner--neutral lattice-runner--secondary"
        r="2.5"
      >
        <animateMotion
          begin="-10.6s"
          dur="13s"
          repeatCount="indefinite"
        >
          <mpath href="#lattice-signal-b" />
        </animateMotion>
      </circle>
      <circle
        class="lattice-runner lattice-runner--neutral lattice-runner--trail"
        r="2.4"
      >
        <animateMotion
          begin="-11.5s"
          dur="13s"
          repeatCount="indefinite"
        >
          <mpath href="#lattice-signal-a" />
        </animateMotion>
      </circle>
      <circle
        class="lattice-runner lattice-runner--edge"
        r="3.1"
      >
        <animateMotion
          begin="-1.3s"
          dur="13s"
          repeatCount="indefinite"
        >
          <mpath href="#lattice-signal-d" />
        </animateMotion>
      </circle>
      <circle
        class="lattice-runner lattice-runner--neutral lattice-runner--edge"
        r="2.6"
      >
        <animateMotion
          begin="-7.8s"
          dur="13s"
          repeatCount="indefinite"
        >
          <mpath href="#lattice-signal-d" />
        </animateMotion>
      </circle>
      <circle
        class="lattice-runner lattice-runner--edge"
        r="2.8"
      >
        <animateMotion
          begin="-4.6s"
          dur="13s"
          repeatCount="indefinite"
        >
          <mpath href="#lattice-signal-e" />
        </animateMotion>
      </circle>
      <circle
        class="lattice-runner lattice-runner--neutral lattice-runner--edge lattice-runner--edge-soft"
        r="2.5"
      >
        <animateMotion
          begin="-11.1s"
          dur="13s"
          repeatCount="indefinite"
        >
          <mpath href="#lattice-signal-e" />
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
  --pointer-x: 50%;
  --pointer-y: 50%;
  --pointer-strength: 0;
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
  -webkit-mask-image: radial-gradient(ellipse 34% 29% at 50% 47%, rgb(0 0 0 / 4%) 0%, rgb(0 0 0 / 14%) 42%, rgb(0 0 0 / 70%) 72%, #000 100%);
  mask-image: radial-gradient(ellipse 34% 29% at 50% 47%, rgb(0 0 0 / 4%) 0%, rgb(0 0 0 / 14%) 42%, rgb(0 0 0 / 70%) 72%, #000 100%);
}

.product-lattice__drift { animation: lattice-drift 21s ease-in-out infinite alternate; }
.product-lattice__base { opacity: .52; }
.product-lattice__accent { opacity: .34; animation: lattice-accent-breathe 8s ease-in-out infinite; }
.product-lattice__proximity { opacity: calc(var(--pointer-strength) * .5); transition: opacity 500ms var(--ease-standard); -webkit-mask-image: radial-gradient(circle 9rem at var(--pointer-x) var(--pointer-y), #000, transparent); mask-image: radial-gradient(circle 9rem at var(--pointer-x) var(--pointer-y), #000, transparent); }
.lattice-square, .lattice-signal-path { fill: none; vector-effect: non-scaling-stroke; }
.lattice-square { stroke: var(--lattice-line); stroke-width: .75; }
.lattice-node { fill: var(--lattice-node); }
.lattice-accent-node { fill: var(--lattice-accent); opacity: .7; }
.lattice-signal-path { stroke: color-mix(in srgb, var(--portfolio-text) 22%, transparent); stroke-width: .8; stroke-dasharray: .16 1; stroke-dashoffset: 1; opacity: 0; animation: decision-path 13s var(--ease-standard) infinite; }
.lattice-signal-path--secondary { animation-delay: -5s; }
.lattice-signal-path--tertiary { opacity: .45; animation-delay: -8s; }
.decision-node { fill: color-mix(in srgb, var(--portfolio-text) 55%, transparent); opacity: .16; transform-box: fill-box; transform-origin: center; animation: decision-node-pulse 13s var(--ease-standard) infinite; }
.decision-node--2, .decision-node--5 { animation-delay: 1.3s; }
.decision-node--3, .decision-node--6 { fill: var(--lattice-accent); animation-delay: 2.1s; }
.decision-node--4 { animation-delay: -5s; }
.decision-node--5 { animation-delay: -3.7s; }
.decision-node--6 { animation-delay: -2.9s; }
.decision-node--7, .decision-node--10 { animation-delay: -7.8s; }
.decision-node--8, .decision-node--11 { animation-delay: -6.5s; }
.decision-node--9, .decision-node--12 { animation-delay: -5.7s; }
.lattice-runner { fill: var(--lattice-accent); opacity: .72; }
.lattice-runner--small { opacity: .54; }
.lattice-runner--medium { opacity: .58; }
.lattice-runner--neutral { fill: color-mix(in srgb, var(--portfolio-text) 62%, transparent); opacity: .42; }
.lattice-runner--soft { opacity: .3; }
.lattice-runner--trail { opacity: .34; }
.lattice-runner--edge { opacity: .62; }
.lattice-runner--edge-soft { opacity: .4; }

@keyframes lattice-drift {
  from { transform: translate3d(-8px, 5px, 0); }
  to { transform: translate3d(8px, -5px, 0); }
}

@keyframes lattice-accent-breathe {
  0%, 100% { opacity: .3; }
  50% { opacity: .58; }
}

@keyframes decision-path {
  0%, 12%, 82%, 100% { stroke-dashoffset: 1; opacity: 0; }
  24% { opacity: .24; }
  58% { stroke-dashoffset: .12; opacity: .62; }
  72% { stroke-dashoffset: -.18; opacity: .18; }
}

@keyframes decision-node-pulse {
  0%, 16%, 50%, 100% { opacity: .14; transform: scale(1); }
  27% { opacity: .72; transform: scale(1.45); }
  36% { opacity: .28; transform: scale(1); }
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
  .product-lattice__proximity, .decision-node--4, .decision-node--5, .decision-node--6, .decision-node--10, .decision-node--11, .decision-node--12 { display: none; }
  .lattice-signal-path { stroke-width: 1; }
  .lattice-runner--soft, .lattice-runner--secondary { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .product-lattice__drift, .product-lattice__accent, .lattice-signal-path, .decision-node { animation: none; }
  .lattice-runner { display: none; }
  .product-lattice__proximity { display: none; }
}
</style>
