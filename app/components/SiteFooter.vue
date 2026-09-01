<script setup lang="ts">
const { t } = useI18n()
const { profile } = usePortfolioContent()
</script>

<template>
  <footer class="footer-shell">
    <div class="portfolio-container py-16 md:py-24 lg:py-28">
      <div class="grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-8">
          <p class="footer-eyebrow eyebrow mb-6">
            {{ t('footer.eyebrow') }}
          </p>
          <p class="editorial-display max-w-4xl text-[clamp(3.15rem,7vw,7.25rem)]">
            {{ t('footer.headline') }}
          </p>
        </div>
        <div class="flex flex-col justify-end text-sm lg:col-span-3 lg:col-start-10">
          <a
            :href="`mailto:${profile.email}`"
            class="footer-link border-b py-4"
          >{{ t('common.email') }} <span dir="ltr">{{ profile.email }}</span></a>
          <a
            :href="profile.linkedin"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link border-b py-4"
          >{{ t('common.linkedin') }} <span dir="ltr">amir-zare ↗</span></a>
          <a
            :href="profile.behance"
            target="_blank"
            rel="noopener noreferrer"
            class="footer-link border-b py-4"
          >{{ t('common.behance') }} <span dir="ltr">azuiux ↗</span></a>
          <a
            :href="profile.cv"
            download="Amir_Zare_CV_2026.pdf"
            class="footer-link border-b py-4"
          >{{ t('common.downloadCv') }} <span dir="ltr">PDF ↓</span></a>
        </div>
      </div>
      <div class="footer-meta mt-20 flex flex-col gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>© {{ new Date().getFullYear() }} {{ profile.name }}</p>
        <p>{{ profile.title }} · {{ profile.location }}</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer-shell { color: var(--portfolio-footer-text); background: var(--portfolio-footer-bg); }
.footer-eyebrow, .footer-meta { color: var(--portfolio-footer-muted); }
.footer-meta, .footer-link { border-color: color-mix(in srgb, var(--portfolio-footer-text) 18%, transparent); }
.footer-link { display: flex; min-height: 3.25rem; align-items: center; justify-content: space-between; gap: 1rem; color: var(--portfolio-footer-text); transition: color var(--motion-control) var(--ease-standard), padding var(--motion-control) var(--ease-standard); }
.footer-link span { color: var(--portfolio-footer-muted); }
.footer-link:hover, .footer-link:focus-visible { padding-inline: .4rem; color: var(--portfolio-accent); }
@media (prefers-reduced-motion: reduce) { .footer-link { transition: none; } }
</style>
