<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()
const slug = computed(() => String(route.params.slug))
const isInsurance = computed(() => slug.value === 'toranj-insurance')
const isCapitalRedesign = computed(() => slug.value === 'toranj-capital-redesign')
if (!isInsurance.value && !isCapitalRedesign.value) throw createError({ statusCode: 404, statusMessage: t('project.notFound') })
if (isCapitalRedesign.value && !import.meta.dev) throw createError({ statusCode: 404, statusMessage: t('project.notFound') })

const { data: project } = await useAsyncData(`project-${locale.value}-${route.params.slug}`, () => {
  if (isCapitalRedesign.value) return Promise.resolve(null)
  return locale.value === 'fa' ? queryCollection('work_fa').first() : queryCollection('work_en').first()
}, { watch: [locale] })
if (isInsurance.value && !project.value) throw createError({ statusCode: 404, statusMessage: t('project.notFound') })

const previous = null
const next = null
const config = useRuntimeConfig()
const caseStudyOgImage = computed(() => new URL('/images/case-studies/toranj-insurance/hero-ui/hero-cinematic-poster-v4.png', config.public.siteUrl).toString())

useSeoMeta({
  title: () => isCapitalRedesign.value
    ? (locale.value === 'fa' ? 'پیش‌نویس خصوصی — بازطراحی وب‌سایت ترنج کپیتال' : 'Private draft — Toranj Capital Website Redesign')
    : (locale.value === 'fa' ? 'اپ ترنج (بیمه) | کیس‌استادی طراحی محصول' : 'Toranj App — Insurance | Product Design Case Study'),
  description: () => isCapitalRedesign.value
    ? (locale.value === 'fa' ? 'پیش‌نویس خصوصی کیس‌استادی؛ در انتظار تأیید انتشار.' : 'Private case-study draft awaiting publication approval.')
    : project.value?.description,
  robots: () => isCapitalRedesign.value ? 'noindex, nofollow, noarchive, nosnippet' : undefined,
  ogTitle: () => isCapitalRedesign.value ? undefined : project.value?.title,
  ogDescription: () => isCapitalRedesign.value ? undefined : project.value?.description,
  ogImage: () => isCapitalRedesign.value ? undefined : caseStudyOgImage.value,
  ogImageAlt: () => isCapitalRedesign.value ? undefined : project.value?.title,
  ogType: 'article',
  twitterCard: () => isCapitalRedesign.value ? undefined : 'summary_large_image',
  twitterTitle: () => isCapitalRedesign.value ? undefined : project.value?.title,
  twitterDescription: () => isCapitalRedesign.value ? undefined : project.value?.description,
  twitterImage: () => isCapitalRedesign.value ? undefined : caseStudyOgImage.value
})
</script>

<template>
  <ToranjCapitalRedesignCaseStudy v-if="isCapitalRedesign" />
  <ToranjInsuranceCaseStudy
    v-else-if="project"
    :previous="previous"
    :next="next"
  />
</template>
