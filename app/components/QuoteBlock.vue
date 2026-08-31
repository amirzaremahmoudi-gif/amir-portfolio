<script setup lang="ts">
defineProps<{ quote: string, attribution?: string }>()
</script>

<template>
  <figure class="my-20 border-l border-primary pl-8">
    <blockquote class="editorial-display text-4xl md:text-5xl">
      “{{ quote }}”
    </blockquote><figcaption
      v-if="attribution"
      class="eyebrow mt-6"
    >
      {{ attribution }}
    </figcaption>
  </figure>
</template>
