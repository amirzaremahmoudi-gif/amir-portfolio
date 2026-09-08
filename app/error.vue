<script setup lang="ts">
const props = defineProps<{ error: { statusCode?: number } }>()
const route = useRoute()
const isFa = computed(() => route.path === '/fa' || route.path.startsWith('/fa/'))
const homePath = computed(() => isFa.value ? '/fa' : '/en')
const statusCode = computed(() => props.error.statusCode || 404)

useHead(() => ({
  title: isFa.value ? `صفحه پیدا نشد — ${statusCode.value}` : `Page not found — ${statusCode.value}`,
  meta: [{ name: 'robots', content: 'noindex, nofollow' }]
}))
</script>

<template>
  <div class="error-page portfolio-container">
    <p class="error-page__code">
      {{ statusCode }}
    </p>
    <h1>{{ isFa ? 'این صفحه پیدا نشد.' : 'This page could not be found.' }}</h1>
    <p>{{ isFa ? 'ممکن است آدرس تغییر کرده باشد یا این صفحه هنوز منتشر نشده باشد.' : 'The address may have changed, or this page may not be published.' }}</p>
    <NuxtLink
      :to="homePath"
      class="error-page__link"
    >
      {{ isFa ? 'بازگشت به خانه' : 'Return home' }}
    </NuxtLink>
  </div>
</template>

<style scoped>
.error-page { display:grid; min-height:100svh; align-content:center; justify-items:start; gap:1rem; padding-block:8rem; }
.error-page__code { color:var(--portfolio-accent); font-size:.9rem; font-weight:800; letter-spacing:.12em; }
h1 { max-width:12ch; font-family:var(--font-display); font-size:clamp(2.75rem,8vw,7rem); font-weight:850; letter-spacing:-.05em; line-height:.98; }
p:not(.error-page__code) { max-width:38rem; color:var(--portfolio-muted); font-size:clamp(1rem,1.4vw,1.2rem); line-height:1.8; }
.error-page__link { margin-top:1rem; border-bottom:2px solid var(--portfolio-accent); padding-block:.6rem; font-weight:750; }
[lang='fa'] h1 { letter-spacing:0; line-height:1.2; }
</style>
