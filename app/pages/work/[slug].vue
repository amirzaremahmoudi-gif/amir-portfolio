<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()
const slug = computed(() => String(route.params.slug))
const isInsurance = computed(() => slug.value === 'toranj-insurance')
const isCapitalRedesign = computed(() => slug.value === 'toranj-capital-redesign')
if (!isInsurance.value && !isCapitalRedesign.value) throw createError({ statusCode: 404, statusMessage: t('project.notFound') })

const { data: project } = await useAsyncData(`project-${locale.value}-${route.params.slug}`, () => {
  if (isCapitalRedesign.value) return Promise.resolve(null)
  return locale.value === 'fa' ? queryCollection('work_fa').first() : queryCollection('work_en').first()
}, { watch: [locale] })
if (isInsurance.value && !project.value) throw createError({ statusCode: 404, statusMessage: t('project.notFound') })

const previous = null
const next = null
const config = useRuntimeConfig()
const caseStudyOgImage = computed(() => new URL(
  isCapitalRedesign.value
    ? '/images/case-studies/toranj-capital-redesign/hero-cinematic-desktop-v1.png'
    : '/images/case-studies/toranj-insurance/hero-ui/hero-cinematic-poster-v4.png',
  config.public.siteUrl
).toString())
const capitalTitle = computed(() => locale.value === 'fa'
  ? 'بازطراحی وب‌سایت ترنج کپیتال — کیس‌استادی امیر زارع'
  : 'Toranj Capital Website Redesign — Amir Zare Case Study')
const capitalDescription = computed(() => locale.value === 'fa'
  ? 'کیس‌استادی امیر زارع از بازطراحی وب‌سایت ترنج کپیتال؛ سامان‌دهی محصولات سرمایه‌گذاری و خدمات مالی در یک تجربه منسجم و چندصفحه‌ای.'
  : 'Amir Zare’s case study of the Toranj Capital website redesign, unifying investment products and financial services in a coherent multi-page experience.')

useSeoMeta({
  title: () => isCapitalRedesign.value
    ? capitalTitle.value
    : (locale.value === 'fa' ? 'اپ ترنج (بیمه) | کیس‌استادی طراحی محصول' : 'Toranj App — Insurance | Product Design Case Study'),
  description: () => isCapitalRedesign.value
    ? capitalDescription.value
    : project.value?.description,
  ogTitle: () => isCapitalRedesign.value ? capitalTitle.value : project.value?.title,
  ogDescription: () => isCapitalRedesign.value ? capitalDescription.value : project.value?.description,
  ogImage: caseStudyOgImage,
  ogImageAlt: () => isCapitalRedesign.value ? capitalTitle.value : project.value?.title,
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: () => isCapitalRedesign.value ? capitalTitle.value : project.value?.title,
  twitterDescription: () => isCapitalRedesign.value ? capitalDescription.value : project.value?.description,
  twitterImage: caseStudyOgImage
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
