<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()
const slug = computed(() => String(route.params.slug))
const isInsurance = computed(() => slug.value === 'toranj-insurance')
const isCapitalRedesign = computed(() => slug.value === 'toranj-capital-redesign')
const isRamzinex = computed(() => slug.value === 'ramzinex-product-experience')
if (!isInsurance.value && !isCapitalRedesign.value && !isRamzinex.value) throw createError({ statusCode: 404, statusMessage: t('project.notFound') })

const { data: project } = await useAsyncData(`project-${locale.value}-${route.params.slug}`, () => {
  if (isCapitalRedesign.value || isRamzinex.value) return Promise.resolve(null)
  return locale.value === 'fa' ? queryCollection('work_fa').first() : queryCollection('work_en').first()
}, { watch: [locale] })
if (isInsurance.value && !project.value) throw createError({ statusCode: 404, statusMessage: t('project.notFound') })

const previous = null
const next = null
const config = useRuntimeConfig()
const caseStudyOgImage = computed(() => new URL(
  isRamzinex.value
    ? '/images/case-studies/ramzinex/cover-market-ecosystem.png'
    : isCapitalRedesign.value
      ? '/images/case-studies/toranj-capital-redesign/hero-cinematic-desktop-v1.png'
      : '/images/case-studies/toranj-insurance/hero-ui/hero-cinematic-poster-v4.png',
  config.public.siteUrl
).toString())
const capitalTitle = computed(() => locale.value === 'fa'
  ? 'بازطراحی وب‌سایت ترنج کپیتال — کیس‌استادی امیر زارع'
  : 'Toranj Capital Website Redesign — Amir Zare Case Study')
const capitalDescription = computed(() => locale.value === 'fa'
  ? 'کیس‌استادی بازطراحی وب‌سایت ترنج کپیتال؛ از ساختار خدمات تا صفحات محصول و سنجش ریسک.'
  : 'A case study of the Toranj Capital website redesign, covering service structure, product pages and risk assessment.')
const ramzinexTitle = computed(() => locale.value === 'fa'
  ? 'طراحی تجربه محصول رمزینکس — کیس‌استادی امیر زارع'
  : 'Ramzinex Product Experience — Amir Zare Case Study')
const ramzinexDescription = computed(() => locale.value === 'fa'
  ? 'کیس‌استادی بازطراحی صفحات معامله، تحلیل بازار، مجله رمزینکس و یک کمپین جذب کاربر.'
  : 'A case study covering the redesign of trading, market analysis, Ramzinex Magazine and an acquisition campaign.')

useSeoMeta({
  title: () => isRamzinex.value
    ? ramzinexTitle.value
    : isCapitalRedesign.value
      ? capitalTitle.value
      : (locale.value === 'fa' ? 'اپ ترنج (بیمه) | کیس‌استادی طراحی محصول' : 'Toranj App — Insurance | Product Design Case Study'),
  description: () => isRamzinex.value
    ? ramzinexDescription.value
    : isCapitalRedesign.value
      ? capitalDescription.value
      : project.value?.description,
  ogTitle: () => isRamzinex.value ? ramzinexTitle.value : isCapitalRedesign.value ? capitalTitle.value : project.value?.title,
  ogDescription: () => isRamzinex.value ? ramzinexDescription.value : isCapitalRedesign.value ? capitalDescription.value : project.value?.description,
  ogImage: caseStudyOgImage,
  ogImageAlt: () => isRamzinex.value ? ramzinexTitle.value : isCapitalRedesign.value ? capitalTitle.value : project.value?.title,
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: () => isRamzinex.value ? ramzinexTitle.value : isCapitalRedesign.value ? capitalTitle.value : project.value?.title,
  twitterDescription: () => isRamzinex.value ? ramzinexDescription.value : isCapitalRedesign.value ? capitalDescription.value : project.value?.description,
  twitterImage: caseStudyOgImage
})
</script>

<template>
  <ToranjCapitalRedesignCaseStudy v-if="isCapitalRedesign" />
  <RamzinexCaseStudy v-else-if="isRamzinex" />
  <ToranjInsuranceCaseStudy
    v-else-if="project"
    :previous="previous"
    :next="next"
  />
</template>
