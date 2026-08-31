<script setup lang="ts">
defineProps<{ value: string, label: string }>()
</script>

<template>
  <aside class="border-y border-default py-10">
    <p class="editorial-display text-6xl">
      {{ value }}
    </p><p class="eyebrow mt-3">
      {{ label }}
    </p>
  </aside>
</template>
