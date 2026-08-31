<script setup lang="ts">
defineProps<{ previous?: { path: string, title: string } | null, next?: { path: string, title: string } | null }>()
</script>

<template>
  <nav
    class="grid border-y border-default md:grid-cols-2"
    aria-label="Project navigation"
  >
    <NuxtLink
      v-if="previous"
      :to="previous.path"
      class="group border-b border-default py-8 md:border-b-0 md:border-r md:pr-10"
    ><span class="eyebrow">Previous project</span><span class="mt-4 flex items-center gap-3 text-xl font-semibold"><UIcon
      name="i-lucide-arrow-left"
      class="transition-transform group-hover:-translate-x-1"
    />{{ previous.title }}</span></NuxtLink><div v-else />
    <NuxtLink
      v-if="next"
      :to="next.path"
      class="group py-8 md:pl-10 md:text-right"
    ><span class="eyebrow">Next project</span><span class="mt-4 flex items-center justify-end gap-3 text-xl font-semibold">{{ next.title }}<UIcon
      name="i-lucide-arrow-right"
      class="transition-transform group-hover:translate-x-1"
    /></span></NuxtLink>
  </nav>
</template>
