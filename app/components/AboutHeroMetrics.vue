<script setup lang="ts">
const darkMetrics = [
  { value: '+25%', x: '13.19%', y: '43.07%' },
  { value: '+30%', x: '21.53%', y: '57.72%' },
  { value: '-40%', x: '31.12%', y: '87.15%' },
  { value: '-50%', x: '44.93%', y: '67.53%' },
  { value: '+60%', x: '62.57%', y: '71.48%' },
  { value: '+35%', x: '75.87%', y: '41.83%' },
  { value: '+19%', x: '85.17%', y: '57.72%' }
]

const lightMetrics = [
  { value: '+25%', x: '8.06%', y: '24.80%' },
  { value: '+30%', x: '22.72%', y: '55.24%' },
  { value: '-40%', x: '29.93%', y: '72.60%' },
  { value: '-50%', x: '46.84%', y: '82.53%' },
  { value: '+60%', x: '56.37%', y: '69.90%' },
  { value: '+35%', x: '75.08%', y: '56.93%' },
  { value: '+19%', x: '89.40%', y: '65.39%' }
]
</script>

<template>
  <div
    class="about-hero-metrics"
    aria-hidden="true"
  >
    <div class="about-hero-metrics__canvas about-hero-metrics__canvas--light">
      <span
        v-for="metric in lightMetrics"
        :key="`light-${metric.value}-${metric.x}`"
        class="about-hero-metric"
        :style="{ '--metric-x': metric.x, '--metric-y': metric.y }"
        dir="ltr"
      >{{ metric.value }}</span>
    </div>
    <div class="about-hero-metrics__canvas about-hero-metrics__canvas--dark">
      <span
        v-for="metric in darkMetrics"
        :key="`${metric.value}-${metric.x}`"
        class="about-hero-metric"
        :style="{ '--metric-x': metric.x, '--metric-y': metric.y }"
        dir="ltr"
      >{{ metric.value }}</span>
    </div>
  </div>
</template>

<style scoped>
.about-hero-metrics {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  pointer-events: none;
}

.about-hero-metrics__canvas {
  position: absolute;
  top: 50%;
  left: 50%;
  width: max(100%, 200svh);
  aspect-ratio: 2 / 1;
  transform: translate(-50%, -50%);
}

.about-hero-metrics__canvas--dark { display: none; }
:global(.dark .about-hero-metrics__canvas--light) { display: none; }
:global(.dark .about-hero-metrics__canvas--dark) { display: block; }

.about-hero-metric {
  position: absolute;
  top: var(--metric-y);
  left: var(--metric-x);
  display: inline-flex;
  min-width: 3.65rem;
  align-items: center;
  justify-content: center;
  padding: .38rem .68rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--portfolio-bg) 76%, transparent);
  box-shadow: 0 .65rem 1.5rem rgb(27 20 14 / 12%);
  color: var(--portfolio-accent);
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: clamp(.72rem, .74vw, .86rem);
  font-variant-numeric: tabular-nums;
  font-weight: 750;
  letter-spacing: -.015em;
  line-height: 1;
  transform: translate(-50%, calc(-100% - .8rem));
  backdrop-filter: blur(.45rem);
  white-space: nowrap;
}

:global(.dark .about-hero-metric) {
  background: color-mix(in srgb, #0b0d10 76%, transparent);
  box-shadow: 0 .75rem 1.75rem rgb(0 0 0 / 28%);
}

@media (max-width: 767px) {
  .about-hero-metrics__canvas {
    top: auto;
    bottom: 0;
    transform: translateX(-50%);
  }

  .about-hero-metric {
    min-width: 3.1rem;
    padding: .34rem .54rem;
    font-size: .72rem;
    transform: translate(-50%, calc(-100% - .65rem));
  }
}
</style>
