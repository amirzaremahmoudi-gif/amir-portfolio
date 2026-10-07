<script setup lang="ts">
defineProps<{ src?: string, alt: string, caption?: string }>()
</script>

<template>
  <figure>
    <div class="aspect-[16/10] overflow-hidden bg-elevated">
      <NuxtImg
        v-if="src"
        :src="src"
        :alt="alt"
        width="1600"
        height="1000"
        sizes="xs:360px sm:640px md:768px lg:1024px"
        format="webp"
        :quality="84"
        loading="lazy"
        decoding="async"
        class="size-full object-cover"
      /><div
        v-else
        class="grid size-full place-items-center border border-default"
      >
        <span class="eyebrow">Project image placeholder</span>
      </div>
    </div><figcaption
      v-if="caption"
      class="mt-3 text-xs text-muted"
    >
      {{ caption }}
    </figcaption>
  </figure>
</template>
