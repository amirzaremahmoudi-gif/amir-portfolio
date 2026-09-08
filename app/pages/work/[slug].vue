<script setup lang="ts">
const route = useRoute()
const { locale, t } = useI18n()
const slug = computed(() => String(route.params.slug))
if (slug.value !== 'toranj-insurance') throw createError({ statusCode: 404, statusMessage: t('project.notFound') })

const { data: project } = await useAsyncData(`project-${locale.value}-${route.params.slug}`, () => locale.value === 'fa' ? queryCollection('work_fa').first() : queryCollection('work_en').first(), { watch: [locale] })
if (!project.value) throw createError({ statusCode: 404, statusMessage: t('project.notFound') })

const previous = null
const next = null
const config = useRuntimeConfig()
const caseStudyOgImage = computed(() => new URL('/images/case-studies/toranj-insurance/hero-ui/hero-cinematic-poster-v4.png', config.public.siteUrl).toString())

useSeoMeta({
  title: () => locale.value === 'fa' ? 'اپ ترنج (بیمه) | کیس‌استادی طراحی محصول' : 'Toranj App — Insurance | Product Design Case Study',
  description: () => project.value?.description,
  ogTitle: () => project.value?.title,
  ogDescription: () => project.value?.description,
  ogImage: caseStudyOgImage,
  ogImageAlt: () => project.value?.title,
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: () => project.value?.title,
  twitterDescription: () => project.value?.description,
  twitterImage: caseStudyOgImage
})
</script>

<template>
  <ToranjInsuranceCaseStudy
    v-if="project"
    :previous="previous"
    :next="next"
  />
</template>
