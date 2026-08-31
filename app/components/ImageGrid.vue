<script setup lang="ts">
defineProps<{ images: Array<{ src?: string, alt: string, caption?: string }> }>()
</script>

<template>
  <div class="grid gap-5 md:grid-cols-2">
    <ImageBlock
      v-for="image in images"
      :key="image.alt"
      v-bind="image"
    />
  </div>
</template>
