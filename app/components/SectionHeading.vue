<script setup lang="ts">
defineProps<{ id?: string, index: string, title: string, description?: string }>()
</script>

<template>
  <div class="grid gap-6 md:grid-cols-12">
    <p class="eyebrow md:col-span-3">
      {{ index }}
    </p>
    <div class="md:col-span-8 md:col-start-5">
      <h2
        :id="id"
        class="editorial-display text-[clamp(3rem,5vw,5.5rem)]"
      >
        {{ title }}
      </h2>
      <p
        v-if="description"
        class="mt-5 max-w-xl leading-relaxed text-muted"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>
