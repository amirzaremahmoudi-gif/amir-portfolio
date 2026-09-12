<script setup lang="ts">
defineProps<{ index: number, title: string, beforeLabel: string, afterLabel: string }>()
</script>

<template>
  <article class="before-after">
    <header class="before-after__heading">
      <span>{{ String(index).padStart(2, '0') }}</span><h3>{{ title }}</h3>
    </header>
    <div class="before-after__pair">
      <section><p>{{ beforeLabel }}</p><slot name="before" /></section>
      <section><p>{{ afterLabel }}</p><slot name="after" /></section>
    </div>
  </article>
</template>

<style scoped>
.before-after {
  position: relative;
  overflow: hidden;
  padding: clamp(1rem, 2vw, 1.5rem);
  border: 1px solid color-mix(in srgb, var(--portfolio-line) 82%, transparent);
  border-radius: clamp(1.15rem, 2vw, 1.6rem);
  background:
    radial-gradient(circle at 92% 0%, color-mix(in srgb, var(--portfolio-accent) 10%, transparent), transparent 28%),
    linear-gradient(145deg, color-mix(in srgb, var(--portfolio-surface) 94%, transparent), color-mix(in srgb, var(--portfolio-bg) 92%, transparent));
  box-shadow: 0 1.5rem 4rem rgb(0 0 0 / 10%), inset 0 1px rgb(255 255 255 / 4%);
  text-align: start;
}
.before-after::before {
  position: absolute;
  inset-block-start: 0;
  inset-inline: clamp(1.5rem, 4vw, 4rem);
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--portfolio-accent), transparent);
  content: '';
  opacity: .75;
}
.before-after + .before-after { margin-top: clamp(1.5rem, 3vw, 2.5rem); }
.before-after__heading {
  display: flex;
  align-items: center;
  gap: .9rem;
  margin-bottom: clamp(1rem, 1.6vw, 1.4rem);
  padding-inline: .25rem;
}
.before-after__heading::after { height: 1px; flex: 1; background: var(--portfolio-line); content: ''; }
.before-after__heading span {
  display: grid;
  width: 2.65rem;
  height: 2.65rem;
  flex: none;
  place-items: center;
  border: 1px solid color-mix(in srgb, var(--portfolio-accent) 32%, transparent);
  border-radius: .85rem;
  background: color-mix(in srgb, var(--portfolio-accent) 11%, var(--portfolio-bg));
  color: var(--portfolio-accent);
  font-size: .72rem;
  font-weight: 900;
  box-shadow: inset 0 1px rgb(255 255 255 / 8%);
}
.before-after__heading h3 { color: var(--portfolio-text); font-size: clamp(1.15rem, 1.4vw, 1.5rem); font-weight: 800; }
.before-after__pair { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(.8rem, 1.4vw, 1.2rem); }
.before-after__pair > section {
  min-width: 0;
  padding: .55rem;
  border: 1px solid color-mix(in srgb, var(--portfolio-line) 78%, transparent);
  border-radius: 1.05rem;
  background: color-mix(in srgb, var(--portfolio-bg) 68%, transparent);
}
.before-after__pair > section:last-child {
  border-color: color-mix(in srgb, var(--portfolio-accent) 24%, var(--portfolio-line));
  background: color-mix(in srgb, var(--portfolio-accent) 3%, var(--portfolio-bg));
}
.before-after__pair > section > p {
  display: inline-flex;
  align-items: center;
  gap: .5rem;
  min-height: 2rem;
  margin: 0 0 .55rem;
  padding-inline: .7rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--portfolio-text) 5%, transparent);
  color: var(--portfolio-muted);
  font-size: .7rem;
  font-weight: 850;
}
.before-after__pair > section > p::before { width: .42rem; aspect-ratio: 1; border-radius: 50%; background: currentColor; content: ''; opacity: .6; }
.before-after__pair > section:last-child > p { background: color-mix(in srgb, var(--portfolio-accent) 12%, transparent); color: var(--portfolio-accent); }
@media (max-width: 767px) {
  .before-after { padding: .8rem; border-radius: 1.15rem; }
  .before-after__pair { grid-template-columns: 1fr; gap: 1rem; }
}
</style>
