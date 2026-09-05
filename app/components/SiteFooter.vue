<script setup lang="ts">
const { t } = useI18n()
const { profile } = usePortfolioContent()
</script>

<template>
  <footer class="footer-shell">
    <div class="portfolio-container footer-links">
      <a
        :href="`mailto:${profile.email}`"
        class="footer-link"
      ><span>{{ t('common.email') }}</span><span dir="ltr">{{ profile.email }}</span></a>
      <a
        :href="profile.behance"
        target="_blank"
        rel="noopener noreferrer"
        class="footer-link"
      ><span>{{ t('common.behance') }}</span><span dir="ltr">azuiux ↗</span></a>
      <a
        :href="profile.cv"
        download="Amir_Zare_CV_2026.pdf"
        class="footer-link"
      ><span>{{ t('common.downloadCv') }}</span><span dir="ltr">PDF ↓</span></a>
    </div>
  </footer>
</template>

<style scoped>
.footer-shell { color: var(--portfolio-muted); background: var(--portfolio-bg); }
.footer-links { display: grid; grid-template-columns: 2fr 1fr 1fr; border-top: 1px solid var(--portfolio-line); }
.footer-link { display: flex; min-width: 0; min-height: 4.5rem; align-items: center; justify-content: space-between; gap: 1rem; padding-inline: clamp(.75rem, 1.5vw, 1.5rem); border-inline-start: 1px solid var(--portfolio-line); font-size: clamp(.78rem, .85vw, .9rem); transition: color var(--motion-control) var(--ease-standard), background-color var(--motion-control) var(--ease-standard); }
.footer-link:first-child { border-inline-start: 0; }
.footer-link span:last-child { overflow: hidden; color: var(--portfolio-fg); text-overflow: ellipsis; white-space: nowrap; }
.footer-link:hover, .footer-link:focus-visible { color: var(--portfolio-accent); background: color-mix(in srgb, var(--portfolio-surface) 72%, transparent); }
@media (max-width: 700px) { .footer-links { grid-template-columns: 1fr; padding-block: .5rem; } .footer-link { min-height: 3.75rem; border-inline-start: 0; border-top: 1px solid var(--portfolio-line); } .footer-link:first-child { border-top: 0; } }
@media (prefers-reduced-motion: reduce) { .footer-link { transition: none; } }
</style>
