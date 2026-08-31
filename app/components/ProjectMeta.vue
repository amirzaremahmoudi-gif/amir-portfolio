<script setup lang="ts">
defineProps<{ role: string, timeline: string, team: string, industry: string, responsibilities: string[] }>()
</script>

<template>
  <dl class="grid gap-px border-y border-default bg-[color:var(--portfolio-line)] sm:grid-cols-2 lg:grid-cols-4">
    <div
      v-for="item in [{ label: 'Role', value: role }, { label: 'Timeline', value: timeline }, { label: 'Team', value: team }, { label: 'Industry', value: industry }]"
      :key="item.label"
      class="bg-[color:var(--portfolio-bg)] py-6 sm:px-6 first:pl-0"
    >
      <dt class="eyebrow">
        {{ item.label }}
      </dt><dd class="mt-3 text-sm">
        {{ item.value }}
      </dd>
    </div>
    <div class="bg-[color:var(--portfolio-bg)] py-6 sm:col-span-2 sm:px-6 lg:col-span-4 lg:pl-0">
      <dt class="eyebrow">
        Responsibilities
      </dt><dd class="mt-3 text-sm">
        {{ responsibilities.join(' · ') }}
      </dd>
    </div>
  </dl>
</template>
