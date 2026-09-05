<script setup lang="ts">
defineProps<{ value: string, label: string }>()
</script>

<template>
  <aside class="border-y border-default py-10">
    <AsciiGlitchText
      :text="value"
      as="p"
      class="editorial-display text-6xl"
    />
    <AsciiGlitchText
      :text="label"
      as="p"
      class="eyebrow mt-3"
    />
  </aside>
</template>
